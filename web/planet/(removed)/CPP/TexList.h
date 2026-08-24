
/////////////////////////////////////////////////////////////////////////////
//
// TexList.cpp - Texture List Control
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#ifndef TEXLIST_DEFINED
#define TEXLIST_DEFINED


#include "texture.h"


/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CTexList {

public:

	CTexture**	m_pList;
	DWORD		m_dwNum;
	DWORD		m_dwMax;

public:

	CTexList();
	~CTexList();

	BOOL	LoadTexture();
	BOOL	CreateTexture( CPixMap& );
	BOOL	AppendTexture( CTexture* );
	BOOL	DeleteTexture( DWORD );

	BOOL	Alloc();
	BOOL	Grow();
	void	Free();
};

#endif  // !TEXLIST_DEFINED

