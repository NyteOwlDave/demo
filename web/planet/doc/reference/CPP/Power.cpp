
/////////////////////////////////////////////////////////////////////////////
//
// Power.cpp - Raise a base to a power
//  Dave Wellsted, Mar 2001
//
// Based on code by DJ Delorie
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include "Power.h"



/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

static WORD g_ctrl1 = 0;
static WORD g_ctrl2 = 0;
static DWORD g_yint = 0;
static double g_one = 1.0;



/////////////////////////////////////////////////////////////////////////////
// Power Function
/////////////////////////////////////////////////////////////////////////////

__declspec( naked )
double Power( double* base, double* expo ) {

	_asm {
								
		mov		eax, [esp+8]	// Exponent
		fld		qword ptr [eax]

		mov		eax, [esp+4]	// Base
		fld		qword ptr [eax]

		ftst
		fstsw	ax
		sahf
		jbe		xltez

		fyl2x


	// Compute n = 2^frac(x) * 2^int(x)
	Lpow2:

		call    frac

		f2xm1
		fadd	[g_one]

		fscale

		fstp	st(1)
		ret


	// Split a positive number into 
	//  integer and fractional parts
	frac:

		fstcw	[g_ctrl1]
		fstcw	[g_ctrl2]
		and		[g_ctrl2], 0xF3FF
		or		[g_ctrl2], 0x0400
		fldcw	[g_ctrl2]

		fld		st(0)
		frndint

		fldcw	[g_ctrl1]
	
		fxch	st(1)
		fsub	st, st(1)

		ret


	// Base was <= 0.0
	xltez:
	
		jb		xltz

		fstp	st(0)

		ftst
		fstsw	ax
		sahf

		ja		ygtz
		jb		oops

		fstp	st(0)

		fld1
		fchs


	// Error
	oops:

		fsqrt
		ret


	// Exponent > 0.0, Base = 0.0
	ygtz:

		fstp	st(0)
		fldz
		ret


	// Base was < 0.0, check exponent
	xltz:
	
		fabs

		fxch    st(1)
		call	frac

		ftst
		fstsw	ax
		fstp	st(0)
		sahf

		je		yisint

		fstp	st(0)
		fchs
		jmp		oops


	// Base was negative, and Exponent was Whole, so...
	yisint:

		fist	[g_yint]

		fxch    st(1)

		fyl2x

		call	Lpow2

		and		[g_yint], 1
		jz		yeven

		fchs


	// Exponent is even (so sign is positive)
	yeven:

		ret
	}
}



/////////////////////////////////////////////////////////////////////////////
// Positive Power Function
/////////////////////////////////////////////////////////////////////////////
//
// This function raises a positive base to a positive exponent.
//
// This is somewhat faster than the more comprehensive function.
//
// If either base or exponent is negative, the result is undefined.
//
/////////////////////////////////////////////////////////////////////////////

__declspec( naked )
double PosPower( double* base, double* expo ) {

	_asm {

		mov		eax, [esp+4]	// Base
		fld		qword ptr [eax]

	// See if base is zero
		ftst
		fstsw	ax
		sahf
		jnz		more

	// Return zero in ST
		ret


	// n = expo * log2( base )
	ALIGN 4
	more:
		mov		eax, [esp+8]	// Exponent
		fld		qword ptr [eax]

		fxch	st(1)

		fyl2x

	// ST(0) = frac(n)
	// ST(1) = int(n)
		fstcw	[g_ctrl1]
		fstcw	[g_ctrl2]
		and		[g_ctrl2], 0xF3FF
		or		[g_ctrl2], 0x0400
		fldcw	[g_ctrl2]
		fld		st(0)
		frndint
		fldcw	[g_ctrl1]	
		fxch	st(1)
		fsub	st, st(1)
		
	// result = 2^frac(n) * 2^int(n)
		f2xm1
		fadd	[g_one]
		fscale
		fstp	st(1)
		
	// Return result in ST
		ret
	}
}

