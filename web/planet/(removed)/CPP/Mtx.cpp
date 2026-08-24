
/////////////////////////////////////////////////////////////////////////////
//
// Mtx.cpp - Matrix Math
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include <math.h>
#include <float.h>
#include "mtx.h"



/////////////////////////////////////////////////////////////////////////////
// Multiply a Vector by a Matrix
/////////////////////////////////////////////////////////////////////////////

// Indices into MTX structure
#define D_00	0
#define D_01	8
#define D_02	16
#define D_10	24
#define D_11	32
#define D_12	40
#define D_20	48
#define D_21	56
#define D_22	64

void MulVecMtx(  MTX* mtx,
				 double* x, 
				 double* y, 
				 double* z ) {

	_asm {

		ALIGN	4

		// Assign Pointers
		mov		edx, dword ptr [mtx]	// EDX = & Matrix
		mov		eax, dword ptr [x]		// EAX = & X-Out
		mov		ebx, dword ptr [y]		// EBX = & Y-Out
		mov		ecx, dword ptr [z]		// ECX = & Z-Out

		// p1 = (x) * [0,0] 
		fld		qword ptr [edx + D_00]
		fmul	qword ptr [eax]			

		// p2 = (y) * [0,1]
		fld		qword ptr [edx + D_01]
		fmul	qword ptr [ebx] 

		// p3 = (z) * [0,2]
		fld		qword ptr [edx + D_02]
		fmul	qword ptr [ecx]

		// Swap ST(0) and ST(2)
		fxch	st(2) 

		// Add ST(0) to ST(1), then pop ST(0)
		faddp	st(1), st(0)

		// Push in [1,0]
		fld		qword ptr [edx + D_10]

		// Swap with ST(2)
		fxch	st(2) 

		// Add ST(0) to ST(1), then pop ST(0)
		faddp	st(1), st(0)

		// Swap ST(0) and ST(1)
		fxch	st(1) 

		// p4 = (x) * [1,0]
		fmul	qword ptr [eax]
		
		// Swap ST(0) with ST(1)
		fxch	st(1) 

		// Push in [1,1]
		fld		qword ptr [edx + D_11]

		// p5 = (y) * [1,1]
		fmul	qword ptr [ebx]

		// Push in [1,2]	
		fld		qword ptr [edx + D_12]

		// p6 = (z) * [1,2]
		fmul	qword ptr [ecx]
		
		// Swap ST(0) and ST(1)
		fxch	st(1) 

		// Add p5 to p4 and pop ST(0)
		faddp	st(3), st(0)

		// Push in [2,0]
		fld		qword ptr [edx + D_20]
		
		// Swap ST(3) with ST(0)		
		fxch	st(3) 

		// Add (p4+p5) to p6 and pop ST(0)
		faddp	st(1), st(0) 
		
		// Swap ST(0) and ST(2)		
		fxch	st(2) 

		// p7 = (x) * [2,0]
		fmul	qword ptr [eax] 

		// Swap ST(0) with ST(2)
		fxch	st(2) 

		// Push in [2,1]
		fld		qword ptr [edx + D_21]

		// p8 = (y) * [2,1]
		fmul	qword ptr [ebx] 

		// Push in [2,2]
		fld		qword ptr [edx + D_22]

		// p9 = (z) * [2,2]
		fmul	qword ptr [ecx] 
		
		// Swap ST(0) and ST(4)
		fxch	st(4) 

		// Add p7 to p8 and remove p7
		faddp	st(1), st(0) 

		// Swap ST(0) with ST(1)
		fxch	st(1) 

		// Y-Out = p4+p5+p6
		fstp	qword ptr [ebx] 

		// Add (p7+p8) to p9, then remove it
		faddp	st(2), st(0) 
		
		// X-Out = p1+p2+p3
		fstp	qword ptr [eax] 

		// Z-Out = p7+p8+p8
		fstp	qword ptr [ecx]
	}
}



/////////////////////////////////////////////////////////////////////////////
// Create a Rotation Matrix
/////////////////////////////////////////////////////////////////////////////

#define R00 (cy*cz)
#define R10 ((sx_sy*cz) - (cx*sz))
#define R20 ((cx_sy*cz) + (sx*sz))

#define R01 (cy*sz)
#define R11 ((sx_sy*sz) + (cx*cz))
#define R21 ((cx_sy*sz) - (sx*cz))

#define R02 (-sy)
#define R12 (sx*cy)
#define R22 (cx*cy)

void MakeRotMtx( MTX* m, double xr, double yr, double zr ) {

	double cx, cy, cz;
	double sx, sy, sz;

	double cx_sy;
	double sx_sy;

	cx = cos( xr );
	sx = sin( xr );

	cy = cos( yr );
	sy = sin( yr );

	cz = cos( zr );
	sz = sin( zr );

	cx_sy = cx * sy;
	sx_sy = sx * sy;

	m->d[0][0] = R00;
	m->d[0][1] = R01;
	m->d[0][2] = R02;

	m->d[1][0] = R10;
	m->d[1][1] = R11;
	m->d[1][2] = R12;

	m->d[2][0] = R20;
	m->d[2][1] = R21;
	m->d[2][2] = R22;
}

