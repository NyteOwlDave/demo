
/////////////////////////////////////////////////////////////////////////////
//
// Mtx.h - Matrix Math
//  Dave Wellsted, Mar 2001
//
/////////////////////////////////////////////////////////////////////////////


#ifndef MTX_DEFINED
#define MTX_DEFINED


typedef struct tagMTX {

	double d[3][3];

} MTX;


void MakeRotMtx( MTX*, double, double, double );
void MulVecMtx( MTX*, double*, double*, double* );


#endif  // !MTX_DEFINED

