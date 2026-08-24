
/////////////////////////////////////////////////////////////////////////////
//
// Planet.h - Application
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#ifndef __AFXWIN_H__
	#error include 'stdafx.h' before including this file for PCH
#endif

#include "resource.h"
#include "TexList.h"


// Macros
#define APP ((CPlanetApp*)(AfxGetApp()))
#define GPS APP->GetProfileString
#define WPS APP->WriteProfileString
#define GPI APP->GetProfileInt
#define WPI APP->WriteProfileInt
#define TODO() AfxMessageBox( ::g_szToDo )

// Global Data
extern CTexList		g_TexList;
extern BOOL			g_bAutoRender;
extern BOOL			g_bAutoCompile;
extern const char*  g_szToDo;

// Global Functions
BOOL Query( LPCSTR );


/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CPlanetApp : public CWinApp {

public:

	CPlanetApp();

	void LoadINI();
	void SaveINI();

	//{{AFX_VIRTUAL(CPlanetApp)
	public:
	virtual BOOL InitInstance();
	virtual int ExitInstance();
	//}}AFX_VIRTUAL

	//{{AFX_MSG(CPlanetApp)
	afx_msg void OnAppAbout();
	afx_msg void OnCommandTextures();
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

