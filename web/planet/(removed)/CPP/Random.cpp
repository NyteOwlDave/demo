
/////////////////////////////////////////////////////////////////////////////
//
// Random.cpp - Random Number Generator
//  Dave Wellsted, Mar 2001
//
// Based on Code by the University of Berkley
//
/////////////////////////////////////////////////////////////////////////////

#include "stdafx.h"
#include <math.h>
#include "Random.h"



/////////////////////////////////////////////////////////////////////////////
// Macros
/////////////////////////////////////////////////////////////////////////////

// Raw functions
#define ASM_FUNC __declspec( naked )

// Maximum number of Modes
#define		NUM_MODES	5 

// Magic Numbers for Linear Congruential Mode
#define		LC_MUL		1103515245
#define		LC_ADD		12345

// Linear Congruential Mode
#define		LEN_0		8
#define		DEG_0		0
#define		SEP_0		0

// Trinomial Mode: n^7 + n^3 + 1
#define		LEN_1		32
#define		DEG_1		7
#define		SEP_1		3

// Trinomial Mode: n^15 + n + 1
#define		LEN_2		64
#define		DEG_2		15
#define		SEP_2		1

// Trinomial Mode: n^31 + n^3 + 1
#define		LEN_3		128
#define		DEG_3		31
#define		SEP_3		3

// Trinomial Mode: n^63 + n + 1
#define		LEN_4		256
#define		DEG_4		63
#define		SEP_4		1



/////////////////////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////////////////////

// Lookup Tables for Each Mode
static long g_lenmap[NUM_MODES] = { LEN_0, LEN_1, LEN_2, LEN_3, LEN_4 };
static long g_degmap[NUM_MODES] = { DEG_0, DEG_1, DEG_2, DEG_3, DEG_4 };
static long g_sepmap[NUM_MODES] = { SEP_0, SEP_1, SEP_2, SEP_3, SEP_4 };

// Default State Buffer (Mode 3)
static unsigned long g_defbfr[ DEG_3 + 1 ] = { 

			 3U, 0x9a319039U, 0x32d9c024U, 0x9b663182U, 
	0x5da1f342U, 0xde3b81e0U, 0xdf0a6fb5U, 0xf103bc02U, 
	0x48f340fbU, 0x7449e56bU, 0xbeb1dbb0U, 0xab5c5918U, 
	0x946554fdU, 0x8c2e680fU, 0xeb3d799fU, 0xb11ee0b7U, 
	0x2d436b86U, 0xda672e2aU, 0x1588ca88U, 0xe369735dU, 
	0x904f35f7U, 0xd7158fd6U, 0x6fa6f051U, 0x616e6b96U, 
	0xac94efdcU, 0x36413f93U, 0xc622c298U, 0xf5a42ab8U, 
	0x8a88d77bU, 0xf5ad9d0eU, 0x8999220bU, 0x27fb47b9U 
};

// Current State Information
static long*	g_first	= (long*)(&(g_defbfr[1]));
static long*	g_last	= (long*)(&(g_defbfr[DEG_3]));
static long*	g_head	= (long*)(&(g_defbfr[1+SEP_3]));
static long*	g_tail	= (long*)(&(g_defbfr[1]));
static long		g_mode	= 3;
static long		g_deg	= DEG_3;
static long		g_sep	= SEP_3;



/////////////////////////////////////////////////////////////////////////////
// Multiplexer
/////////////////////////////////////////////////////////////////////////////
//
// The header entry in the state buffer contains the type and the index of
// the tail pointer, multiplexed together.
//
// This function does the multiplexing.
//
/////////////////////////////////////////////////////////////////////////////

static void Multiplex( void ) {
	
	long mux = g_mode;

	// If Trinomial Mode, Put in the Tail Index
	if( mux ) {
	
		long tail = g_tail - g_first;
		mux += (tail * NUM_MODES);
	}

	// Save multiplexed info
	g_first[ -1 ] = mux;
}



/////////////////////////////////////////////////////////////////////////////
// Demultiplexer
/////////////////////////////////////////////////////////////////////////////
//
// The header entry in the state buffer contains the type and the index of
// the tail pointer, multiplexed together.
//
// This function does the demultiplexing.
//
/////////////////////////////////////////////////////////////////////////////

static void DeMultiplex( long mux, long* mode, long* tail ) {

	*mode = mux % NUM_MODES;
	*tail = mux / NUM_MODES;
}



/////////////////////////////////////////////////////////////////////////////
// Seed the Random Number Generator
/////////////////////////////////////////////////////////////////////////////

void SeedRand( long n ) {

	// Save Seed value
	*g_first = n;

	// For Trinomial modes, initialize state buffer
	if( g_mode ) {

		int i;

		// Initialize head/tail pointers
		g_head = g_first + g_sep;
		g_tail = g_first;

		// Fill the state buffer with linear congruential values
		for( i = 1; i < g_deg; i++ )
			g_first[ i ] = g_first[ i-1 ] * LC_MUL + LC_ADD;

		// Mulch up the state buffer a little bit
		for( i = 0; i < 10*g_deg; i++ ) IRandom();
	}
}



/////////////////////////////////////////////////////////////////////////////
// Initialize State Information
/////////////////////////////////////////////////////////////////////////////
//
// This function allocates and initialized a brand spanking new state.
//
// IMPORTANT:
//
//  You should use the FreeRandState() function to deallocate the buffer
//  safely, because it automatically swaps out the buffer if it is active.
//
// Returns:  pointer to new buffer if success,
//           else NULL for error (bad mode or out of memory).
//
/////////////////////////////////////////////////////////////////////////////

char* CreateRandState( long seed, long mode ) {

	long len;
	long* bfr;

	// Make sure mode is valid
	if( (mode<0) || (mode>4) ) return NULL;

	// Determine buffer length (in elements)
	len = g_lenmap[ mode ] / sizeof( long );


	//--------------------------------------
	// Allocate
	//--------------------------------------
	
	bfr = new long[ len ];
	if( !bfr ) return NULL;


	//--------------------------------------
	// Initialize Buffer
	//--------------------------------------

	// Save Type and Seed Information
	bfr[ 0 ] = mode;
	bfr[ 1 ] = seed;

	// If Trinomial...
	if( mode ) {

		int i;
		long deg, sep;
		long* first;
		long* last;
		long* head;
		long* tail;

		// Determine Degree and Separation for Type
		deg = g_degmap[ mode ];
		sep = g_sepmap[ mode ];

		// Determine Start Point
		first = bfr + 1;
		last  = bfr + deg;
		head  = first + sep;
		tail  = first;

		// Fill the state buffer with linear congruential values
		for( i = 1; i < deg; i++ )
			first[ i ] = first[ i-1 ] * LC_MUL + LC_ADD;

		// Mulch up the state buffer a little bit
		//  (emulates calling IRandom(), but simpler)
		for( i = 0; i < 10*deg; i++ ) {

			// Do the math, dude...
			*head += *tail;

			// Bump 'em
			head++;
			tail++;
			
			// Wrap if needed
			if( head > last )	   head = first;
			else if( tail > last ) tail = first;
		}
	}
	
	// Return new buffer
	return (char*)(bfr);
}



/////////////////////////////////////////////////////////////////////////////
// Safely Free a Dynamic Random State
/////////////////////////////////////////////////////////////////////////////

void FreeRandState( char* p ) {

	// If this state is active, restore default state
	if( (g_first-1) == ((long*)p) )
		SetRandState( NULL );

	// Free this one
	if( p ) delete[] p;
}



/////////////////////////////////////////////////////////////////////////////
// Set Active State
/////////////////////////////////////////////////////////////////////////////
//
// Returns:  Pointer to old state, if success,
//			 else NULL for invalid buffer (actually, this is impossible).
//
/////////////////////////////////////////////////////////////////////////////

char* SetRandState( char* bfr ) {

	long mux, mode, head, tail;

	long* new_bfr = (long*)(bfr);
	char* old_bfr = (char*)(g_first-1);

	// Multiplex old buffer
	Multiplex();

	// If a NULL pointer is passed, use default buffer
	if( !new_bfr ) new_bfr = (long*)(g_defbfr);

	// Demultiplex new buffer
	mux = new_bfr[ 0 ];
	DeMultiplex( mux, &mode, &tail );

	// Check new mode
	if( (mode<0) || (mode>NUM_MODES) ) 
		return NULL;

	// Setup vars, based on mode
	g_mode = mode;
	g_deg  = g_degmap[ mode ];
	g_sep  = g_sepmap[ mode ];

	// Init first/last ptrs
	g_first = new_bfr + 1;
	g_last  = new_bfr + g_deg;

	// Init head/tail ptrs
	if( mode ) {

		// Keep head and tail within bounds
		tail = tail % g_deg;
		head = (tail + g_sep) % g_deg;

		// Get 'em
		g_head = g_first + head;
		g_tail = g_first + tail;
	}

	// Return ptr to Old State
	return old_bfr;
}



/////////////////////////////////////////////////////////////////////////////
// Get a Copy of Local Variables
/////////////////////////////////////////////////////////////////////////////
//
// Just in case you want to examine the current R.N.G. state, here's a 
// handy function for that.
//
/////////////////////////////////////////////////////////////////////////////

void GetRandInfo( RANDINFO* p ) {

	if( !p ) return;

	p->bfr	 = (char*)(g_first-1);
	p->first = g_first;
	p->last	 = g_last;
	p->head	 = g_head;
	p->tail	 = g_tail;
	p->mode	 = g_mode;
	p->deg	 = g_deg;
	p->sep	 = g_sep;
}



/////////////////////////////////////////////////////////////////////////////
// Random Integer between 0 and MAXRND
/////////////////////////////////////////////////////////////////////////////

ASM_FUNC
long IRandom( void ) {

	_asm {

		// If g_mode != TYPE_0 ...
		mov		eax, [g_mode]
		or		eax, eax
		jnz		fancy				// ...go do Fancy Stuff

		// Do the linear congruential thing
		mov		ecx, [g_first]		// ECX = g_first
		mov		edx, LC_MUL
		mov		eax, [ecx]			// EAX = g_first[0]
		mul		edx					// EAX *= magical factor
		add		eax, LC_ADD			// EAX += magical number
		mov		[ecx], eax			// g_first[0] = EAX
		and		eax, MAXRND			// remove top bit
		ret							// Return random number in EAX


	// Do the fancy trinomial stuff	
	ALIGN 4
	fancy:
		mov		ecx, [g_head]	// Head and tail pointers
		mov		edx, [g_tail]

		mov		eax, [ecx]		// Add 'em
		add		eax, [edx]
		mov		[ecx], eax		// Store result to head

		add		edx, 4			// Advance tail pointer
		shr		eax, 1			// Shift out least random bit
		add		ecx, 4			// Advance head pointer		

		// Need to wrap tail?
		cmp		edx, [g_last]
		ja		wrap_tail

		// Need to wrap head?
		cmp		ecx, [g_last]
		jae		wrap_head

		// Save pointers
		mov		[g_head], ecx
		mov		[g_tail], edx
		ret						// Result returned in EAX


	// Head pointer wrapped
	ALIGN 4	
	wrap_head:		
		mov		ecx, [g_first]	// Wrap head to the beginning		
		mov		[g_tail], edx	// Save new tail ptr
		mov		[g_head], ecx	// Save new head ptr
		ret						// Result returned in EAX


	// Tail pointer wrapped
	ALIGN 4	
	wrap_tail:
		mov		edx, [g_first]	// Wrap tail to the beginning		
		mov		[g_head], ecx	// Save new head ptr
		mov		[g_tail], edx	// Save new tail ptr
		ret						// Result returned in EAX
	}
}



/////////////////////////////////////////////////////////////////////////////
// Random Number between 0.0 and 1.0
/////////////////////////////////////////////////////////////////////////////

double Random( void ) {

	return ((double)IRandom()) / ((double)MAXRND);
}



/////////////////////////////////////////////////////////////////////////////
// Random Integer between 0 and range-1
/////////////////////////////////////////////////////////////////////////////

long IRandom( long range ) {

	double r;

	if( range < 1 ) return 0;
	r = (double)(range-1);
	return ((long) floor( Random()*r+0.5 ));
}

