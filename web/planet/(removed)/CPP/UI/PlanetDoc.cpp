
/////////////////////////////////////////////////////////////////////////////
//
// PlanetDoc.cpp - Document
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "Planet.h"
#include "PlanetDoc.h"
#include "PlanetDlg.h"



/////////////////////////////////////////////////////////////////////////////
// Debug Junk
/////////////////////////////////////////////////////////////////////////////

#ifdef _DEBUG
	#define new DEBUG_NEW
	#undef THIS_FILE
	static char THIS_FILE[] = __FILE__;
	void CPlanetDoc::AssertValid() const
		{ CDocument::AssertValid(); }
	void CPlanetDoc::Dump(CDumpContext& dc) const
		{ CDocument::Dump(dc); }
#endif



/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

static BOOL g_bFirstTime = TRUE;



/////////////////////////////////////////////////////////////////////////////
// Message Map
/////////////////////////////////////////////////////////////////////////////

IMPLEMENT_DYNCREATE(CPlanetDoc, CDocument)
BEGIN_MESSAGE_MAP(CPlanetDoc, CDocument)
	//{{AFX_MSG_MAP(CPlanetDoc)
	ON_COMMAND(ID_COMMAND_SETTINGS, OnCommandSettings)
	ON_COMMAND(ID_COMMAND_COMPILE, OnCommandCompile)
	ON_COMMAND(ID_COMMAND_SPINCCW, OnCommandSpinCCW)
	ON_COMMAND(ID_COMMAND_SPINCW, OnCommandSpinCW)
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CPlanetDoc::CPlanetDoc()  { m_pPlanet = NULL; }
CPlanetDoc::~CPlanetDoc() {}



/////////////////////////////////////////////////////////////////////////////
// New Document
/////////////////////////////////////////////////////////////////////////////

BOOL CPlanetDoc::OnNewDocument() {

	if( !CDocument::OnNewDocument() )
		return FALSE;

	if( ::g_bFirstTime ) {
	
		::g_bFirstTime = FALSE;
		return FALSE;
	}

	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Draw Grid in Texture
/////////////////////////////////////////////////////////////////////////////

void CPlanetDoc::DrawGrid() {

	DWORD x, y;
	DWORD len;
	BYTE* pTex;

	if( !m_pPlanet ) return;
	
	pTex = m_pPlanet->tex_ptr;
	if( !pTex ) return;

	len = m_pPlanet->tex_size;
	if( !len ) return;

	// Draw Horizontal Lines
	for( y=0; y<len; y+=5 )
		for( x=0; x<len; x++ )
			pTex[y*len+x] = 255;

	// Draw Vertical Lines
	for( x=0; x<len; x+=5 )
		for( y=0; y<len; y++ )
			pTex[y*len+x] = 255;
}



/////////////////////////////////////////////////////////////////////////////
// Remove Planet
/////////////////////////////////////////////////////////////////////////////

void CPlanetDoc::DeleteContents() {
	
	if( m_pPlanet ) {

		::DestroyPlanet( m_pPlanet );
		m_pPlanet = NULL;
	}

	CDocument::DeleteContents();
}



/////////////////////////////////////////////////////////////////////////////
// Serialization
/////////////////////////////////////////////////////////////////////////////

void CPlanetDoc::Serialize( CArchive& ar ) {

	CFile* file = ar.GetFile();	

	if (ar.IsStoring()) {

		m_bFileOK = ::SavePlanet( file, m_pPlanet );
	}
	
	else {
	
		m_pPlanet = ::LoadPlanet( file );
		m_bFileOK = m_pPlanet ? TRUE : FALSE;
	}
}



/////////////////////////////////////////////////////////////////////////////
// Modify Planet Settings
/////////////////////////////////////////////////////////////////////////////

void CPlanetDoc::OnCommandSettings() {

	LPARAM lHint = UPD_RENDER | UPD_RESIZE | UPD_NEWBMP;
	CPlanetDlg dlg;

	// Edit existing planet
	if( m_pPlanet ) {

		dlg.EditPlanet( m_pPlanet );	
		dlg.DoModal();
	}

	// Create new planet
	else {

		dlg.DoModal();
		m_pPlanet = dlg.GetPlanet();
	}

	// Do we have a planet?
	if( !m_pPlanet ) goto Redraw;

	// Set doc modify flag
	SetModifiedFlag( TRUE );

	// Auto compile activated?
	if( ::g_bAutoCompile ) {

		// Need to recompile?
		if( m_pPlanet->img_ptr == NULL ) {
		
			// Compile
			OnCommandCompile();
		
			// Already redrawn?
			if( ::g_bAutoRender ) return;
		}
	}


Redraw:

	UpdateAllViews( NULL, lHint );
}



/////////////////////////////////////////////////////////////////////////////
// Compile Planet
/////////////////////////////////////////////////////////////////////////////

void CPlanetDoc::OnCommandCompile() {
	
	if( !m_pPlanet ) return;

	CWaitCursor csr;
	
	if( !::CompilePlanet( m_pPlanet ) )
		AfxMessageBox( "Failed to compile." );

	else {

		LPARAM lHint = UPD_RENDER | UPD_RESIZE | UPD_NEWBMP;

		if( ::g_bAutoRender )
			UpdateAllViews( NULL, lHint );
	}
}



/////////////////////////////////////////////////////////////////////////////
// Spin Clockwise
/////////////////////////////////////////////////////////////////////////////

void CPlanetDoc::OnCommandSpinCW() {
	
	int tmask;

	if( !m_pPlanet ) return;
	if( !m_pPlanet->img_ptr ) return;
	if( !m_pPlanet->tex_ptr ) return;

	tmask = m_pPlanet->tex_size;
	if( !tmask ) return;
	tmask--;

	m_pPlanet->spin++;
	m_pPlanet->spin &= tmask;

	UpdateAllViews( NULL, UPD_RENDER );
}



/////////////////////////////////////////////////////////////////////////////
// Spin COunter-Clockwise
/////////////////////////////////////////////////////////////////////////////

void CPlanetDoc::OnCommandSpinCCW() {
	
	int tmask;

	if( !m_pPlanet ) return;
	if( !m_pPlanet->img_ptr ) return;
	if( !m_pPlanet->tex_ptr ) return;
	
	tmask = m_pPlanet->tex_size;
	if( !tmask ) return;
	tmask--;

	m_pPlanet->spin--;
	m_pPlanet->spin &= tmask;

	UpdateAllViews( NULL, UPD_RENDER );
}



/////////////////////////////////////////////////////////////////////////////
// Open New Planet File
/////////////////////////////////////////////////////////////////////////////

BOOL CPlanetDoc::OnOpenDocument( LPCTSTR lpszPathName ) {

	// Load it
	if( !CDocument::OnOpenDocument( lpszPathName ) )
		return FALSE;
	
	// Render the planet
	UpdateAllViews( NULL, UPD_RENDER | UPD_RESIZE );	
	
	return TRUE;
}

