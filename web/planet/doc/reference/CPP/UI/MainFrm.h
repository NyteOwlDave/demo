
/////////////////////////////////////////////////////////////////////////////
//
// MainFrm.h - Main Frame Window
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CMainFrame : public CMDIFrameWnd {

public:

	CStatusBar  m_wndSB;
	CToolBar    m_wndTB;

public:

	CMainFrame();

	virtual ~CMainFrame();
	
	#ifdef _DEBUG
		virtual void AssertValid() const;
		virtual void Dump(CDumpContext&) const;
	#endif

	//{{AFX_VIRTUAL(CMainFrame)
	virtual BOOL PreCreateWindow(CREATESTRUCT&);
	//}}AFX_VIRTUAL

protected:

	DECLARE_DYNAMIC(CMainFrame)
	//{{AFX_MSG(CMainFrame)
	afx_msg int OnCreate(LPCREATESTRUCT);
	afx_msg void OnAutoCompile();
	afx_msg void OnUI_AutoCompile(CCmdUI* pCmdUI);
	afx_msg void OnAutoRender();
	afx_msg void OnUI_AutoRender(CCmdUI* pCmdUI);
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

