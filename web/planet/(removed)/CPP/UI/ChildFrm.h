
/////////////////////////////////////////////////////////////////////////////
//
// ChildFrm.h - Child Frame Window
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CChildFrame : public CMDIChildWnd {

public:

	CChildFrame();
	virtual ~CChildFrame();
	
	#ifdef _DEBUG
		virtual void AssertValid() const;
		virtual void Dump(CDumpContext&) const;
	#endif

	//{{AFX_VIRTUAL(CChildFrame)
	virtual BOOL PreCreateWindow(CREATESTRUCT&);
	//}}AFX_VIRTUAL

protected:

	DECLARE_DYNCREATE(CChildFrame)

	//{{AFX_MSG(CChildFrame)
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

