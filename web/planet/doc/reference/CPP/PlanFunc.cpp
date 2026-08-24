
/////////////////////////////////////////////////////////////////////////////
//
// PlanFunc.cpp - Functions for Manipulating Planets
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include <math.h>
#include <float.h>
#include "PlanFunc.h"
#include "Mtx.h"



/////////////////////////////////////////////////////////////////////////////
// Check for Valid Size
/////////////////////////////////////////////////////////////////////////////

static BOOL IsSizeOK( DWORD dw ) {

	switch( dw ) {
	case 64:
	case 128:
	case 256:
		return TRUE;
	}

	return FALSE;
}



/////////////////////////////////////////////////////////////////////////////
// Normalize Angles
/////////////////////////////////////////////////////////////////////////////

static double NormRad( double a ) {

	double pi;		// PI
	double np;		// -PI
	double two_pi;	// 2*PI

	// Deal with bogus stuff
	if( _isnan( a ) || !_finite( a ) ) {
	
		a = 0.0;
		return a;
	}

	// 2*PI
	_asm {

		fldpi
		fst		[pi]
		fchs
		fst		[np]
		fchs
		fadd	st(0), st(0)
		fstp	[two_pi]
	}

	// Do it
	while( a >  pi ) a -= two_pi;
	while( a <= np ) a += two_pi;

	return a;
}



/////////////////////////////////////////////////////////////////////////////
// Load Planet from Open Archive
/////////////////////////////////////////////////////////////////////////////
//
// Pass a pointer to a file opened for read access.
//
// Returns: NULL for failure, or PLANET* for success.
//
// IMPORTANT!!!  Use DestroyPlanet() to get rid of the planet when it's no
//                longer needed.  This ensures that buffers are deallocated
//                correctly.  Some buffers use "delete" and some "free"...
//
/////////////////////////////////////////////////////////////////////////////

#define MYSEEK(where) \
	((file->Seek(where,sk))==((long)(where)))

PLANET* LoadPlanet( CFile* file ) {

	PLANET* p  = NULL;
	BYTE* pTex = NULL;
	BYTE* pImg = NULL;
	BYTE* pDat = NULL;
	UINT sk = CFile::begin;

	DWORD dwImgOfs;
	DWORD dwTexOfs;
	DWORD dwDatOfs;
	DWORD tex_bytes;

	// Pointer check
	if( !file ) return NULL;

	// Allocate new planet
	p = new PLANET;
	if( !p ) return NULL;

	// Read in the header
	if( file->Read( p, sizeof( PLANET ) ) != sizeof( PLANET ) )
		goto Fail;

	// Check Magic Initials
	if( strncmp( p->magic, "p3d", 4 ) != 0 ) goto Fail;

	// Validate Sizes
	if( !(IsSizeOK( p->img_size ) &&
		  IsSizeOK( p->tex_size )) ) goto Fail;

	// Get Offsets
	dwImgOfs = p->img_ofs;
	dwTexOfs = p->tex_ofs;
	dwDatOfs = p->dat_ofs; 

	// Clear Pointers (just in case)
	p->img_ptr = NULL;
	p->tex_ptr = NULL;
	p->dat_ptr = NULL; 

	// Allocate Buffers
	tex_bytes = (p->tex_size) * (p->tex_size);
	pTex = new BYTE[tex_bytes];
	if( !pTex ) goto Fail;
	pImg = new BYTE[p->img_bytes];
	if( !pImg ) goto Fail;
		
	// If user data, alloc it, too
	if( p->dat_bytes ) {
	
		pDat = (BYTE*)(malloc(p->dat_bytes));
		if( !pDat ) goto Fail;
	}

	// Load image data
	if( !MYSEEK(dwImgOfs) ) goto Fail;
	if( file->Read( pImg, p->img_bytes ) != (p->img_bytes) )
		goto Fail;

	// Load texture data
	if( !MYSEEK(dwTexOfs) ) goto Fail;
	if( file->Read( pTex, tex_bytes ) != tex_bytes )
		goto Fail;

	// Load user data (if any)
	if( pDat ) {

		if( !MYSEEK(dwDatOfs) ) goto Fail;
		if( file->Read( pDat, p->dat_bytes ) != (p->dat_bytes) )
			goto Fail;
	}

	// Save buffer pointers
	p->img_ptr = pImg;
	p->tex_ptr = pTex;
	p->dat_ptr = pDat;

	// Cool!
	return p;


// Oops!
Fail:
	if( pImg ) delete[] pImg;
	if( pTex ) delete[] pTex;
	if( pDat ) free( pDat );
	if( p )    delete p;
	return NULL;
}



/////////////////////////////////////////////////////////////////////////////
// Save Planet to Open Archive
/////////////////////////////////////////////////////////////////////////////
//
// Pass this function a pointer to a file opened for write access, and a
// pointer to a valid PLANET object.
//
// Note that the planet MUST be already compiled.
//
// Also, the file should be truncated, or an append will occur!
//
/////////////////////////////////////////////////////////////////////////////

BOOL SavePlanet( CFile* file, PLANET* p ) {

	BYTE* pImg = NULL;
	BYTE* pTex = NULL;
	BYTE* pDat = NULL;
	DWORD tex_bytes;

	// Pointer checks
	if( !file ) return FALSE;
	if( !p )    return FALSE;

	// Get pointers (save for later);
	pImg = p->img_ptr;
	pTex = p->tex_ptr;
	pDat = p->dat_ptr;

	// Check the important ptrs
	if( (!pImg) || (!pTex) ) return FALSE;

	// Check sizes
	if( !(IsSizeOK(p->img_size)&&
		  IsSizeOK(p->tex_size)&&
		  (p->img_bytes>0)) ) return FALSE;
	if( pDat && (p->dat_bytes==0) ) return FALSE;
	tex_bytes = (p->tex_size) * (p->tex_size);
	
	// Compute offsets
	p->img_ofs = sizeof( PLANET );
	p->tex_ofs = (p->img_ofs) + (p->img_bytes);
	if( pDat ) p->dat_ofs = (p->tex_ofs) + tex_bytes;
	else	   p->dat_ofs = 0;	

	// Write header
	TRY {

		file->Write( p, sizeof( PLANET ) );
	}
	CATCH( CFileException, e ) {

		goto Fail;
	} END_CATCH
	
	// Write Image Map
	TRY {
		
		file->Write( pImg, p->img_bytes );
	}
	CATCH( CFileException, e ) {

		goto Fail;
	} END_CATCH

	// Write Texture Map
	TRY {

		file->Write( pTex, tex_bytes );
	}
	CATCH( CFileException, e ) {

		goto Fail;
	} END_CATCH
	
	// Write user data (if any)
	if( pDat ) {

		TRY {
					
			file->Write( pDat, p->dat_bytes );
		}
		CATCH( CFileException, e ) {

			goto Fail;
		} END_CATCH
	}

	// Restore pointers
	p->img_ptr = pImg;
	p->tex_ptr = pTex;
	p->dat_ptr = pDat;

	// Done!
	return TRUE;


// Oops!
Fail:		
	
	// Restore pointers
	p->img_ptr = pImg;
	p->tex_ptr = pTex;
	p->dat_ptr = pDat;

	return FALSE;
}



/////////////////////////////////////////////////////////////////////////////
// Deallocate a Planet Object
/////////////////////////////////////////////////////////////////////////////

void DestroyPlanet( PLANET* p ) {

	if( !p ) return;

	if( p->dat_ptr ) free( p->dat_ptr );
	if( p->img_ptr ) delete[] (p->img_ptr);
	if( p->tex_ptr ) delete[] (p->tex_ptr);

	delete p;
}



/////////////////////////////////////////////////////////////////////////////
// Allocate a Planet Object
/////////////////////////////////////////////////////////////////////////////

PLANET* CreatePlanet( DWORD img_size ) {

	PLANET* p;

	// Validate Sizes
	if( !IsSizeOK( img_size ) ) return NULL;

	// Create new planet
	p = new PLANET;
	if( !p ) return NULL;

	// Zero-fill
	memset( p, 0, sizeof( PLANET ) );

	// Put in magic initials
	strcpy( p->magic, "p3d" );

	// Save size
	p->img_size = img_size;

	// Cool!
	return p;
}



/////////////////////////////////////////////////////////////////////////////
// Set Planet Data
/////////////////////////////////////////////////////////////////////////////

BOOL SetPlanetData( PLANET* p, BYTE* pDat, DWORD bytes ) {

	// Pointer Check
	if( !p ) return FALSE;

	// Free old data (if any)
	if( p->dat_ptr ) free( p->dat_ptr );
	p->dat_bytes = 0;

	// Allocate new data
	p->dat_ptr = (BYTE*)(malloc( (size_t) bytes ));
	if( !p->dat_ptr ) return FALSE;
	p->dat_bytes = bytes;

	// Copy in the data
	memcpy( p->dat_ptr, pDat, bytes );

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Set New Planet Texture
/////////////////////////////////////////////////////////////////////////////

BOOL SetPlanetTexture( PLANET* p, BYTE* pTex, DWORD size ) {

	int len;

	if( !p )	return FALSE;
	if( !pTex ) return FALSE;
	if( !IsSizeOK( size ) ) return FALSE;

	// Total bytes
	len = size*size;

	// If we already have a texture buffer
	if( p->tex_ptr ) {

		// If the sizes don't match
		if( size != p->tex_size ) {

			// Destroy the old, create the new
			delete[] (p->tex_ptr);
			p->tex_size = 0;

			// Remove old image, too (force recompile)
			if( p->img_ptr ) delete[] (p->img_ptr);
			p->img_ptr   = NULL;
			p->img_bytes = NULL;			

			// Create the new
			p->tex_ptr = new BYTE[len];

			if( !p->tex_ptr ) return FALSE;
			p->tex_size = size;
		}
	}

	// Create a new texture buffer
	else {

		p->tex_ptr = new BYTE[len];
		if( !p->tex_ptr ) return FALSE;
		p->tex_size = size;
	}

	// Copy in texel data
	memcpy( p->tex_ptr, pTex, len );

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Set New Planet Palette
/////////////////////////////////////////////////////////////////////////////

BOOL SetPlanetColors( PLANET* p, RGBQUAD* pPal, DWORD num ) {

	// Check pointer
	if( !p ) return FALSE;

	// No palette specified?
	if( !pPal )	  num = 0;
	if( num < 1 ) num = 0;
	
	// Copy in new palette
	if( pPal && num )	
		memcpy( p->pal, pPal, num * sizeof( RGBQUAD ) );

	// Keep new number
	p->numpal = num;

	// Clear unused colors
	if( num < 256 ) {

		memset( &(p->pal[num]), 0, 
				(256-num) * sizeof( RGBQUAD ) );
	}

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Modify Planet Size
/////////////////////////////////////////////////////////////////////////////

BOOL SetPlanetSize( PLANET* p, DWORD size ) {

	// Check ptr and new size
	if( !p ) return FALSE;
	if( !IsSizeOK( size ) ) return FALSE;

	// If size is already OK, cool!
	if( size == (p->img_size) ) return TRUE;

	// Delete buffer (forces a recompile)
	if( p->img_ptr ) delete[] (p->img_ptr);
	p->img_ptr = NULL;
	p->img_bytes = 0;
	p->img_size = size;

	// Cool!
	return TRUE;
}


/////////////////////////////////////////////////////////////////////////////
// Modify Planet Angles
/////////////////////////////////////////////////////////////////////////////

BOOL SetPlanetAngles( PLANET* p, double x, double y, double z ) {

	// Check ptr and new size
	if( !p ) return FALSE;

	// Normalize the angles
	x = NormRad( x );
	y = NormRad( y );
	z = NormRad( z );

	// If no angles changed, we're done
	if((x == p->xrot) &&
		 (y == p->yrot) &&
		 (z == p->zrot)) return TRUE;

	// Remove compiled data
	if( p->img_ptr ) delete[] (p->img_ptr);
	p->img_ptr = NULL;
	p->img_bytes = 0;

	// Set angles
	p->xrot = x;
	p->yrot = y;
	p->zrot = z;

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Compile Planet
/////////////////////////////////////////////////////////////////////////////
//
// This gets the planet ready for rendering.  This is where we build the
// image map, which is an array of commands which describe the scanlines,
// and the texture (x,y) coords for each pixel in each scanline.
//
/////////////////////////////////////////////////////////////////////////////

#define NOT_USED 0xFFFF

BOOL CompilePlanet( PLANET* p ) {

	DWORD words;
	int x, y;
	int xt, yt;
	int twid, iwid;
	int tmaskx, tmasky;
	int idx;
	int cell;
	double xi, yi, zi;
	double xo, yo, zo;
	double ctr;
	double k;
	double r;
	double r_sqr;
	double th, ph;
	double tex_w;
	double rad_to_tex;
	BYTE* pTex;
	WORD* pImg;
	MTX mtx;

	// Checks
	if( !p ) return FALSE;
	if( !p->tex_ptr ) return FALSE;
	if( !IsSizeOK( p->tex_size ) ) return FALSE;

	// Remove old data (if any)
	if( p->img_ptr ) {
	
		delete[] (p->img_ptr);
		p->img_ptr = NULL;
		p->img_bytes = 0;
	}	

	// Allocate new buffer
	iwid = p->img_size;
	if( !IsSizeOK( iwid ) ) return FALSE;
	words = (DWORD)(iwid * iwid);
	pImg = new WORD[ words ];
	if( !pImg ) return FALSE;
	p->img_ptr = (BYTE*)(pImg);
	p->img_bytes = words * 2;

	// Rotation Matrix
	MakeRotMtx( &mtx, 
				p->xrot, 
				p->yrot, 
				p->zrot );

	// Texture size
	twid   = p->tex_size;			// Width and Height (same)
	tmaskx = twid-1;				// Bitmask for dimensions
	tmasky = tmaskx-1;
	tex_w  = (double)(twid);		// Size as a Double

	// Bitmap Centering
	ctr = ((double)(iwid))/2.0;		// Center point

	// Radius and Radius Squared (for sphere)
	r     = ctr - 3.5;
	r_sqr = r*r;

	// Conversion factor (radians to texel coords)
	_asm {

		fld		[tex_w]			    // Texture Size
		fldpi					        // PI
		fadd	st, st			    // 2*PI
		fdivp	st(1), st		    // Size/(2*PI)
		fstp	[rad_to_tex]	  // Conversion factor
	}

	// Texture Pointer
	pTex = p->tex_ptr;

	// For each bitmap row
	for( y=0; y<iwid; y++ ) {

		// Center the row
		zi = -((double)(y+.5) - ctr);

		// For each bitmap column
		for( x=0; x<iwid; x++ ) {

			// Compute cell index
			cell = y*iwid+x;

			// Center the column
			xi = (double)(x+.5) - ctr;

			// Determine squared distance to centerpoint
			k = xi*xi + zi*zi;

			// If distance is within sphere radius...
			if( k <= r_sqr ) {

				// Compute y-coord (depth)
				yi = sqrt( r_sqr - k );

				// Working copy of 3D location on sphere
				xo = xi;
				yo = yi;
				zo = zi;

				// Rotate point
				MulVecMtx( &mtx, &xo, &yo, &zo );				

				// Compute new angles
				th = -atan2( yo, xo );
				ph = 2.0 * acos( zo / r );

				// Convert radians to texture coords
				xt = (int)(floor( th*rad_to_tex + .5 ));
				yt = (int)(floor( ph*rad_to_tex + .5 ));

				// Wrap texture coords
				xt &= tmaskx;
				yt &= tmasky;
				
				// Never use the bottommost row
				//
				// This allows the NOT_USED flag to be unique,
				//  and provides for skin "spin" for animation.
				// 
				// if( yt == tmask ) yt--;				

				// Compute index
				idx = yt*twid+xt;

				// Pixel = texel color
				pImg[cell] = (WORD)(idx);
			}

			// Pixel = background color
			else pImg[cell] = NOT_USED;
		}
	}

	// Cool!
	return TRUE;
}



/////////////////////////////////////////////////////////////////////////////
// Render Planet
/////////////////////////////////////////////////////////////////////////////
//
// Renders the planet to the pixel buffer for a 256-color bitmap.
// Essentially, this reads and interprets the image map, using the info
// there to determine scanline locations and texture map addresses for each
// pixel in the scanline.
//
// Note that the pixel buffer's dimensions MUST exactly match those of the
// planet, or rendering will malfunction.
//
// This could be optimized better in any of a number of ways... but heck,
// it's fast enough for now.
//
/////////////////////////////////////////////////////////////////////////////
//
// Entry: p	  - Planet to render
//        bfr - Pixel buffer
//
/////////////////////////////////////////////////////////////////////////////

BOOL RenderPlanet( PLANET* p, BYTE* bfr ) {

	int iwid;
	int twid;
	int bytes;
	int spin;
	WORD* pDat;
	BYTE* pTex;
	BYTE* pBmp;

	// Gotta have a planet...
	if( !p )   return FALSE;

	// Ouput buffer
	pBmp = bfr;
	if( !pBmp ) return FALSE;

	// Image Buffer
	pDat = (WORD*)(p->img_ptr);
	if( !pDat ) return FALSE;

	// Texture Buffer
	pTex = p->tex_ptr;
	if( !pTex ) return FALSE;

	// Get Sizes
	iwid = p->img_size;
	twid = p->tex_size;

	// Check Sizes
	if( !IsSizeOK( iwid ) ) return FALSE;
	if( !IsSizeOK( twid ) ) return FALSE;

	// Byte counter
	bytes = iwid*iwid;

	// Deal with skin "spin"
	spin = p->spin & (twid-1);
	pTex += spin;

	// Do It!
	_asm {

		push	esi				// Preserve Regs
		push	edi
		push	ebx

		mov		edx, [pTex]		// Texel buffer
		mov		esi, [pDat]		// Texel offsets (cells)
		mov		edi, [pBmp]		// Bitmap buffer		

		mov		ecx, [bytes]	// Pixel/cell count

		cld

		// The upper 16 bits of EBX must remain zero
		//  for the entire routine !!!
		xor		ebx, ebx


	// This first loop is used so long as there are
	//  texels to be drawn.  We use two loop to help
	//  with branch prediction.
	ALIGN 4
	lp1:
		mov		bx, [esi]		  // Fetch texel offset
		add		esi, 2			  // Next texel offset
		cmp		ebx, NOT_USED	// Unused cell?
		jz		blank			    // Start second loop

	
	// Draw Texel
	ALIGN 4
	used:		
		mov		al, [ebx+edx]	// Read Texel
		stosb					      // Write Pixel
		
		dec		ecx				    // Bump column count
		jnz		lp1				    // Continue first loop

		jmp		done			    // Bye!

	
	// This second loop is used so long as unused cells
	//  are being drawn.  We use two loops to help with
	//  branch prediction.
	ALIGN 4
	lp2:
		mov		bx, [esi]		    // Fetch texel offset
		add		esi, 2			    // Next texel offset
		cmp		ebx, NOT_USED	  // Used cell?
		jnz		used			      // Start first loop

	
	// Draw Background Color
	ALIGN 4
	blank:
	
		xor		al,al			      // Replace these two with a
		stosb					        //  simple INC EDI for sprite

		dec		ecx				      // Bump column count
		jnz		lp2				      // Continue second loop


	// Bye!
	ALIGN 4
	done:		
		pop		ebx				// Restore Regs
		pop		edi
		pop		esi
	}

	// Cool!
	return TRUE;
}

/*
BOOL OldRenderPlanet( PLANET* p, BYTE* bfr, POINT& pt, SIZE& sz ) {

	int x, y;
	int xt, yt;
	int twid;
	int tmask;
	int chunk;
	double xi, yi, zi;
	double xo, yo, zo;
	double x_ctr, y_ctr;
	double k;
	double r;
	double r_sqr;
	double th, ph;
	double tex_w;
	double rad_to_tex;
	BYTE* pRow;
	BYTE* pCol;
	BYTE* pTex;
	MTX mtx;

	// Pointer Checks
	if( (!p) || (!bfr) ) return FALSE;

	// Rotation Matrix
	MakeRotMtx( &mtx, 
				p->xrot, 
				p->yrot, 
				p->zrot );

	// Texture size
	twid = p->tex_size;			// Width and Height (same)
	tmask = twid-1;				// Bitmask for dimensions
	tex_w = (double)(twid);		// Size as a Double

	// Bitmap Centering
	x_ctr = ((double)(sz.cx))/2.0;		// Center point
	y_ctr = ((double)(sz.cy))/2.0;

	// Radius and Radius Squared (for sphere)
	r     = ((x_ctr < y_ctr) ? x_ctr : y_ctr) - 3.5;
	r_sqr = r*r;

	// Conversion factor (radians to texel coords)
	_asm {

		fld		[tex_w]			// Texture Size
		fldpi					// PI
		fadd	st, st			// 2*PI
		fdivp	st(1), st		// Size/(2*PI)
		fstp	[rad_to_tex]	// Conversion factor
	}

	// Texture Pointer
	pTex = p->tex_ptr;

	// Bitmap scanline ptr & bytes per scanline
	pRow = bfr;
	chunk = sz.cx;

	// For each bitmap row
	for( y=0; y<sz.cy; y++ ) {

		// Point to first pixel
		pCol = pRow;

		// Center the row
		zi = (double)(y+.5) - y_ctr;

		// For each bitmap column
		for( x=0; x<sz.cx; x++ ) {

			// Center the column
			xi = (double)(x+.5) - x_ctr;

			// Determine squared distance to centerpoint
			k = xi*xi + zi*zi;

			// If distance is within sphere radius...
			if( k <= r_sqr ) {

				// Compute y-coord (depth)
				yi = sqrt( r_sqr - k );

				// Working copy of 3D location on sphere
				xo = xi;
				yo = yi;
				zo = zi;

				// Rotate point
				MulVecMtx( &mtx, &xo, &yo, &zo );				

				// Compute new angles
				th = -atan2( yo, xo );
				ph = 2.0 * acos( zo / r );

				// Convert radians to texture coords
				xt = (int)(floor( th*rad_to_tex + .5 ));
				yt = (int)(floor( ph*rad_to_tex + .5 ));

				// Wrap texture coords
				xt &= tmask;
				yt &= tmask;
				
				// Pixel = texel color
				*pCol++ = pTex[yt*twid+xt];
			}

			// Pixel = background color
			else *pCol++ = 0;
		}

		// Next bitmap row, please!
		pRow += chunk;
	}

	// Cool!
	return TRUE;
}
*/


/////////////////////////////////////////////////////////////////////////////
// Render Texture
/////////////////////////////////////////////////////////////////////////////
//
// Renders the texture to the pixel buffer for a 256-color bitmap.
//
/////////////////////////////////////////////////////////////////////////////
//
// Entry: tex - Texture to render
//        bfr - Pixel buffer
//        tsz  - Size of texture
//        bsz  - Size of bitmap
//
/////////////////////////////////////////////////////////////////////////////

BOOL RenderTexture( BYTE* tex, BYTE* bfr, SIZE& tsz, SIZE& bsz ) {

	int x, y;
	int wt, ht;
	int wb, hb;
	int x_max, y_max;
	BYTE* pTexRow;
	BYTE* pBfrRow;
	BYTE* pTexCol;
	BYTE* pBfrCol;

	// Pointer Checks
	if( (!tex) || (!bfr) ) return FALSE;

	// Bitmap dimensions
	wb = bsz.cx;
	hb = bsz.cy;

	// Texture Dimensions
	wt = tsz.cx;
	ht = tsz.cy; 

	// How far to draw in each direction
	x_max = (wt<wb) ? wt : wb;
	y_max = (ht<hb) ? ht : hb;

	// Prep pointers
	pTexRow = tex;
	pBfrRow = bfr;

	// Do It!
	for( y=0; y<y_max; y++ ) {

		// Pointer to src/dest columns
		pTexCol = pTexRow;
		pBfrCol = pBfrRow;

		// Draw row
		for( x=0; x<x_max; x++ )
			*pBfrCol++ = *pTexCol++;

		// Bump row ptrs
		pTexRow += wt;
		pBfrRow += wb;
	}

	// Cool!
	return TRUE;
}

