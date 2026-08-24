
/////////////////////////////////////////////////////////////////////////////
//
// PlanetView.h - View
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////


#include "PixMap.h"



/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CPlanetView : public CView {

public:

	CPixMap		m_bmp;			// Drawing surface
	UINT		m_uTimer;

public:

	virtual ~CPlanetView();

	CPlanetDoc* GetDocument();

	PLANET* GetPlanet();

	void StartAnimation();
	void StopAnimation();

	void MatchViewSize();
	void MatchImage();

	#ifdef _DEBUG
		virtual void AssertValid() const;
		virtual void Dump(CDumpContext&) const;
	#endif

	//{{AFX_VIRTUAL(CPlanetView)
	public:
	virtual void OnDraw(CDC*);
	virtual BOOL PreCreateWindow(CREATESTRUCT&);
	protected:
	virtual void OnUpdate(CView* pSender, LPARAM lHint, CObject* pHint);
	//}}AFX_VIRTUAL

protected:

	CPlanetView();
	DECLARE_DYNCREATE(CPlanetView)
	//{{AFX_MSG(CPlanetView)
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
	afx_msg void OnCommandRender();
	afx_msg BOOL OnEraseBkgnd(CDC* pDC);
	afx_msg void OnTimer(UINT nIDEvent);
	afx_msg void OnCommandAnimate();
	afx_msg void OnUI_CommandAnimate(CCmdUI* pCmdUI);
	afx_msg void OnWindowMatch();
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};



/////////////////////////////////////////////////////////////////////////////
// Inline
/////////////////////////////////////////////////////////////////////////////

#ifndef _DEBUG
inline CPlanetDoc* CPlanetView::GetDocument()
   { return (CPlanetDoc*)m_pDocument; }
#endif

