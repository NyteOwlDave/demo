
/////////////////////////////////////////////////////////////////////////////
//
// TexDlg.h - Texture Management Dialog
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////


#include "PixMap.h"


/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CTexDlg : public CDialog {

public:

	// Selected Texture
	CTexture*	m_pTexture;

	// Preview Image
	CPixMap		m_bmp;
	CRect		m_rcPreview;

	// Colors
	CBrush		m_brMinC;
	CBrush		m_brMaxC;
	COLORREF	m_crMinC;
	COLORREF	m_crMaxC;
	CRect		m_rcMinC;
	CRect		m_rcMaxC;

public:

	CTexDlg(CWnd* pParent = NULL);

	BOOL	GetClientArea( CWnd&, CRect& );

	void		LoadTexList( int );
	CTexture*	GetTexPtr( int );
	void		ShowTexture();
	void		NoTexSel();
	void		NoTexBits();

	void		NewColors();
	void		EditMinC();
	void		EditMaxC();
	BOOL		EditColor( COLORREF& );
	void		GetRGB( RGBQUAD*, COLORREF );


	//{{AFX_DATA(CTexDlg)
	enum { IDD = IDD_TEXDLG };
	CStatic	m_preview;
	CComboBox	m_names;
	CStatic	m_minc;
	CStatic	m_maxc;
	double	m_base;
	double	m_expo;
	UINT	m_uNum;
	//}}AFX_DATA

	//{{AFX_VIRTUAL(CTexDlg)
	protected:
	virtual void DoDataExchange(CDataExchange*);
	//}}AFX_VIRTUAL

protected:

	//{{AFX_MSG(CTexDlg)
	virtual BOOL OnInitDialog();
	afx_msg void OnBand();
	afx_msg void OnCurve();
	afx_msg void OnDelete();
	afx_msg void OnImport();
	afx_msg void OnMakeTex();
	afx_msg void OnPalette();
	afx_msg void OnRename();
	afx_msg void OnPaint();
	afx_msg void OnSelchangeNames();
	afx_msg HBRUSH OnCtlColor(CDC* pDC, CWnd* pWnd, UINT nCtlColor);
	afx_msg void OnLButtonUp(UINT nFlags, CPoint point);
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

