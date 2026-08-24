
/////////////////////////////////////////////////////////////////////////////
//
// Texture.h - Texture
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////


#ifndef TEXTURE_DEFINED
#define TEXTURE_DEFINED

#include "PixMap.h"



/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CTexture {

public:
	
	CString		m_szPath;		// Pathname
	CString		m_szName;		// Friendly Name
	int			m_iSize;		// Size (64, 128, 256)
	BYTE*		m_pTexels;		// Texel Buffer
	RGBQUAD		m_pal[256];		// Palette

public:

	CTexture();
	~CTexture();

	BOOL	SetImage( CPixMap* );
	BOOL	SetImage( BYTE*, RGBQUAD*, int );
	void	SetPath( LPCSTR );

	BOOL	Alloc( int );
	void	Free();

	BOOL	IsSizeOK( int );
	BOOL	IsValid();

	void	Error( int );
};


#endif  // !TEXTURE_DEFINED

