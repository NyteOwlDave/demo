
/////////////////////////////////////////////////////////////////////////////
//
// Random.h - Random Number Generator
//  Dave Wellsted, Mar 2001
//
// Based on Code by the University of Berkley
//
/////////////////////////////////////////////////////////////////////////////

#ifndef RANDOM_DEFINED
#define RANDOM_DEFINED


// Maximum Random Integer Value
#define MAXRND 0x7FFFFFFF


// Information about State of Random Number Generator
typedef struct tagRANDINFO{

	char*	bfr;	// Start of State Buffer
	long*	first;	// First valid element in state buffer
	long*	last;	// First invalid element in state buffer
	long*	head;	// Head pointer
	long*	tail;	// Tail pointer
	long	mode;	// Generator Mode
	long	deg;	// Polynomial Degree
	long	sep;	// Head/Tail separation (in elements)

} RANDINFO;



/////////////////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////////////////

// Seed the Random Number Generator
void SeedRand( long );

// Create/Free a custom Random State
char* CreateRandState( long, long );
void FreeRandState( char* );

// Set Random State
char* SetRandState( char* );

// Random real between 0.0 and 1.0
double Random( void );

// Random Integer between 0 and MAXRND
long IRandom( void );

// Random Integer between 0 and n-1
long IRandom( long );


#endif  // !RANDOM_DEFINED

