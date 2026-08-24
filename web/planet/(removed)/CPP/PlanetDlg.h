
/////////////////////////////////////////////////////////////////////////////
//
// PlanetDlg.h - Get Planet Create Parameters
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////


#include "PixMap.h"
#include "TexList.h"
#include "PlanFunc.h"



/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CPlanetDlg : public CDialog {

protected:

	BOOL		m_bNewPlanet;
	PLANET*		m_pPlanet;

	CPixMap		m_bmp;
	CRect		m_rcPreview;

public:

	CPlanetDlg(CWnd* pParent = NULL);
	~CPlanetDlg();

	void		ShowTexture();
	BOOL		EditPlanet( PLANET* );
	PLANET*		GetPlanet();

	double		Deg( double );
	double		Rad( double );

	//{{AFX_DATA(CPlanetDlg)
	enum { IDD = IDD_PLANETDLG };
	CStatic	m_Image;
	CString	m_szSize;
	double	m_xrot;
	double	m_yrot;
	//}}AFX_DATA

	//{{AFX_VIRTUAL(CPlanetDlg)
	protected:
	virtual void DoDataExchange(CDataExchange*);
	//}}AFX_VIRTUAL

protected:

	//{{AFX_MSG(CPlanetDlg)
	virtual BOOL OnInitDialog();
	virtual void OnOK();
	afx_msg void OnPaint();
	afx_msg void OnTexture();
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

