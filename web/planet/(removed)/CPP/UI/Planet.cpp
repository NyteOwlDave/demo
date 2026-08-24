
/////////////////////////////////////////////////////////////////////////////
//
// Planet.cpp - Application
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include <math.h>
#include <time.h>
#include "Planet.h"
#include "MainFrm.h"
#include "ChildFrm.h"
#include "PlanetDoc.h"
#include "PlanetView.h"
#include "TexDlg.h"
#include "Random.h"



/////////////////////////////////////////////////////////////////////////////
// Macros
/////////////////////////////////////////////////////////////////////////////

#undef GPI
#undef WPI
#undef GPS
#undef WPS

#define GPS GetProfileString
#define WPS WriteProfileString
#define GPI GetProfileInt
#define WPI WriteProfileInt



/////////////////////////////////////////////////////////////////////////////
// Debug Junk
/////////////////////////////////////////////////////////////////////////////

#ifdef _DEBUG
	#define new DEBUG_NEW
	#undef THIS_FILE
	static char THIS_FILE[] = __FILE__;
#endif



/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

// Auto Flags
BOOL g_bAutoRender  = TRUE;
BOOL g_bAutoCompile = TRUE;
const char* g_szToDo = "Incomplete.";



/////////////////////////////////////////////////////////////////////////////
// Message Map
/////////////////////////////////////////////////////////////////////////////

BEGIN_MESSAGE_MAP(CPlanetApp, CWinApp)
	//{{AFX_MSG_MAP(CPlanetApp)
	ON_COMMAND(ID_APP_ABOUT, OnAppAbout)
	ON_COMMAND(ID_COMMAND_TEXTURES, OnCommandTextures)
	//}}AFX_MSG_MAP
	// Standard file based document commands
	ON_COMMAND(ID_FILE_NEW, CWinApp::OnFileNew)
	ON_COMMAND(ID_FILE_OPEN, CWinApp::OnFileOpen)
END_MESSAGE_MAP()



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CPlanetApp::CPlanetApp() {}

CTexList	g_TexList;	// Global Texture List
CPlanetApp	theApp;		// Application Object



/////////////////////////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////////////////////////

BOOL CPlanetApp::InitInstance() {

	Enable3dControls();
	LoadStdProfileSettings();
	LoadINI();

	// Initialize Random Number Generator
	::SeedRand( (long)(time(NULL)) );

	CMultiDocTemplate* pDocTemplate;
	pDocTemplate = new CMultiDocTemplate(
		IDR_PLANETTYPE,
		RUNTIME_CLASS(CPlanetDoc),
		RUNTIME_CLASS(CChildFrame),
		RUNTIME_CLASS(CPlanetView));
	AddDocTemplate(pDocTemplate);

	CMainFrame* pMainFrame = new CMainFrame;
	if( !pMainFrame->LoadFrame( IDR_MAINFRAME ) )
		return FALSE;
	m_pMainWnd = pMainFrame;

	m_pMainWnd->DragAcceptFiles();
	EnableShellOpen();
	RegisterShellFileTypes( TRUE );
	CCommandLineInfo cmdInfo;
	ParseCommandLine( cmdInfo );
	if( !ProcessShellCommand( cmdInfo ) )
		return FALSE;

	pMainFrame->ShowWindow( m_nCmdShow );
	pMainFrame->UpdateWindow();

	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Clean Up
/////////////////////////////////////////////////////////////////////////////

int CPlanetApp::ExitInstance() {
	
	SaveINI();
	CWinApp::ExitInstance();
	return 0;	
}



/////////////////////////////////////////////////////////////////////////////
// App command to run the dialog
/////////////////////////////////////////////////////////////////////////////

void CPlanetApp::OnAppAbout() {

	CDialog dlg( IDD_ABOUTBOX );
	dlg.DoModal();
}



/////////////////////////////////////////////////////////////////////////////
// Load INI File Settings
/////////////////////////////////////////////////////////////////////////////

void CPlanetApp::LoadINI() {

	::g_bAutoCompile = GPI( "Flags", "AutoCompile", TRUE );
	::g_bAutoRender  = GPI( "Flags", "AutoRender",  TRUE );
}



/////////////////////////////////////////////////////////////////////////////
// Save INI File Settings
/////////////////////////////////////////////////////////////////////////////

void CPlanetApp::SaveINI() {

	WPI( "Flags", "AutoCompile", ::g_bAutoCompile );
	WPI( "Flags", "AutoRender",  ::g_bAutoRender  );
}



/////////////////////////////////////////////////////////////////////////////
// Simple Query Box
/////////////////////////////////////////////////////////////////////////////

BOOL Query( LPCSTR lpsz ) {

	UINT mb = MB_YESNO | MB_ICONQUESTION;
	if( !lpsz ) return FALSE;
	if( AfxMessageBox( lpsz, mb ) != IDYES ) return FALSE;
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Manage Texture List
/////////////////////////////////////////////////////////////////////////////

void CPlanetApp::OnCommandTextures() {
	
	CTexDlg dlg;	
	dlg.DoModal();	
}
