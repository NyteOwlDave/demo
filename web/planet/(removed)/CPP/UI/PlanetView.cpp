
/////////////////////////////////////////////////////////////////////////////
//
// PlanetView.cpp - View
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "Planet.h"
#include "PlanetDoc.h"
#include "PlanetView.h"



/////////////////////////////////////////////////////////////////////////////
// Debug Junk
/////////////////////////////////////////////////////////////////////////////

#ifdef _DEBUG
	#define new DEBUG_NEW
	#undef THIS_FILE
	static char THIS_FILE[] = __FILE__;
	void CPlanetView::AssertValid() const
		{ CView::AssertValid(); }
	void CPlanetView::Dump(CDumpContext& dc) const
		{ CView::Dump(dc); }
	CPlanetDoc* CPlanetView::GetDocument()
		{ ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CPlanetDoc)));
		  return (CPlanetDoc*)m_pDocument; }
#endif



/////////////////////////////////////////////////////////////////////////////
// Message Map
/////////////////////////////////////////////////////////////////////////////

IMPLEMENT_DYNCREATE(CPlanetView, CView)
BEGIN_MESSAGE_MAP(CPlanetView, CView)
	//{{AFX_MSG_MAP(CPlanetView)
	ON_WM_CREATE()
	ON_COMMAND(ID_COMMAND_RENDER, OnCommandRender)
	ON_WM_ERASEBKGND()
	ON_WM_TIMER()
	ON_COMMAND(ID_COMMAND_ANIMATE, OnCommandAnimate)
	ON_UPDATE_COMMAND_UI(ID_COMMAND_ANIMATE, OnUI_CommandAnimate)
	ON_COMMAND(ID_WINDOW_MATCH, OnWindowMatch)
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()



/////////////////////////////////////////////////////////////////////////////
// UI Handlers
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::OnUI_CommandAnimate( CCmdUI* pCmdUI ) {
	
	pCmdUI->SetCheck( m_uTimer ? 1 : 0 );
}



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CPlanetView::CPlanetView()  {  m_uTimer = 0; }
CPlanetView::~CPlanetView()	{}



/////////////////////////////////////////////////////////////////////////////
// Window Styles
/////////////////////////////////////////////////////////////////////////////

BOOL CPlanetView::PreCreateWindow( CREATESTRUCT& cs ) {

	return CView::PreCreateWindow(cs);
}



/////////////////////////////////////////////////////////////////////////////
// Window Creation
/////////////////////////////////////////////////////////////////////////////

int CPlanetView::OnCreate(LPCREATESTRUCT lpCS) {

	if( CView::OnCreate( lpCS ) == -1 )
		return -1;

	return 0;
}



/////////////////////////////////////////////////////////////////////////////
// Drawing
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::OnDraw( CDC* pDC ) {

	// Draw back buffer
	if( m_bmp.IsValid() ) {
		
		CRect rc;
		m_bmp.GetBoundRect( &rc );
		m_bmp.Blit( pDC, CPoint(0,0), &rc );
		pDC->ExcludeClipRect( &rc );
		GetClientRect( &rc );
		pDC->FillSolidRect( &rc, 0x404040 );
	}

	// Why no bitmap?
	else {

		CRect rc;
		char* p = NULL;
		UINT dt = DT_CENTER | DT_VCENTER | 
		          DT_SINGLELINE | DT_NOCLIP;
		PLANET* pPlanet = GetPlanet();
		
		if( !pPlanet ) p = "No Planet";	
		else if( !pPlanet->tex_ptr ) p = "No Texture";
		else if( !pPlanet->img_ptr ) p = "Please Compile";
		else p = "No Bitmap";

		GetClientRect( &rc );
		rc.DeflateRect( 4, 4 );
		pDC->SetBkMode( TRANSPARENT );
		pDC->DrawText( p, -1, &rc, dt );
	}
}



/////////////////////////////////////////////////////////////////////////////
// Planet Changed
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::OnUpdate( CView* p, LPARAM l, CObject* p2 ) {

	// Handle New Bitmap Requests
	if( l & UPD_NEWBMP ) m_bmp.DestroyDIB();

	// Update the bitmap
	MatchImage();

	// Handle Resize Requests
	if( l & UPD_RESIZE ) MatchViewSize();

	// Handle Render Requests
	if( l & UPD_RENDER ) OnCommandRender();
}



/////////////////////////////////////////////////////////////////////////////
// Match Bitmap to Texture
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::MatchImage() {

	int size;
	int w, h;
	PLANET* pPlanet;

	// Get Planet Ptr
	pPlanet = GetPlanet();

	// If no planet, then no bitmap!
	if( !pPlanet ) goto NoBmp;

	// If no image, then no bitmap!
	if( !pPlanet->img_ptr ) goto NoBmp;

	// Get image size
	size = pPlanet->img_size;

	// If no bitmap, go make one
	if( !m_bmp.IsValid() ) goto MakeBmp;

	// If sizes match, we're cool!
	m_bmp.GetSize( w, h );
	if( w == size ) return;
	
	// Destroy old bitmap
	m_bmp.DestroyDIB();


// Create new bitmap
MakeBmp:

	m_bmp.CreateDIB256( size, -size, pPlanet->pal );
	Invalidate();
	return;


// Remove bitmap
NoBmp:
	m_bmp.DestroyDIB();
	Invalidate();
}



/////////////////////////////////////////////////////////////////////////////
// Render
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::OnCommandRender() {

	PLANET* pPlanet;
	CRect rc;

	// Make sure bitmap size matches image size
	MatchImage();

	// Get Planet Ptr
	pPlanet = GetPlanet();

	// If no planet, or no bitmap, make sure
	//  animation is off
	if( (!pPlanet) || (!m_bmp.IsValid()) ) {
	
		StopAnimation();
		return;
	}

	// Render Planet into DIB
	if( !::RenderPlanet( pPlanet, 
						 m_bmp.m_bits ) )
		StopAnimation();

	m_bmp.GetBoundRect( &rc );
	InvalidateRect( &rc, FALSE );
}



/////////////////////////////////////////////////////////////////////////////
// Eliminate Bitmap Flicker during animation
/////////////////////////////////////////////////////////////////////////////

BOOL CPlanetView::OnEraseBkgnd( CDC* pDC ) {
	
	// If we have a bitmap buffer, no need to erase
	//  its background.
	if( m_bmp.IsValid() ) return FALSE;
		
	return CView::OnEraseBkgnd(pDC);
}



/////////////////////////////////////////////////////////////////////////////
// Stop Animation
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::StopAnimation() {

	if( m_uTimer ) KillTimer( m_uTimer );
	m_uTimer = 0;
}



/////////////////////////////////////////////////////////////////////////////
// Start Animation
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::StartAnimation() {

	if( m_uTimer ) return;
	m_uTimer = SetTimer( 100, 20, NULL );
}



/////////////////////////////////////////////////////////////////////////////
// Timer
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::OnTimer( UINT nIDEvent ) {

	PLANET* pPlanet;
	DWORD size;

	// CView::OnTimer(nIDEvent);

	// Get Planet
	pPlanet = GetPlanet();
	if( !pPlanet ) goto StopIt;

	// Get Texture Size
	size = pPlanet->tex_size;
	if( !size ) goto StopIt;
	size--;

	// Spin
	pPlanet->spin++;
	pPlanet->spin &= size;
	
	// Render the image
	OnCommandRender();

	return;

// OOps!
StopIt:
	StopAnimation();
}



/////////////////////////////////////////////////////////////////////////////
// Menu Command to Start Animation
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::OnCommandAnimate() {
	
	if( m_uTimer ) StopAnimation();
	else StartAnimation();	
}



/////////////////////////////////////////////////////////////////////////////
// Get Planet Pointer
/////////////////////////////////////////////////////////////////////////////

PLANET* CPlanetView::GetPlanet() {

	// Get Document
	CPlanetDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if( !pDoc ) return NULL;

	// Get Planet
	return pDoc->m_pPlanet;	
}



/////////////////////////////////////////////////////////////////////////////
// Match Window Size to Image Size
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::MatchViewSize() {

	int size;
	PLANET* pPlanet;
	CRect rc;
	CWnd* pPar;

	// Get Planet Pointer
	pPlanet = GetPlanet();
	if( !pPlanet ) return;

	// Get Image Size
	size = pPlanet->img_size;
	if( !size ) return;

	// Desired Client Rect
	rc.SetRect( 0, 0, size+4, size+4 );
	
	// Update Size of Parent Frame
	pPar = GetParentFrame();
	if( pPar ) {

		// Show Normal
		if( (pPar->IsIconic()) || 
			(pPar->IsZoomed()) )
			pPar->ShowWindow( SW_NORMAL );
	
		pPar->CalcWindowRect( &rc, 1 );
		rc.OffsetRect( GetSystemMetrics( SM_CXSIZEFRAME ) + 1,
					   GetSystemMetrics( SM_CYSIZEFRAME ) +
					   GetSystemMetrics( SM_CYMENU ) + 2 );
		pPar->MoveWindow( &rc, TRUE );
	}
}



/////////////////////////////////////////////////////////////////////////////
// Menu Command for Match View Size
/////////////////////////////////////////////////////////////////////////////

void CPlanetView::OnWindowMatch() {
	
	MatchViewSize();	
}

