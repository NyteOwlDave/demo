
/* 

# Vector Math

- vector.js 

# Needs

- scalar.js

*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function RandomVec() {
 	const x = Random();
 	const y = Random();
    return Vec( x, y );
}

function RandomVec3() {
 	const x = Random();
 	const y = Random();
 	const z = Random();
    return Vec3( x, y, z );
}

function RandomVec4() {
 	const x = Random();
 	const y = Random();
 	const z = Random();
 	const w = Random();
    return Vec4( x, y, z, w );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function Vec( x, y ) {
    return { x, y };
}

function Vec3( x, y, z ) {
    return { x, y, z };
}

function Vec4( x, y, z, w ) {
    return { x, y, z, w };
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecCopy( vi, vo ) {
	vo = ( vo || {} );
	vo.x = vi.x;
	vo.y = vi.y;
	return ( vo );
}

function VecCopy3( vi, vo ) {
	vo = ( vo || {} );
	vo.x = vi.x;
	vo.y = vi.y;
	vo.z = vi.z;
	return ( vo );
}

function VecCopy4( vi, vo ) {
	vo = ( vo || {} );
	vo.x = vi.x;
	vo.y = vi.y;
	vo.z = vi.z;
	vo.w = vi.w;
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecWrite( x, y, vo ) {
	vo = ( vo || {} );
	vo.x = x;
	vo.y = y;
	return ( vo );
}

function VecWrite3( x, y, z, vo ) {
	vo = ( vo || {} );
	vo.x = x;
	vo.y = y;
	vo.z = z;
	return ( vo );
}

function VecWrite4( x, y, z, w, vo ) {
	vo = ( vo || {} );
	vo.x = x;
	vo.y = y;
	vo.z = z;
	vo.w = w;
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecDot( va, vb ) {
    const xx = va.x * vb.x;
    const yy = va.y * vb.y;
	return ( xx + yy );
}

function VecDot3( va, vb ) {
    const xx = va.x * vb.x;
    const yy = va.y * vb.y;
    const zz = va.z * vb.z;
	return ( xx + yy + zz );
}

function VecDot4( va, vb ) {
    const xx = va.x * vb.x;
    const yy = va.y * vb.y;
    const zz = va.z * vb.z;
    const ww = va.z * vb.z;
	return ( xx + yy + zz + ww );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecPerp( va, vb ) {
    const xy = va.x * vb.y;
    const yx = va.y * vb.x;
	return ( xy - yx );
}

function VecCross3( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.y * vb.z - va.z * vb.y;
    vo.y = va.z * vb.x - va.x * vb.z;
    vo.z = va.x * vb.y - va.y * vb.x;
    return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecLen( v ) {
    return Math.hypot( v.y, v.x );
}

function VecLen3( v ) {
    return Math.hypot( v.z, v.y, v.x );
}

function VecLen4( v ) {
    return Math.hypot( v.w, v.z, v.y, v.x );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecScale( vi, k, vo ) {
	vo = ( vo || {} );
    vo.x = vi.x * k;
    vo.y = vi.y * k;
	return ( vo );
}

function VecScale3( vi, k, vo ) {
	vo = ( vo || {} );
    vo.x = vi.x * k;
    vo.y = vi.y * k;
    vo.z = vi.z * k;
	return ( vo );
}

function VecScale4( vi, k, vo ) {
	vo = ( vo || {} );
    vo.x = vi.x * k;
    vo.y = vi.y * k;
    vo.z = vi.z * k;
    vo.w = vi.w * k;
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecAdd( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x + vb.x;
    vo.y = va.y + vb.y;
	return ( vo );
}

function VecAdd3( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x + vb.x;
    vo.y = va.y + vb.y;
    vo.z = va.z + vb.z;
	return ( vo );
}

function VecAdd4( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x + vb.x;
    vo.y = va.y + vb.y;
    vo.z = va.z + vb.z;
    vo.w = va.w + vb.w;
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecSub( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x - vb.x;
    vo.y = va.y - vb.y;
	return ( vo );
}

function VecSub3( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x - vb.x;
    vo.y = va.y - vb.y;
    vo.z = va.z - vb.z;
	return ( vo );
}

function VecSub4( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x - vb.x;
    vo.y = va.y - vb.y;
    vo.z = va.z - vb.z;
    vo.w = va.w - vb.w;
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecMul( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x * vb.x;
    vo.y = va.y * vb.y;
	return ( vo );
}

function VecMul3( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x * vb.x;
    vo.y = va.y * vb.y;
    vo.z = va.z * vb.z;
	return ( vo );
}

function VecMul4( va, vb, vo ) {
	vo = ( vo || {} );
    vo.x = va.x * vb.x;
    vo.y = va.y * vb.y;
    vo.z = va.z * vb.z;
    vo.w = va.w * vb.w;
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecNorm( vi, vo ) {
	vo = ( vo || {} );
    const w = DotSelf( vi.x, vi.y );
    if ( w < 1e-14 ) {
		VecWrite( 1, 0, vo );
    } else {
		VecScale( vi, 1 / Sqrt( w ), vo );
    }
	return ( vo );
}

function VecNorm3( vi, vo ) {
	vo = ( vo || {} );
    const w = DotSelf3( vi.x, vi.y, vi.z );
    if ( w < 1e-14 ) {
		VecWrite3( 1, 0, 0, vo );
    } else {
		VecScale3( vi, 1 / Sqrt( w ), vo );
    }
	return ( vo );
}

function VecNorm4( vi, vo ) {
	vo = ( vo || {} );
    const w = DotSelf4( vi.x, vi.y, vi.z, vi.w );
    if ( w < 1e-14 ) {
		VecWrite4( 1, 0, 0, 0, vo );
    } else {
		VecScale4( vi, 1 / Sqrt( w ), vo );
    }
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecLerp( va, vb, t, vo ) {
	vo = ( vo || {} );
    vo.x = Lerp( va.x, t, vb.x );
    vo.y = Lerp( va.y, t, vb.y );
	return ( vo );
}

function VecLerp3( va, vb, t, vo ) {
	vo = ( vo || {} );
    vo.x = Lerp( va.x, t, vb.x );
    vo.y = Lerp( va.y, t, vb.y );
    vo.z = Lerp( va.z, t, vb.z );
	return ( vo );
}

function VecLerp4( va, vb, t, vo ) {
	vo = ( vo || {} );
    vo.x = Lerp( va.x, t, vb.x );
    vo.y = Lerp( va.y, t, vb.y );
    vo.z = Lerp( va.z, t, vb.z );
    vo.w = Lerp( va.w, t, vb.w );
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecProject( vi, n, t, vo ) {
	vo = ( vo || {} );
    vo.x = Project( vi.x, n, t );
    vo.y = Project( vi.y, n, t );
	return ( vo );
}

function VecProject3( vi, n, t, vo ) {
	vo = ( vo || {} );
    vo.x = Project( vi.x, n, t );
    vo.y = Project( vi.y, n, t );
    vo.z = Project( vi.z, n, t );
	return ( vo );
}

function VecProject4( vi, n, t, vo ) {
	vo = ( vo || {} );
    vo.x = Project( vi.x, n, t );
    vo.y = Project( vi.y, n, t );
    vo.z = Project( vi.z, n, t );
    vo.w = Project( vi.w, n, t );
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecCombine( va, ta, vb, tb, vo ) {
	vo = ( vo || {} );
    vo.x = Combine( va.x, ta, vb.x, tb );
    vo.y = Combine( va.y, ta, vb.y, tb );
	return ( vo );
}

function VecCombine3( va, ta, vb, tb, vo ) {
	vo = ( vo || {} );
    vo.x = Combine( va.x, ta, vb.x, tb );
    vo.y = Combine( va.y, ta, vb.y, tb );
    vo.z = Combine( va.z, ta, vb.z, tb );
	return ( vo );
}

function VecCombine4( va, ta, vb, tb, vo ) {
	vo = ( vo || {} );
    vo.x = Combine( va.x, ta, vb.x, tb );
    vo.y = Combine( va.y, ta, vb.y, tb );
    vo.z = Combine( va.z, ta, vb.z, tb );
    vo.w = Combine( va.w, ta, vb.w, tb );
	return ( vo );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

VectorOps = {
    RandomVec , RandomVec3, RandomVec4
,   Vec , Vec3, Vec4
,   VecWrite , VecWrite3, VecWrite4
,   VecCopy , VecCopy3, VecCopy4
,   VecDot, VecDot3, VecDot4
,   VecPerp, VecCross3
,   VecLen, VecLen3, VecLen4
,   VecScale, VecScale3, VecScale4
,   VecAdd, VecAdd3, VecAdd4
,   VecSub, VecSub3, VecSub4
,   VecMul, VecMul3, VecMul4
,   VecNorm, VecNorm3, VecNorm4
,   VecLerp, VecLerp3, VecLerp4
,   VecProject, VecProject3, VecProject4
,   VecCombine, VecCombine3, VecCombine4
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


