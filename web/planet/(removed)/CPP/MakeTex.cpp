
/////////////////////////////////////////////////////////////////////////////
//
// MakeTex.cpp - Texture Builder
//  Dave Wellsted, Mar2001
//
// Based on Code by Simon Hern
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include <math.h>
#include "MakeTex.h"
#include "Random.h"
#include "Power.h"



/////////////////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////////////////

static void MakeTexPal( MAKETEXINFO* );
static void MakeTexRiff( void );
static void MakeTexSkin( double, double );
static void BlastTexSkin( int, int, int );



/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

// Fracture tables
static char   g_riff[64][64];		  // Radius and amplitude
static double g_prob[64];			    // Probability curve
static BOOL   g_bRiffOK = FALSE;	// One-shot flag

// Temporary (unscaled) texture
static short g_skin[128][256];



/////////////////////////////////////////////////////////////////////////////
// Main Entry Point
/////////////////////////////////////////////////////////////////////////////

BOOL MakeTex( MAKETEXINFO* pInfo ) {

	int x, y;			// Counters

	int idx1, idx2;	  // Row indices
    
  int max_amp;		  // Maximum and minimum amplitudes
  int min_amp;
  int num_amp;		  // Range of amplitudes
	int amp;			    // Texel amplitude

  double scale;		  // Scaling Factor

	BYTE  tel;			  // Texel color

	// Pointer to o/p texture bits
	BYTE* pBits;


	// Ptr Check
	if( !pInfo ) return FALSE;
	
	// Get ptr to o/p texture bits
	pBits = pInfo->bits;
	if( !pBits ) return FALSE;
	if( !AfxIsValidAddress( pBits, 256*256 ) ) return FALSE;

	// Build Palette
	MakeTexPal( pInfo );

  // Build the riff data (one-shot)
  MakeTexRiff();

  // Build Random Skin
	MakeTexSkin( pInfo->base, pInfo->expo );


  // Find skin amplitude limits
  max_amp = min_amp = 0;
  for( y = 0; y < 128; y++ ) {

    for( x = 0; x < 256; x++ ) {

      // Get texel amplitude
      amp = (int)(g_skin[y][x]);

      // Track min/max amplitudes
      if( amp < min_amp ) min_amp = amp;
      if( amp > max_amp ) max_amp = amp;
    }
  }
	
	// Get amplitude range & validate it
	num_amp = max_amp - min_amp;
	ASSERT( num_amp > 0 );


  //------------------------
  // Generate Final Texture
  //------------------------

  // Compute Scaling Factor
  scale = ((double)pInfo->num_c-1) / ((double)num_amp);

  for( y = 0; y < 128; y++ ) {

    // Byte indices for two adjacent rows
    idx1 = y*512;
    idx2 = idx1+256;

    for( x = 0; x < 256; x++ ) {

      // Relative amplitude of texel
      amp = ((int)(g_skin[y][x])) - min_amp;

      // Convert to palette index (1 to num_c+1)
      tel = ((BYTE)(((double)amp)*scale)) + 1;

      // Save to two adjacent rows
      pBits[idx1+x] = tel;
      pBits[idx2+x] = tel;
    }
  }

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Generate RIFF Data - One Shot
/////////////////////////////////////////////////////////////////////////////
//
// The riff is an array of sinusoidal sections, whose angles range from 0
// to pi/4 radians, and whose amplitudes range from 0 to 63, at a sinusoidal
// rate.
//
// This information is used by the BlastTexSkin function to produce round
// fractures with varying radii, such as a crater rim.
//
/////////////////////////////////////////////////////////////////////////////

static void MakeTexRiff( void ) {

    int x, y;

    double a,b,c;
    double tex_to_rad;
    double rad_to_tex;

	
	// This is a one-shot operation...
	if( g_bRiffOK ) return;
	g_bRiffOK = TRUE;

	// Compute conversion factors
	tex_to_rad = 128.0;
	_asm {

		fldpi
		fdiv	[tex_to_rad]
		fst		[tex_to_rad]		// pi/128
		fld1
		fxch	st(1)
		fdivp	st(1), st
		fstp	[rad_to_tex]		// 128/pi
	}

  // Do It!
  for( y = 0; y < 64; y++ ) {

    // b = y in radians
    b = ((double)y + 0.5) * tex_to_rad;

    // c = Sin of b
    c = sin( b );
    g_prob[y] = c*c;	// Save as probability (0-1)

    // a = Tangent of b
    a = tan( b );

    // Build riff row
    for( x = 0; x < 64; x++ ) {
      b = cos( ((double)x + 0.5) * tex_to_rad );
      c = atan( a * b ) * rad_to_tex;
      g_riff[y][x] = 64 - ((char)(floor( c + 0.5 )));
    }
  }
}



/////////////////////////////////////////////////////////////////////////////
// Generate SKIN Data
/////////////////////////////////////////////////////////////////////////////

static void MakeTexSkin( double base, double expo ) {

  // Half of the maximum random integer value
  #define HALFRND		0x3FFFFFFF

  int x, y;			// Counters
  int numfrac;		// Number of fractures
  int frac;			// Fracture counter
	int col;			// Column
  int riff;			// Riff
  int energy;			// Energy for fracture
  int disp;			// Displacement
  double inve;		// Inverse of exponent
  double dfrac;		// frac as a double


  // Sanity checks on fracture count
  if( (base < 1.0) ||
      (expo < 1.0) ||
      (pow( base, expo ) >= 65536.0) ) {

    // Use defaults
    base = 20.0;
    expo = 3.0;
  }
	
  // Number of fractures
  numfrac = (int) (pow( base, expo ));

  // Inverse of exponent
  inve = 1.0 / expo;

  // Clear displacement
  disp = 0;

  // Do It!
  for( frac = numfrac; frac >= 1; frac-- ) {

    // Select a random column (0-255)
    col = IRandom( 256 );

    // Select a random riff (0-63)
    riff = IRandom( 64 );

    // Balance riffs evenly,
    //  using our probability table
    if( g_prob[riff] < Random() ) 
      riff = 63 - riff;

    // Compute fracture energy
    // Notice that this is coded for an exponential
    //  decay which varies as a function of 'frac'
    dfrac = (double)frac;
    energy = (int)(base / ::PosPower( &dfrac, &inve ));

    // We only displace the northern half,
    //  then make up for it at the end
    if( IRandom()<HALFRND ) energy = -energy;
    if( IRandom()<HALFRND ) disp  -=  energy;

    // Blast-o-Rama
    BlastTexSkin( riff, energy, col );
  }

  // Adjust for displacement
  for( y=0; y<128; y++ )
    for( x=0; x<256; x++ )
      g_skin[y][x] += disp;
}



/////////////////////////////////////////////////////////////////////////////
// Blast Skin
/////////////////////////////////////////////////////////////////////////////
//
// This puts a blast-mark onto the skin.  Since this is an inherently time
// consuming process, we revert to good ole assembler code.
//
/////////////////////////////////////////////////////////////////////////////
//
// riff    - the riff to use, angles the slice
// energy  - the amount by which to displace the fractured surface
// col     - starting position in terms of longitude (0 to 255)
//
/////////////////////////////////////////////////////////////////////////////

static void BlastTexSkin( int riff, int energy, int col ) {

	//
	// Equivalent C code:
	// ==================
	//
	// int x, x1, x2;
	// int y, ymax;
	//
	// for( x=0; x<64; x++ ) {
	//
	//   x1 = (col+x) & 255;
	//   x2 = (col+255-x) & 255;
	//
	//	 ymax = g_riff[riff][x];
	//
	//   for( y=ymax; y>0; y-- ) {
	//
	//      g_skin[y][x1] += energy;
	//      g_skin[y][x2] += energy;
	//   }
	//
	//   g_skin[0][x1] += energy;
	//   g_skin[0][x2] += energy;
	//
	//   x1 = (col+128+x) & 255;
	//   x2 = (col+127-x) & 255;
	//
	//	 ymax = 127 - g_riff[riff][x];
	//
	//   for( y=ymax; y>0; y-- ) {
	//
	//      g_skin[y][x1] += energy;
	//      g_skin[y][x2] += energy;
	//   }
	//
	//   g_skin[0][x1] += energy;
	//   g_skin[0][x2] += energy;
	//
	// }
  //
  
	_asm {

		// Preserve the stack frame pointer,
		//  since we're gonna modify it later
		push	ebp

		// Load params
		mov     eax, [riff]
		mov     edx, [energy]
		mov     ecx, [col]

		// Keep params within range
		and		  eax, 0x3F
		and		  edx, 0xFFFF
		and		  ecx, 0xFF

		// EBP = riff * 64 (byte index for riff row)
		shl     eax, 6
		mov     ebp, eax

		push	  ebp				// Save riff index
		push	  ecx				// Save column

		// EDI = col
		mov     edi, ecx
		shl     edi, 1

		// ESI = (col-1) % 256
		dec     cl
		mov     esi, ecx
		shl     esi, 1

		// Prepare row and count
		xor     ebx, ebx
		mov     cl, 64

	
	// Fill in two quadrants of skin
	//  ESI,EDI - start of columns
	//  EBX     - row
	//  CL      - counter
	LP1:
		mov     bh, g_riff[ebp]     // Fetch next riff count
		inc     ebp                 // Bump riff ptr

		cmp     bh, 0				        // Zero?
		jz      LP4					        // Yep->skip

		dec     bh                  // Only one?
		jz      LP3					        // Yep->skip

		shl     bh, 1				        // EBX = row * 512

	// Advance skin texel (BH/2) times
	LP2:
		add     g_skin[edi+ebx], dx
		add     g_skin[esi+ebx], dx
		dec     bh
		dec     bh
		jnz     LP2

	// Advance skin texel once
	LP3:
		add     g_skin[edi], dx
		add     g_skin[esi], dx

	// Next columns
	// EDI,ESI stay in range 0 to 255
	//  (times 2 since we are using words)
	LP4:
		inc     edi
		inc     edi
		and     edi, 511

		dec     esi
		dec     esi
		and     esi, 511

		dec     cl
		jnz     LP1


	// - - - - - - - - - - - - - - - - -
	// Now, for the other two quadrants
	// - - - - - - - - - - - - - - - - -

		pop     ecx					// ECX = x_start
		pop     ebp					// EBX = rf_num

		// EDI = (x_start+128) % 256
		add     cl, 128
		mov     edi, ecx
		shl     edi, 1

		// ESI = (x_start+127) % 256
		dec     cl
		mov     esi, ecx
		shl     esi, 1

		xor     ebx, ebx
		mov     cl, 64		

	LP5:
		mov     bh, 127				// BH = 127 - riff
		sub     bh, g_riff[ebp]
		inc     ebp					  // Bump riff ptr

		cmp     bh, 0				  // Zero?
		jz      LP8					  // Yep -> Do nothing

		dec     bh					  // Only one?
		jz      LP7					  // Yep -> Do just one

		// EBX = EBX * 2 (word count)
		shl     bh, 1

	// Advance skin texel (BH/2) rows
	LP6:
		add     g_skin[edi+ebx], dx
		add     g_skin[esi+ebx], dx
		dec     bh
		dec     bh
		jnz     LP6

	// Advance skin texel once
	LP7:
		add     g_skin[edi], dx
		add     g_skin[esi], dx

	// Next columns
	LP8:
		inc     edi
		inc     edi
		and     edi, 511

		dec     esi
		dec     esi
		and     esi, 511

		dec     cl
		jnz     LP5

		pop	    ebp
	}
}



/////////////////////////////////////////////////////////////////////////////
// Build Texture Palette
/////////////////////////////////////////////////////////////////////////////
//
// Builds a palette for the texture.  The first color is always set to true
// black [0,0,0].  Colors 1 through num_c+1 are filled with an alpha blended
// range of colors, which are interpolated from rgb1 to rgb2.
// All unused colors are set to true black.
//
/////////////////////////////////////////////////////////////////////////////

void MakeTexPal( MAKETEXINFO* pInfo ) {

	int num, n;
	double nscale, scale1, scale2;
	double r1, g1, b1;
	double r2, g2, b2;
	BYTE r, g, b;
	RGBQUAD* pal;

	ASSERT( pInfo );
	if( !pInfo ) return;

	pal = pInfo->pal;
	num = pInfo->num_c;
	
	// Fix invalid color range
	if( (num < 2) || (num > 255) ) {
	
		num = 255;			// Use all colors
		pInfo->num_c = num;	// Tell caller about it
	}
	
	// Clear the palette
	memset( pal, 0, sizeof( RGBQUAD ) * 256 );

	// Color Elements as doubles
	r1 = (double)(pInfo->rgb1.rgbRed);
	r2 = (double)(pInfo->rgb2.rgbRed);
	g1 = (double)(pInfo->rgb1.rgbGreen);
	g2 = (double)(pInfo->rgb2.rgbGreen);
	b1 = (double)(pInfo->rgb1.rgbBlue);
	b2 = (double)(pInfo->rgb2.rgbBlue);

	// Scale factor for color index
	nscale = 1.0 / ((double)num);

	// Alpha Blend	
	for( n=0; n<num; n++ ) {

		// Scaling Factors
		scale2 = ((double)n) * nscale;
		scale1 = 1.0 - scale2;

		// Blend 'em
		r = (BYTE)(r1*scale1 + r2*scale2);
		g = (BYTE)(g1*scale1 + g2*scale2);
		b = (BYTE)(b1*scale1 + b2*scale2);
		
		// Save result
		pal[n+1].rgbRed   = r;
		pal[n+1].rgbGreen = g;
		pal[n+1].rgbBlue  = b;
	}
}

