
/////////////////////////////////////////////////////////////////////////////
//
// MakeTex.h - Texture Builder
//  Dave Wellsted, Mar2001
//
// Based on Code by Simon Hern
//
/////////////////////////////////////////////////////////////////////////////

#ifndef MAKETEX_DEFINED
#define MAKETEX_DEFINED


// Info structure for Texture Builder
typedef struct tagMAKETEXINFO {

	double		base;		  // Fracture Base
	double		expo;		  // Fracture Exponent
	BYTE*		  bits;		  // Ptr to bitmap bits (256x256,8-bpp)

	int			  num_c;		// Number of colors to use
	RGBQUAD		rgb1;		  // Start Color
	RGBQUAD		rgb2;		  // End Color
	RGBQUAD		pal[256];	// Palette

} MAKETEXINFO;


// The Main Dude-o-rama
BOOL MakeTex( MAKETEXINFO* );


#endif  // !MAKETEX_DEFINED

