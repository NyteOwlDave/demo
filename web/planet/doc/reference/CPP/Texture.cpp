
/////////////////////////////////////////////////////////////////////////////
//
// Texture.cpp - Texture
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "Texture.h"



/////////////////////////////////////////////////////////////////////////////
// Macros
/////////////////////////////////////////////////////////////////////////////

#define MAX_ERR (sizeof(g_szErrMsg)/sizeof(char*))

#define ERR_UNKNOWN		0
#define ERR_SIZE		  1
#define ERR_MEM			  2
#define ERR_PTR			  3
#define ERR_PIXMAP		4
#define ERR_PAL			  5



/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

static char* g_szNoName = "No Name";

static char* g_szErrMsg[] = {

	"Unknown error code.",

	"Invalid bitmap size.\n\n"
	   "Good sizes are:\n\n"
	   "64 x 64\n"
	   "128 x 128\n"
	   "256 x 256\n\n"
	   "(256-color only)",

	"Out of memory",

	"Bad pointer",

	"Bad bitmap",

	"Can't find bitmap's palette"
};



/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CTexture::CTexture() {

	int x;

	m_szPath  = "";
	m_szName  = g_szNoName;
	m_iSize   = 0;
	m_pTexels = NULL;

	// Gray Scale Palette
	for( x=0; x<256; x++ ) {

		m_pal[x].rgbRed      = x;
		m_pal[x].rgbGreen    = x;
		m_pal[x].rgbBlue     = x;
		m_pal[x].rgbReserved = 0;
	}
}

CTexture::~CTexture() { Free(); }



/////////////////////////////////////////////////////////////////////////////
// Set Texels from a PixMap object
/////////////////////////////////////////////////////////////////////////////

BOOL CTexture::SetImage( CPixMap* p ) {

	int y;
	int w, w2, h, h2;
	BYTE* pin;
	BYTE* pout;
	RGBQUAD* pPal;

	// Validate PixMap
	if( !p ) {

		Error( ERR_PTR );
		return FALSE;
	}
	
	if( !p->IsValid() ) {
	
		Error( ERR_PIXMAP );
		return FALSE;
	}

	// Get Palette Address
	pPal = p->GetPalAddr();
	if( !pPal ) {

		Error( ERR_PAL );
		return FALSE;
	}

	// Get PixMap Dimensions
	p->GetSize( w, h );
	w2 = w;
	h2 = (h < 0) ? -h : h;

	// Validate dimensions
	if( (w!=h2) || (p->GetBPP() != 8) ) {
	
		Error( ERR_SIZE );
		return FALSE;
	}

	// Allocate new buffer
	//  This checks the size for us, too...
	if( !Alloc( w ) ) return FALSE;

	// Setup pointers
	pout = m_pTexels;
	pin  = p->m_bits;
	
	// Deal with upside down bitmaps
	if( h > 0 ) {
	
		pin += ((h-1)*w);
		w2 = -w;
	}

	// Copy texels
	for( y=0; y<h2; y++ ) {
	
		memcpy( pout, pin, w );
	
		pout += w;
		pin  += w2;
	}

	// Copy Palette
	memcpy( m_pal, pPal, 256 * sizeof( RGBQUAD ) );

	// Set Path and Name
	SetPath( p->m_sPath );

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Set Texture From Texel Buffer and Palette
/////////////////////////////////////////////////////////////////////////////

BOOL CTexture::SetImage( BYTE* pTex, RGBQUAD* pPal, int i ) {

	// Check pointers
	if( (!pTex) || (!pPal) ) {

		Error( ERR_PTR );
		return FALSE;		
	}

	// Allocate new buffer
	if( !Alloc( i ) ) return FALSE;

	// Copy info
	memcpy( m_pTexels, pTex, i*i );
	memcpy( m_pal, pPal, 256*sizeof(RGBQUAD) );
	
	// No path or name
	m_szPath = "";
	m_szName = g_szNoName;

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Report Error
/////////////////////////////////////////////////////////////////////////////

void CTexture::Error( int n ) {

	if( n<0 )			n = ERR_UNKNOWN;
	if( n>=MAX_ERR )	n = ERR_UNKNOWN;

	::MessageBox( AfxGetMainWnd()->GetSafeHwnd(), 
				  ::g_szErrMsg[n],
				  "Texture Class",
				  MB_OK );
}



/////////////////////////////////////////////////////////////////////////////
// Allocate Texel Buffer
/////////////////////////////////////////////////////////////////////////////

BOOL CTexture::Alloc( int iSize ) {

	int bytes;
	BYTE* p;

	// Check Size
	if( !IsSizeOK( iSize ) ) {

		Error( ERR_SIZE );
		return FALSE;
	}

	// Release old (if any)
	Free();
	
	// Allocate new
	bytes = iSize * iSize;
	p = new BYTE[bytes];
	if( !p ) {

		Error( ERR_MEM );
		return FALSE;
	}

	// Save results
	m_pTexels = p;
	m_iSize = iSize;

	// Clear new buffer
	memset( p, 0, bytes );

	// Cool!
	return TRUE;	
}



/////////////////////////////////////////////////////////////////////////////
// Release Texel Buffer
/////////////////////////////////////////////////////////////////////////////

void CTexture::Free() {

	if( m_pTexels ) delete[] m_pTexels;

	m_pTexels = NULL;
	m_iSize = 0;
}



/////////////////////////////////////////////////////////////////////////////
// Determine if a Size if Valid
/////////////////////////////////////////////////////////////////////////////

BOOL CTexture::IsSizeOK( int i ) {

	switch( i ) {
	case 64:
	case 128:
	case 256:
		return TRUE;
	}

	return FALSE;
}


/////////////////////////////////////////////////////////////////////////////
// Determine if Texture is Valid
/////////////////////////////////////////////////////////////////////////////

BOOL CTexture::IsValid() {

	int   i = m_iSize;
	BYTE* p = m_pTexels;

	if( !IsSizeOK( i ) ) return FALSE;
	if( !p ) return FALSE;
	
	return AfxIsValidAddress( p, i*i );		
}



/////////////////////////////////////////////////////////////////////////////
// Set Pathname and Name
/////////////////////////////////////////////////////////////////////////////

void CTexture::SetPath( LPCSTR szPath ) {

	LPCSTR p;
	LPCSTR p2;

	// Pointer Checl
	if( !szPath ) {

		m_szPath = "";
		m_szName = g_szNoName;
		return;
	}
	
	// Save pathname
	m_szPath = szPath;
	
	// Empty string?
	p = szPath;	
	if( *p==0 ) {
	
		m_szName = g_szNoName;
		return;
	}

	// Locate filename portion
	while( p2=strchr( p, '\\' ) ) p = p2+1;

	// Save filename portion
	if( *p ) m_szName = p;
	else     m_szName = g_szNoName;
}

