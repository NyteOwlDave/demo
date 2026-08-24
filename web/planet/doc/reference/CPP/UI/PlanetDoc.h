
/////////////////////////////////////////////////////////////////////////////
//
// PlanetDoc.h - Document
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////


#include "PlanFunc.h"


// View Update Hint Codes
#define UPD_RENDER	(0x0001)
#define UPD_RESIZE	(0x0002)
#define UPD_NEWBMP	(0x0004)



/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CPlanetDoc : public CDocument {

public:

	PLANET*		m_pPlanet;
	BOOL		m_bFileOK;

public:

	virtual ~CPlanetDoc();

	void DrawGrid();
	
	#ifdef _DEBUG
		virtual void AssertValid() const;
		virtual void Dump(CDumpContext&) const;
	#endif

	//{{AFX_VIRTUAL(CPlanetDoc)
	public:
	virtual BOOL OnNewDocument();
	virtual void Serialize(CArchive&);
	virtual void DeleteContents();
	virtual BOOL OnOpenDocument(LPCTSTR lpszPathName);
	//}}AFX_VIRTUAL

protected:

	CPlanetDoc();
	DECLARE_DYNCREATE(CPlanetDoc)
	//{{AFX_MSG(CPlanetDoc)
	afx_msg void OnCommandSettings();
	afx_msg void OnCommandCompile();
	afx_msg void OnCommandSpinCCW();
	afx_msg void OnCommandSpinCW();
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

