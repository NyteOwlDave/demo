
/////////////////////////////////////////////////////////////////////////////
//
// TextDlg.h - Simple Text Input Window
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CTextDlg : public CDialog {

public:

	DWORD	m_dwMaxChars;
	CString m_sTitle;

public:

	CTextDlg(CWnd* pParent = NULL);

	//{{AFX_DATA(CTextDlg)
	enum { IDD = IDD_TEXTDLG };
	CString	m_sText;
	//}}AFX_DATA

	//{{AFX_VIRTUAL(CTextDlg)
	protected:
	virtual void DoDataExchange(CDataExchange*);
	//}}AFX_VIRTUAL

protected:

	//{{AFX_MSG(CTextDlg)
	virtual BOOL OnInitDialog();
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

