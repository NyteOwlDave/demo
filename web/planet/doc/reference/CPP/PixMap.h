
/////////////////////////////////////////////////////////////////////////////
//
// PixMap.h - Wrapper for Windows DIBs
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#ifndef CPIXMAP_DEFINED
#define CPIXMAP_DEFINED

// Short and sweet!
typedef BITMAPINFO		 BMPI;
typedef BITMAPINFOHEADER BMPIH;
typedef BITMAPFILEHEADER BMPFH;
typedef BITMAPCOREHEADER BMPCH;

// Flags for DupImage()
#define IMGDUP_ROTATE	0x01
#define IMGDUP_TOPDOWN	0x02



/////////////////////////////////////////////////////////////////////////////
// Class Definition
/////////////////////////////////////////////////////////////////////////////

class CPixMap  {

public:

	HBITMAP		m_hbmp;		// DIB Handle
	BMPIH*		m_bmih;		// DIB Header
	LPBYTE		m_bits;		// DIB Bit Buffer

	CString		m_sPath;	// Latest path
	CString		m_sExt;		// Latest Extension

public:

	CPixMap();
	~CPixMap();

	// Validate Pointers & Such
	BOOL	IsValid();

	// Validate Dimensions
	BOOL	IsValidDim( int, int );

	// Error messages
	void	Dump( int );

	// Allocate memory
	void*	Alloc( DWORD );

	// Get Bounding Rect for Image
	void	GetBoundRect( LPRECT );

	// Bit Depth
	int		GetBPP();

	// Size (w, h)
	BOOL	GetSize( int&, int& );

	// Dimensions (bpp, w, h)
	BOOL	GetDim( int&, int&, int& );

	// Get # of bytes per scanline (DWORD aligned)
	DWORD	GetScanBytes( int, int );

	// Number of bytes required for palette
	DWORD	GetPalBytes( int, int );

	// Number of bytes required for pixel buffer
	DWORD	GetPixBytes( int, int, int );

	// Get Rectangle for Preview Drawing
	BOOL	GetPreviewRect( CRect&, BOOL bNoMax=TRUE );
	
	// Load a Windows BMP file
	BOOL	LoadWinBmp( LPCSTR );
	
	// Save as Bitmap
	BOOL	SaveWinBmp( LPCSTR );

	// Create a 256-color DIB
	BOOL	CreateDIB256( int, int, RGBQUAD* );
	
	// Create a DIB
	BOOL	CreateDIB( int, int, int );

	// Allocate and init an INFO structure
	BMPIH*	CreateINFO( int, int, int, DWORD* );

	// Allocate a scanline buffer
	BYTE*	CreateSCAN( int, int, int, DWORD* );
	
	// Create the GDI object for a DIB
	HBITMAP CreateGDIObject( BMPIH*, LPBYTE* );
	
	// Destroy buffers and GDI handle
	void	DestroyDIB();
	
	// Zero pointers
	void	ZeroDIB();
	
	// Blit All or Part of Image to a Window
	BOOL	Blit( CWnd*, CPoint, LPRECT );
	BOOL	Blit( CDC*, CPoint, LPRECT );
	BOOL	StretchBlit( CDC*, LPRECT );
	BOOL	Stretch( CRect&, CPixMap*, CRect& );
	BOOL	Preview( CDC*, LPRECT, BOOL bNoMax=TRUE );

	// Create an EMPTY duplicate, with ANY bpp
	CPixMap*	DupImage( int, int );

	// Pointer to palette
	RGBQUAD*	GetPalAddr();

	// Access to 8.8.8 palette (8-bit)
	BOOL	GetPalette( RGBQUAD* );
	BOOL	SetPalette( RGBQUAD* );

	// Obtaining and releasing a Screen DC
	HWND	GetMainHwnd();
	HDC		GetMainDC();
	void	FreeMainDC( HDC );
};



/////////////////////////////////////////////////////////////////////////////
// Determine if DIB is valid
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
BOOL CPixMap::IsValid() {

	if( !m_hbmp ) return FALSE;
	if( !m_bmih ) return FALSE;
	if( !m_bits ) return FALSE;

	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Determine if DIB is valid
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
RGBQUAD* CPixMap::GetPalAddr() {

	BMPI* pinfo = (BMPI*)(m_bmih);
	if( !pinfo ) return NULL;
	if( (m_bmih->biBitCount) > 8 ) return NULL;
	return pinfo->bmiColors;
}



/////////////////////////////////////////////////////////////////////////////
// Determine number of bytes in a single scanline (DWORD aligned)
/////////////////////////////////////////////////////////////////////////////
//
// bpp		= bit depth
// wid		= scanline's width, in pixels
// 
// Note: returns zero for invalid BPP
//
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
DWORD CPixMap::GetScanBytes( int bpp, int wid ) {

	// Get width of scanline, in pixels
	DWORD w = (DWORD)(ABS( wid ));

	// Convert pixels/scanline to bytes/scanline (unpadded)
	switch( bpp ) {

		// Eight pixels per byte (padded to next byte)
		case 1:		w = (w>>3) + ((w&7)?1:0);
					break;

		// Two pixels per byte	(padded to next byte)
		case 4:		w = (w>>1) + (w&1);
					break;
		
		// Even-Steven, eh?
		case 8:		break;
		
		// Two bytes per pixel
		case 16:	w <<= 1;		break;
		
		// Three bytes per pixel
		case 24:	w *= 3;			break;
		
		// Four bytes per pixel
		case 32:	w <<= 2;		break;
		
		// Unsupported type
		default:	return 0;
	}

	// Align to a DWORD boundary (pad)
	return (w+3) & (~3);
}



/////////////////////////////////////////////////////////////////////////////
// Determine the number of bytes req'd for palette
/////////////////////////////////////////////////////////////////////////////
//
// bpp		= the bit depth
// used		= the biClrUsed member of BITMAPINFOHEADER
//
// Note:     if used=0, then maximum possible number of palette entries 
//            for the bit-depth is assumed.
//
// Returns:  0 for non-paletted or invalid bpp
//			
//
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
DWORD CPixMap::GetPalBytes( int bpp, int used ) {

	int max;

	// Can't have a negative usage
	used = MAX( 0, used );	

	// Which BPP level?
	switch( bpp ) {
	
	// Paletted types...
	case 1:
	case 4:
	case 8:
	
		// Compute maximum possible
		max = (1<<bpp);
	
		// If no usage specified, default to max
		if( !used )		used = max;
		
		// Else clamp usage to max
		else			used = MIN( used, max );
		
		// Otherwise, return max allowed for bpp
		return (DWORD)(used * sizeof( RGBQUAD ));
	}

	// Not paletted
	return 0;
}



/////////////////////////////////////////////////////////////////////////////
// Number of bytes required for pixel buffer
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
DWORD CPixMap::GetPixBytes( int bpp, int wid, int hgt ) {

	return GetScanBytes( bpp, wid ) * ABS( hgt );	
}



/////////////////////////////////////////////////////////////////////////////
// Bit Depth
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
int CPixMap::GetBPP() {

	int bpp=0;
	if( m_bmih ) bpp = m_bmih->biBitCount;
	return bpp;
}



/////////////////////////////////////////////////////////////////////////////
// Size
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
BOOL CPixMap::GetSize( int& w, int& h ) {

	w=0; h=0;
	if( !m_bmih ) return FALSE;
	w = m_bmih->biWidth;
	h = m_bmih->biHeight;
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Dimensions
/////////////////////////////////////////////////////////////////////////////

_INLINE_FUNC_
BOOL CPixMap::GetDim( int& bpp, int& w, int& h ) {

	bpp=0; w=0; h=0;
	if( !m_bmih ) return FALSE;
	bpp = m_bmih->biBitCount;
	w   = m_bmih->biWidth;
	h   = m_bmih->biHeight;
	return TRUE;
}


#endif  // !CPIXMAP_DEFINED

