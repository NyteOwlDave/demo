
/////////////////////////////////////////////////////////////////////////////
//
// PixMap.cpp - Wrapper for Windows DIBs
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "PixMap.h"



/////////////////////////////////////////////////////////////////////////////
// Macros
/////////////////////////////////////////////////////////////////////////////

#ifndef	IsSafeCWnd
 #define IsSafeCWnd(p) VALIDATE((p)->GetSafeHwnd())
#endif


// Error Codes
#define IER_DIM			0
#define IER_PTR			1
#define IER_GET_DC		2
#define IER_REL_DC		3
#define IER_HWND		4
#define IER_GDI			5
#define IER_ALLOC		6
#define IER_OPEN		7
#define IER_READ		8
#define IER_READ_HDR	9
#define IER_READ_PAL	10
#define IER_READ_PIX	11
#define IER_WRITE		12
#define IER_WRITE_HDR	13
#define IER_WRITE_PAL	14
#define IER_WRITE_PIX	15
#define IER_CODED		16



/////////////////////////////////////////////////////////////////////////////
// Error Messages
/////////////////////////////////////////////////////////////////////////////

static char* szErrMsg[] = {

	"invalid image dimension(s)",			    // IER_DIM
	"invalid pointer",						        // IER_PTR
	"could not get device context",			  // IER_GET_DC
	"could not release device context",		// IER_REL_DC
	"could not get window handle",			  // IER_HWND
	"could not create GDI object",			  // IER_GDI
	"could not allocate memory",			    // IER_ALLOC
	"could not open file",					      // IER_OPEN
	"could not read file",					      // IER_READ
	"could not read header",				      // IER_READ_HDR
	"could not read palette",				      // IER_READ_PAL
	"could not read scanline data",			  // IER_READ_PIX
	"could not write file",					      // IER_WRITE
	"could not write header",				      // IER_WRITE_HDR
	"could not write palette",				    // IER_WRITE_PAL
	"could not write scanline data",		  // IER_WRITE_PIX
	"compressed image is not supported",	// IER_CODED
};



/////////////////////////////////////////////////////////////////////////////
// Helpers for horizontal flipping of scanlines
/////////////////////////////////////////////////////////////////////////////

// Data for helpers
/*
static LPBYTE pInput;
static LPBYTE pOutput;
static int iPels;
static int iChunks;
static int iEndPos;
static int iMask;
*/


/////////////////////////////////////////////////////////////////////////////
// Construction
/////////////////////////////////////////////////////////////////////////////

CPixMap::CPixMap()  { 

	ZeroDIB(); 
	m_sPath = "";
	m_sExt = "";
}

CPixMap::~CPixMap() { DestroyDIB(); }



/////////////////////////////////////////////////////////////////////////////
// Allocate memory
/////////////////////////////////////////////////////////////////////////////

void* CPixMap::Alloc( DWORD dw ) {

	LPVOID p = NULL;
	
	if( dw ) p = (LPVOID) ::GlobalAlloc( GPTR, dw );
	if( !p ) Dump( IER_ALLOC );	

	return p;
}



/////////////////////////////////////////////////////////////////////////////
// Debug Messages
/////////////////////////////////////////////////////////////////////////////

void CPixMap::Dump( int i ) {

	CString s;

	s.Format( "Image: %s.", ::szErrMsg[i] );
	TRACE0( s );
	TRACE0( "\n" );

	AfxMessageBox( s );
}




/////////////////////////////////////////////////////////////////////////////
// Check dimensions for validity
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::IsValidDim( int w, int h ) {

	if( (w>0) && (h!=0) )  return TRUE;
	
	Dump( IER_DIM );
	return FALSE;
}



/////////////////////////////////////////////////////////////////////////////
// Get Bounding Rectangle for DIB
/////////////////////////////////////////////////////////////////////////////

void CPixMap::GetBoundRect( LPRECT rc ) {

	// Validate, then clear rect
	if( !rc ) { Dump( IER_PTR ); return; }

	::memset( rc, 0, sizeof( RECT ) );

	// If header available...
	if( m_bmih ) {

		rc->right  = m_bmih->biWidth;
		rc->bottom = ABS( m_bmih->biHeight );
		
		return;
	}

	Dump( IER_PTR );
}



/////////////////////////////////////////////////////////////////////////////
// Get Main Frame's DC
/////////////////////////////////////////////////////////////////////////////

HWND CPixMap::GetMainHwnd() {

	HWND h;

	h = ::GetDesktopWindow();
	if( !h ) { Dump( IER_HWND ); return NULL; }

	return h;
}



/////////////////////////////////////////////////////////////////////////////
// Get Main Frame's DC
/////////////////////////////////////////////////////////////////////////////

HDC CPixMap::GetMainDC() {

	HWND h = GetMainHwnd();
	HDC hDC;

	if( !h ) return NULL;

	hDC = ::GetDC( h );	
	if( !hDC ) Dump( IER_GET_DC );
	
	return hDC;
}



/////////////////////////////////////////////////////////////////////////////
// Free Main Frame's DC
/////////////////////////////////////////////////////////////////////////////

void CPixMap::FreeMainDC( HDC hdc ) {

	HWND h = GetMainHwnd();
	
	if( !hdc ) return;

	if( h ) ::ReleaseDC( h, hdc );
	else Dump( IER_REL_DC );
}



/////////////////////////////////////////////////////////////////////////////
// Zero important class members
/////////////////////////////////////////////////////////////////////////////

void CPixMap::ZeroDIB() {

	m_bmih		= NULL;		// BITMAPINFO structure
	m_hbmp		= NULL;		// Bitmap Handle
	m_bits		= NULL;		// Pixel Buffer
}



/////////////////////////////////////////////////////////////////////////////
// Destroy dynamic buffers and GDI object (if any)
/////////////////////////////////////////////////////////////////////////////

void CPixMap::DestroyDIB() {

	// Free up stuff that we created
	if( m_bmih )   ::GlobalFree( m_bmih );
    if( m_hbmp )   ::DeleteObject( m_hbmp );

	// Reset data members
	ZeroDIB();
}



/////////////////////////////////////////////////////////////////////////////
// Create a 256-color DIB
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::CreateDIB256( int w, int h, RGBQUAD* pal ) {

	RGBQUAD* prgb;

	// MUST have a palette!
	if( !pal ) return FALSE;

	// Destroy any previous stuff
	DestroyDIB();

	// Create Header Structures
	if( !(m_bmih = CreateINFO( 8, w, h, NULL ))  )	
		goto Fail;
	
	// Get Palette Address
	prgb = GetPalAddr();
	if( !prgb ) goto Fail;

	// Copy in the Palette	
	::memcpy( prgb, pal, sizeof( RGBQUAD ) * 256 );

	// Create Bitmap Object
	if( !(m_hbmp = CreateGDIObject( m_bmih, &m_bits )) ) 
		goto Fail;
	
    return TRUE;

Fail:
	DestroyDIB();
	return FALSE;
}



/////////////////////////////////////////////////////////////////////////////
// Create DIB of any BPP
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::CreateDIB( int bpp, int w, int h ) {

	// Destroy any previous stuff
	DestroyDIB();

	// Create Header Structures
	if( !(m_bmih = CreateINFO( bpp, w, h, NULL ))  )	
		goto Fail;
	
	// Create Bitmap Object
	if( !(m_hbmp = CreateGDIObject( m_bmih, &m_bits )) ) 
		goto Fail;
	
    return TRUE;

Fail:
	DestroyDIB();
	return FALSE;
}



/////////////////////////////////////////////////////////////////////////////
// Create the GDI object for the DIB
/////////////////////////////////////////////////////////////////////////////

HBITMAP CPixMap::CreateGDIObject( BMPIH* pInfo, LPBYTE* pPels ) {

	HDC		hdc;
	HBITMAP hBmp;

	// Validate Ptrs
	if( (!pInfo)||(!pPels) ) { Dump( IER_PTR ); return NULL; }

	// Get the client's device context
	hdc = GetMainDC();
	if( !hdc ) return NULL;

    // Create DIB bit buffer
	hBmp = ::CreateDIBSection( hdc,					// Client DC
							   (BMPI*)(pInfo),
							   DIB_RGB_COLORS,		// Use RGB colors
                               (void**)pPels,		// Receives bit bfr ptr
							   NULL, 0 );	

	// We're doen with the Client's DC now
	FreeMainDC( hdc );

	// Failed?  Warning message.
	if( !hBmp ) Dump( IER_GDI );

    // Did it work?
	return hBmp;
}



/////////////////////////////////////////////////////////////////////////////
// Create/Init BITMAPINFOHEADER structure (Any Bit Depth)
/////////////////////////////////////////////////////////////////////////////

BMPIH* CPixMap::CreateINFO( int bpp, int w, int h, DWORD* pSize ) {

	BMPIH*		p;
	DWORD		dwPal;

	// Validate Dimensions
	if( !IsValidDim( w, h ) ) return NULL;
	
	// Get size of buffer (including max-size palette, if any)
	dwPal = sizeof( BMPIH ) + GetPalBytes( bpp, 0 );

	// Allocate BITMAPINFO structure
	p = ( BMPIH* ) Alloc( dwPal );	
	if( !p ) return NULL;

	// Return size (if requested)
	if( pSize ) *pSize = dwPal;
	
	// Init BITMAPINFO
	p->biSize			= sizeof( BMPIH );
	p->biWidth			= w;
	p->biHeight			= h;
	p->biPlanes			= 1;
	p->biBitCount		= bpp;
	p->biCompression	= BI_RGB;
	p->biSizeImage		= 0;
	p->biXPelsPerMeter	= 0;
	p->biYPelsPerMeter	= 0;
	p->biClrUsed		= 0;
	p->biClrImportant	= 0;

	return p;
}



/////////////////////////////////////////////////////////////////////////////
// Allocate a buffer for scanlines
/////////////////////////////////////////////////////////////////////////////

BYTE* CPixMap::CreateSCAN( int bpp, int w, int h, DWORD* pSize ) {

	DWORD	dwSize;
	BYTE*	p = NULL;
	
	// Buffer Size
	dwSize = GetPixBytes( bpp, w, h );

	// Allocate (pad by 1 DWORD, just in case)
	p = (BYTE*) Alloc( dwSize + 4 );

	// Return size (if requested)
	if( pSize ) *pSize = dwSize;
	
	// Return Pointer
	return p;
}



//===========================================================================
// Load Windows Bitmap
//===========================================================================

BOOL CPixMap::LoadWinBmp( LPCSTR lpsz ) {

	CWaitCursor csr;			// Be patient, please!
	CFile*	file	= NULL;		// File I/O Object

	BMPFH	bmpFile;			// File Header Data
	BMPIH	bmih;				// Info Header Data
	
	BOOL	bOK		= FALSE;	// Success/Fail flag
	BOOL	b;					// Misc flag

	DWORD	dwPalSz;			// Size of palette data
	DWORD	dwPixSz;			// Size of scanline data
	
	UINT	uNeed;				// File bytes to be read
	UINT	uGot;				// File bytes actually read

	int		w,h,bpp;			// Dimensions
	int		c;					// Colors Used

	// Destroy any prior image
	DestroyDIB();

	// Open the file
	file = ::OpenFile( lpsz, MODE_READ );
	if( !file ) { Dump( IER_OPEN ); goto Bye; }

	// Retrieve/validate the file header
	uNeed = sizeof( BMPFH );
	b  = ::ReadBlock( file, &bmpFile, uNeed, uGot );
	b &= VALIDATE( uGot == uNeed );
	if( !b ) { Dump( IER_READ_HDR ); goto Bye; }

	// Retrieve/validate the info header
	uNeed = sizeof( BMPIH );
	b  = ::ReadBlock( file, &bmih, uNeed, uGot );
	b &= VALIDATE( uGot == uNeed );
	b &= VALIDATE( bmih.biSize == sizeof( BMPIH ) );
	if( !b ) { Dump( IER_READ_HDR ); goto Bye;	}

	// Reject Compressed Images
	if( bmih.biCompression != BI_RGB )
		{ Dump( IER_CODED ); goto Bye; }
 
	// Get Info
	w   = bmih.biWidth;
	h   = bmih.biHeight;
	c   = bmih.biClrUsed;
	bpp = bmih.biBitCount;

	// Allocate dynamic Info Header (with max palette storage)
	m_bmih = CreateINFO( bpp, w, h, NULL );
	if( !m_bmih ) goto Bye;
 
	// Copy static header into dynamic header
	::memcpy( m_bmih, &bmih, sizeof( BMPIH ) );

	// Get the ACTUAL # of bytes to read for palette
	dwPalSz = GetPalBytes( bpp, c );

	// Load palette (if any)
	if( dwPalSz ) {

		// Cast to BITMAPINFO ptr
		BMPI* p = (BMPI*)(m_bmih);

		// Retrieve the color table
		b  = ::ReadBlock( file, p->bmiColors, dwPalSz, uGot );
		b &= VALIDATE( uGot == dwPalSz );
		if( !b ) { Dump( IER_READ_PAL ); goto Bye; }
	}

	// Create GDI Object
	m_hbmp = CreateGDIObject( m_bmih, &m_bits );
	if( !m_hbmp ) goto Bye;
	
	// Determine size of scanline buffer
	dwPixSz = GetPixBytes( bpp, w, h );
	if( !dwPixSz ) { Dump( IER_DIM ); goto Bye; }	

	// Retrieve the scanlines
	b  = ::ReadBlock( file, m_bits, dwPixSz, uGot );
	b &= VALIDATE( uGot == dwPixSz );
	if( !b ) { Dump( IER_READ_PIX ); goto Bye; }

	// Success!
	bOK = TRUE;

Bye:
	// Close file
	if( file ) delete file; 
	
	// If no success, trash everything
	if( !bOK ) DestroyDIB();

	// Save new pathname
	else m_sPath = lpsz;

	return bOK;
}




/////////////////////////////////////////////////////////////////////////////
// Save Image to Windows BMP file
/////////////////////////////////////////////////////////////////////////////
//
// This function handles both top-down or bottom-up images, but it will
// ALWAYS save the image in bottom-up format, since many graphics programs
// cannot deal with top-down images in BMP files.
//
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::SaveWinBmp( LPCSTR lpsz ) {

	CWaitCursor csr;			// Be patient, please!
	CFile*		file = NULL;	// File I/O Object

	BYTE*	pLine;				// Scanline pointer

	BMPFH	bmfh;				// File Header
	BMPIH	bmih;				// Info Header
	
	DWORD	sz1;				// Size of File Header
	DWORD	sz2;				// Size of Info Header
	DWORD	sz3;				// Size of Palette
	DWORD	sz4;				// Size of Scanline Data

	UINT	uLines;				// Number of scanlines
	UINT	uLen;				// Bytes per scanline
	
	int		c;					// Colors Used
	int		bpp;				// Image Depth
	int		w;					// Image Width
	int		h;					// Image height (may be negative)
	int		ofs;				// Bump value for pLine ( " " " )

	// Validate image ptrs
	if( !IsValid() ) { Dump( IER_PTR ); return FALSE; }

	// Get Dimensions
	w   = m_bmih->biWidth;
	h   = m_bmih->biHeight;
	c   = m_bmih->biClrUsed;
	bpp = m_bmih->biBitCount;

	// Validate image ptrs
	if( !IsValidDim( w, h ) ) { Dump( IER_DIM ); return FALSE; }

	// Clear structures
	::memset( &bmfh, 0, sizeof( BMPFH ) );
	::memset( &bmih, 0, sizeof( BMPIH ) );

	// Magic number of Windows BMP
	bmfh.bfType = ((WORD)('B')) + (((WORD)('M'))<<8);

	// Size of file header
	sz1 = sizeof( BMPFH );	
	
	// Size of info header
	sz2 = sizeof( BMPIH );	
	
	// Size of palette array
	sz3 = GetPalBytes( bpp, c );
	
	// Size of pixel array
	sz4 = GetPixBytes( bpp, w, h );

	// Did it work?
	if( !sz4 ) { Dump( IER_DIM ); return FALSE; }

	// Save file size
	bmfh.bfSize = sz1+sz2+sz3+sz4;

	// Save offset to bits
	bmfh.bfOffBits = sz1+sz2+sz3;

	// Open file
	file = ::OpenFile( lpsz, MODE_OVERWRITE );
	if( !file ) { Dump( IER_OPEN ); return FALSE; }

	// Write File Header
	if( ! ::WriteBlock( file, &bmfh, sz1 ) ) 
		{ Dump( IER_WRITE_HDR ); goto Bye; }

	// Copy info header to local buffer
	::memcpy( &bmih, m_bmih, sz2 );

	// If this is a top-down bitmap, reverse height
	bmih.biHeight = ABS(h);

	// Write Local Copy of Info Header
	if( ! ::WriteBlock( file, &bmih, sz2 ) ) 
		{ Dump( IER_WRITE_HDR ); goto Bye; }
	
	// Write Palette (if any)
	if( sz3 ) {
		
		// Cast to BITMAPINFO type
		BMPI* p = (BMPI*)(m_bmih);

		// Write palette	
		if( ! ::WriteBlock( file, p->bmiColors, sz3 ) ) 
			{ Dump( IER_WRITE_PAL ); goto Bye; }		
	}
	
	// Number of scanlines
	uLines = (UINT)(ABS(h));

	// Bytes-per-scanline (DWORD aligned)
	uLen = GetScanBytes( bpp, w );						 
	
	// Convert to integer
	ofs = (int)(uLen);

	// Point to top scanline (for bottom-up type)
	pLine = m_bits;

	// Handle top-down bitmaps (convert to bottom-up)
	if( h<0 ) {
		
		// Point to bottom scanline
		pLine += ((uLines-1)*uLen);
		
		// Cause scanline pointer to be decremented
		//  (move from bottom to top of buffer).
		ofs = (-ofs);
	}

	// Write Scanlines
	while( uLines ) {
	
		// Write next scanline
		if( ! ::WriteBlock( file, pLine, uLen ) ) 
			{ Dump( IER_WRITE_PIX ); goto Bye; }

		// Point to next line (up or down)
		pLine += ofs;
		
		// Bump line count
		uLines--;
	}

	// Save new pathname
	m_sPath = lpsz;

	// Done!
	delete file;
	return TRUE;

Bye:
	if( file ) delete file;
	return FALSE;
}



/////////////////////////////////////////////////////////////////////////////
// Blit All or Part of Image to a Window
/////////////////////////////////////////////////////////////////////////////
//
// pWnd		= The window to draw to (in client area)
// pnt		= The top/left point to draw to
// prc		= The section of the image to draw there
//
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::Blit( CWnd* pWnd, CPoint pnt, LPRECT prc ) {

	CDC* pWinDC = NULL;
	BOOL b		= FALSE;

	// Check ptrs
	if( !IsSafeCWnd(pWnd) ) { Dump( IER_PTR ); return FALSE; }
	
	// Get Window's DC
	pWinDC = pWnd->GetDC();

	// Did it work?
	if( !pWinDC ) { Dump( IER_GET_DC ); return FALSE; }
	
	// Draw it
	b = Blit( pWinDC, pnt, prc );

	// Free up the DC
	pWnd->ReleaseDC( pWinDC );
	
	// Success?
	return b;
}



/////////////////////////////////////////////////////////////////////////////
// Stretch Blit Image to a DC
/////////////////////////////////////////////////////////////////////////////
//
// This function stretches the entire image into a rectangle on the 
// specified device context.
//
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::StretchBlit( CDC* pDC, LPRECT prc ) {

	CDC			BmpDC;
	CBitmap*	pOldBmp = NULL;
	CBitmap*	pNewBmp = NULL;
	BOOL		b = FALSE;
	int			w, h;

	// Get image size
	if( !GetSize( w, h ) ) 
		{ Dump( IER_DIM ); return FALSE; }

	// Check ptrs
	if( (!pDC) || (!prc) || (!m_hbmp) )
		{ Dump( IER_PTR ); return FALSE; }

	// Create Bitmap DC
	if( !BmpDC.CreateCompatibleDC( pDC ) ) 
		{ Dump( IER_GET_DC ); return FALSE; }

	// Temporary object (MFC will delete during idle loop)
	pNewBmp = CBitmap::FromHandle( m_hbmp );

	// Select Bitmap into DC
	pOldBmp = (CBitmap*)(BmpDC.SelectObject( pNewBmp ));

	// Make sure height is positive
	h = ABS( h );

	// Set Stretch Mode
	pDC->SetStretchBltMode( HALFTONE );
	pDC->SetBrushOrg( 0, 0 );

	// Blit
	b = pDC->StretchBlt( prc->left, prc->top, 
						 1 + (prc->right)  - (prc->left), 
						 1 + (prc->bottom) - (prc->top), 
						 &BmpDC, 
						 0, 0,
						 w, h,
						 SRCCOPY );

	// Restore original bmp to DC
	BmpDC.SelectObject( pOldBmp );

	// Success?
	return b;
}



/////////////////////////////////////////////////////////////////////////////
// Stretch Blit one CPixMap into another CPixMap
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::Stretch( CRect& rcDest, CPixMap* pSrc, CRect& rcSrc ) {

	CDC			dcOld;
	CDC			dcNew;
	CDC*		pDC;
	CWnd*		pWin;
	CBitmap*	pOldBmp1 = NULL;
	CBitmap*	pOldBmp2 = NULL;
	CBitmap*	pBmp1;
	CBitmap*	pBmp2;
	BOOL		bOK = FALSE;
	int			w, h;
	CPixMap*		pDest = this;

	// Check Pointers
	if( !pSrc ) {

		Dump( IER_PTR );
		return FALSE;
	}

	// Validate Images
	if( (!(pDest->IsValid())) ||
		(!(pSrc->IsValid())) ) {
	
		Dump( IER_DIM );
		return FALSE;
	}

	// Normalize Rectangles
	rcSrc.NormalizeRect();
	rcDest.NormalizeRect();

	// Get Main Window;s Ptr
	pWin = AfxGetMainWnd();
	if( !pWin ) {
	
		Dump( IER_HWND );
		return FALSE;
	}

	// Get DC for Main Window
	pDC = pWin->GetDC();
	if( !pDC ) {
	
		Dump( IER_GET_DC );
		return FALSE;
	}

	// Create a Compatible DC for the new Image
	if( !dcNew.CreateCompatibleDC( pDC ) ) {
	
		Dump( IER_GET_DC );
		goto Fail;
	}

	// Create a Compatible DC for the old Image
	if( !dcOld.CreateCompatibleDC( pDC ) ) {
	
		Dump( IER_GET_DC );
		goto Fail;
	}

	// Create temporary CBitmap objects for HBITMAPS
	pBmp1 = CBitmap::FromHandle( pDest->m_hbmp );
	pBmp2 = CBitmap::FromHandle( pSrc->m_hbmp);

	// Assign bitmaps to DC's
	pOldBmp1 = (CBitmap*)(dcNew.SelectObject(pBmp1));
	pOldBmp2 = (CBitmap*)(dcOld.SelectObject(pBmp2));

	// Get width and height of image
	w = pSrc->m_bmih->biWidth;
	h = pSrc->m_bmih->biHeight;
	h = ABS(h);

	// Set Stretch Mode
	dcNew.SetStretchBltMode( HALFTONE );
	dcNew.SetBrushOrg( 0, 0 );

	// Stretched Blit
	bOK = dcNew.StretchBlt( 
	
		rcDest.left,
		rcDest.top, 
		rcDest.right  - rcDest.left + 1, 
		rcDest.bottom - rcDest.top  + 1, 
		&dcOld, 
		rcSrc.left, 
		rcSrc.top, 
		rcSrc.right  - rcSrc.left + 1, 
		rcSrc.bottom - rcSrc.top  + 1, 
		SRCCOPY );

// Restore original bitmaps to DCs
	dcNew.SelectObject(pOldBmp1);
	dcOld.SelectObject(pOldBmp2);

Fail:
	if( pDC ) pWin->ReleaseDC( pDC );
	return bOK;	
}



/////////////////////////////////////////////////////////////////////////////
// Blit All or Part of Image to a DC
/////////////////////////////////////////////////////////////////////////////
//
// pDC		= the DC to draw to
// pnt		= The top/left point to draw to
// prc		= The section of the image to draw there
//
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::Blit( CDC* pDC, CPoint pnt, LPRECT prc ) {

	CDC			BmpDC;
	CBitmap*	pOldBmp = NULL;
	CBitmap*	pNewBmp = NULL;
	BOOL		b = FALSE;

	// Check ptrs
	if( (!pDC) || (!prc) || (!m_hbmp) )
		{ Dump( IER_PTR ); return FALSE; }

	// Create Bitmap DC
	if( !BmpDC.CreateCompatibleDC( pDC ) ) 
		{ Dump( IER_GET_DC ); return FALSE; }

	// Temporary object (MFC will delete during idle loop)
	pNewBmp = CBitmap::FromHandle( m_hbmp );

	// Select Bitmap into DC
	pOldBmp = (CBitmap*)(BmpDC.SelectObject( pNewBmp ));

	// Blit
	b = pDC->BitBlt( pnt.x, pnt.y, 
					 1 + (prc->right)  - (prc->left), 
					 1 + (prc->bottom) - (prc->top), 
					 &BmpDC, 
					 prc->left, prc->top, 
					 SRCCOPY );

	// Restore original bmp to DC
	BmpDC.SelectObject( pOldBmp );

	// Success?
	return b;
}



/////////////////////////////////////////////////////////////////////////////
// Create a new CPixMap object, based on the original
/////////////////////////////////////////////////////////////////////////////
//
// The BPP parameter determines the bit depth of the new image.
//
// The flags parameter allows you to rotate the dimensions by 90 degrees,
//  and determine whether or not to make the image be top-down. Note that by
//  default, the new image will be bottom-up, regardless of the orientation
//  of the original, unless you explicitly request top-down mode!
//
// NOTES: (1) The new image will be blank (all pixels zeroed)
//		  (2) If paletted, the new image will have a zeroed palette
//
/////////////////////////////////////////////////////////////////////////////

CPixMap* CPixMap::DupImage( int bpp, int flags ) {

	CPixMap*	p = NULL;	// New image
	int		w,h;		// Pointer to 
	int		temp;

	// Validate ptrs
	if( !IsValid() ) { Dump( IER_PTR ); return NULL; }

	// Get dimensions
	w = m_bmih->biWidth;
	h = ABS(m_bmih->biHeight);

	// Validate dimensions
	if( !IsValidDim( w, h ) ) { Dump( IER_DIM ); return NULL; }

	// Rotate Ninety Degrees?
	if( flags & IMGDUP_ROTATE ) {
	
		temp = w;
		w = h;
		h = temp;
	}

	// Make it be a top-down image?
	if( flags & IMGDUP_TOPDOWN ) h = (-h);
	
	// Create new image object
	p = new CPixMap;
	if( !p ) { Dump( IER_ALLOC ); return NULL; }
	
	// Try it out
	if( p->CreateDIB( bpp, w, h ) ) return p;

	// Ooops!
	delete p;

	// So sorry, pal!
	return NULL;
}



/////////////////////////////////////////////////////////////////////////////
// Fetch as 8.8.8 palette (RGBQUAD=8-bit)
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::GetPalette( RGBQUAD* ppal ) {

	RGBQUAD* p;

	if( (!IsValid()) ||	
		( !AfxIsValidAddress( ppal, sizeof(RGBQUAD)*256, TRUE ) ) )
		{ Dump( IER_PTR ); return FALSE; }

	// Validate Depth
	if( GetBPP() != 8 ) { Dump( IER_DIM ); return FALSE; }

	// Get pointer to palette
	p = GetPalAddr();

	// Copy Palette
	::memcpy( ppal, p, sizeof(RGBQUAD)*256 );

	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Store from 8.8.8 palette (RGBQUAD=8-bit)
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::SetPalette( RGBQUAD* ppal ) {

	RGBQUAD* p;

	if( (!m_bmih) ||	
		( !AfxIsValidAddress( ppal, sizeof(RGBQUAD)*256, FALSE ) ) )
		{ Dump( IER_PTR ); return FALSE; }

	// Validate Depth
	if( GetBPP() != 8 ) { Dump( IER_DIM ); return FALSE; }

	// Get pointer to palette
	p = GetPalAddr();

	// Copy Palette
	::memcpy( p, ppal, sizeof(RGBQUAD)*256 );

	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Determine the Destination Rect for Preview
/////////////////////////////////////////////////////////////////////////////
//
// If the image can fit fully into the client area, we return the image's
// bounding rectangle.
//
// Otherwise, we compute a rectangle which stretches the image to fit
// either horizontally or vertically, depending on which best suits the
// client area's dimensions, and displays the image to best advantage.
//
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::GetPreviewRect( CRect& rc, BOOL bNoMag ) {

	// Image's Rect and Dimensions
	CRect rcImg;
	CSize szImg;

	// Window's Rect and Dimensions
	CRect rcClient = rc;
	CSize szClient;
	
	int xdiff;
	int ydiff;

	float width;
	float height;
	float scale;
	
	// If no image, give full size & bail
	if( !IsValid() ) return FALSE;

	// Get Rect for Imahe
	GetBoundRect( &rcImg );

	// Make Sure Rect is Normalized
	rcImg.NormalizeRect();

	// Get Sizes
	szClient = rcClient.Size();
	szImg = rcImg.Size();

	// Will the image fit completely in the client area?
	if( (bNoMag) &&
		(szImg.cx <= szClient.cx) &&
		(szImg.cy <= szClient.cy) ) goto GotIt;

	// Which is a better fit?
	xdiff = szImg.cx - szClient.cx;
	ydiff = szImg.cy - szClient.cy;

	// Prep for scaling
	width  = (float)(szImg.cx);
	height = (float)(szImg.cy);
	rcImg.left  = 0;
	rcImg.top   = 0;

	// Scale to width
	if( xdiff > ydiff ) {

		scale = (float)(szClient.cx) / width;

		rcImg.right  = szClient.cx;
		rcImg.bottom = (int)(height * scale);

		goto GotIt;
	}

	// Scale to height
	scale = (float)(szClient.cy) / height;

	rcImg.right = (int)(width * scale);
	rcImg.bottom = szClient.cy;


// Finish Up
GotIt:

	// Offset Bound Rect by Dest Top/Left
	rcImg.OffsetRect( rcClient.left, rcClient.top );

	// Return Full Rect
	rc = rcImg;		
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Blit Image into a Preview (ThumbNail) Window
/////////////////////////////////////////////////////////////////////////////
//
// This function draws the image into a Preview Window.  It is stretched
// to fit the window in the larger dimension, with aspect ratio being
// preserved.
//
/////////////////////////////////////////////////////////////////////////////

BOOL CPixMap::Preview( CDC* pDC, LPRECT pRC, BOOL bNoMax ) {

	CRect rc;

	if( !pDC ) return FALSE;
	if( !pRC ) return FALSE;

	// Get a copy that we can play with
	rc = pRC;

	// Fit image into preview rect
	if( !GetPreviewRect( rc, bNoMax ) ) return FALSE;

	// Draw image
	return StretchBlit( pDC, &rc );
}
