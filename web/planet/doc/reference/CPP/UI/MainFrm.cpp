
/////////////////////////////////////////////////////////////////////////////
//
// MainFrm.cpp - Main Frame Window
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "Planet.h"
#include "MainFrm.h"



/////////////////////////////////////////////////////////////////////////////
// Debug Junk
/////////////////////////////////////////////////////////////////////////////

#ifdef _DEBUG
	#define new DEBUG_NEW
	#undef THIS_FILE
	static char THIS_FILE[] = __FILE__;
	void CMainFrame::AssertValid() const
		{ CMDIFrameWnd::AssertValid(); }
	void CMainFrame::Dump(CDumpContext& dc) const
		{ CMDIFrameWnd::Dump(dc); }
#endif



/////////////////////////////////////////////////////////////////////////////
// Message Map
/////////////////////////////////////////////////////////////////////////////

IMPLEMENT_DYNAMIC(CMainFrame, CMDIFrameWnd)
BEGIN_MESSAGE_MAP(CMainFrame, CMDIFrameWnd)
	//{{AFX_MSG_MAP(CMainFrame)
	ON_WM_CREATE()
	ON_COMMAND(ID_AUTOCOMPILE, OnAutoCompile)
	ON_UPDATE_COMMAND_UI(ID_AUTOCOMPILE, OnUI_AutoCompile)
	ON_COMMAND(ID_AUTORENDER, OnAutoRender)
	ON_UPDATE_COMMAND_UI(ID_AUTORENDER, OnUI_AutoRender)
	//}}AFX_MSG_MAP
END_MESSAGE_MAP()



/////////////////////////////////////////////////////////////////////////////
// UI Handlers
/////////////////////////////////////////////////////////////////////////////

void CMainFrame::OnUI_AutoCompile( CCmdUI* pCmdUI ) 
{ pCmdUI->SetCheck( ::g_bAutoCompile ? 1 : 0 ); }

void CMainFrame::OnUI_AutoRender( CCmdUI* pCmdUI ) 
{ pCmdUI->SetCheck( ::g_bAutoRender ? 1 : 0 ); }



/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

static UINT indicators[] = {

	ID_SEPARATOR,
	ID_INDICATOR_CAPS,
	ID_INDICATOR_NUM,
	ID_INDICATOR_SCRL,
};



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CMainFrame::CMainFrame()  {}
CMainFrame::~CMainFrame() {}



/////////////////////////////////////////////////////////////////////////////
// Window Styles
/////////////////////////////////////////////////////////////////////////////

BOOL CMainFrame::PreCreateWindow( CREATESTRUCT& cs ) {

	return CMDIFrameWnd::PreCreateWindow( cs );
}



/////////////////////////////////////////////////////////////////////////////
// Window Creation
/////////////////////////////////////////////////////////////////////////////

int CMainFrame::OnCreate( LPCREATESTRUCT lpCS ) {

	int num;
	UINT* ind;
	DWORD dwStyle;

	ind = indicators;
	num = sizeof(indicators)/sizeof(UINT);
	dwStyle = CBRS_TOOLTIPS | 
			  CBRS_FLYBY | 
			  CBRS_SIZE_DYNAMIC;

	if( CMDIFrameWnd::OnCreate( lpCS ) == -1 )
		goto Fail;
	
	if( !m_wndTB.Create( this ) ||
		!m_wndTB.LoadToolBar( IDR_MAINFRAME ) )
		goto Fail;

	if( !m_wndSB.Create( this ) ||
		!m_wndSB.SetIndicators( ind, num ) )
		goto Fail;

	m_wndTB.SetBarStyle( m_wndTB.GetBarStyle() |dwStyle );
	m_wndTB.SetWindowText( "Tool Bar" );

	m_wndTB.EnableDocking( CBRS_ALIGN_ANY );
	EnableDocking( CBRS_ALIGN_ANY );
	DockControlBar( &m_wndTB );

	return 0;


Fail:	
	TRACE0( "Failed to create main frame\n" );
	return -1;
}



/////////////////////////////////////////////////////////////////////////////
// Toggle Auto Compile Flag
/////////////////////////////////////////////////////////////////////////////

void CMainFrame::OnAutoCompile() {

	::g_bAutoCompile = !(::g_bAutoCompile);
}



/////////////////////////////////////////////////////////////////////////////
// Toggle Auto Render Flag
/////////////////////////////////////////////////////////////////////////////

void CMainFrame::OnAutoRender() {

	::g_bAutoRender = !(::g_bAutoRender);
}

