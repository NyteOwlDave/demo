
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
    const x = va.y * vb.z - va.z * vb.y;
    const y = va.z * vb.x - va.x * vb.z;
    const z = va.x * vb.y - va.y * vb.x;
    return Vec3( x, y, z );
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
    vo.x = vi.x * k;
    vo.y = vi.y * k;
}

function VecScale3( vi, k, vo ) {
    vo.x = vi.x * k;
    vo.y = vi.y * k;
    vo.z = vi.z * k;
}

function VecScale4( vi, k, vo ) {
    vo.x = vi.x * k;
    vo.y = vi.y * k;
    vo.z = vi.z * k;
    vo.w = vi.w * k;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecAdd( va, vb, vo ) {
    vo.x = va.x + vb.x;
    vo.y = va.y + vb.y;
}

function VecAdd3( va, vb, vo ) {
    vo.x = va.x + vb.x;
    vo.y = va.y + vb.y;
    vo.z = va.z + vb.z;
}

function VecAdd4( va, vb, vo ) {
    vo.x = va.x + vb.x;
    vo.y = va.y + vb.y;
    vo.z = va.z + vb.z;
    vo.w = va.w + vb.w;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecSub( va, vb, vo ) {
    vo.x = va.x - vb.x;
    vo.y = va.y - vb.y;
}

function VecSub3( va, vb, vo ) {
    vo.x = va.x - vb.x;
    vo.y = va.y - vb.y;
    vo.z = va.z - vb.z;
}

function VecSub4( va, vb, vo ) {
    vo.x = va.x - vb.x;
    vo.y = va.y - vb.y;
    vo.z = va.z - vb.z;
    vo.w = va.w - vb.w;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecMul( va, vb, vo ) {
    vo.x = va.x * vb.x;
    vo.y = va.y * vb.y;
}

function VecMul3( va, vb, vo ) {
    vo.x = va.x * vb.x;
    vo.y = va.y * vb.y;
    vo.z = va.z * vb.z;
}

function VecMul4( va, vb, vo ) {
    vo.x = va.x * vb.x;
    vo.y = va.y * vb.y;
    vo.z = va.z * vb.z;
    vo.w = va.w * vb.w;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecNorm( vi, vo ) {
    const w = DotSelf( vi.x, vi.y );
    if ( w < 1e-14 ) {
        Vec( 1, 0, vo );
    } else {
        const k = 1 / Sqr( w );
        Vec( vi.x * k, vi.y * k, vo );
    }
}

function VecNorm3( vi, vo ) {
    const w = DotSelf3( vi.x, vi.y, vi.z );
    if ( w < 1e-14 ) {
        Vec3( 1, 0, 0, vo );
    } else {
        const k = 1 / Sqr( w );
        Vec3( vi.x * k, vi.y * k, vi.z * k, vo );
    }
}

function VecNorm4( vi, vo ) {
    const w = DotSelf4( vi.x, vi.y, vi.z, vi.w );
    if ( w < 1e-14 ) {
        Vec4( 1, 0, 0, 0, vo );
    } else {
        const k = 1 / Sqr( w );
        Vec4(
              vi.x * k
            , vi.y * k
            , vi.z * k
            , vi.w * k
            , vo
        );
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecLerp( va, vb, t, vo ) {
    vo.x = Lerp( va.x, t, vb.x );
    vo.y = Lerp( va.y, t, vb.y );
}

function VecLerp3( va, vb, t, vo ) {
    vo.x = Lerp( va.x, t, vb.x );
    vo.y = Lerp( va.y, t, vb.y );
    vo.z = Lerp( va.z, t, vb.z );
}

function VecLerp4( va, vb, t, vo ) {
    vo.x = Lerp( va.x, t, vb.x );
    vo.y = Lerp( va.y, t, vb.y );
    vo.z = Lerp( va.z, t, vb.z );
    vo.w = Lerp( va.w, t, vb.w );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecProject( vi, n, t, vo ) {
    vo.x = Project( vi.x, n, t );
    vo.y = Project( vi.y, n, t );
}

function VecProject3( vi, n, t, vo ) {
    vo.x = Project( vi.x, n, t );
    vo.y = Project( vi.y, n, t );
    vo.z = Project( vi.z, n, t );
}

function VecProject4( vi, n, t, vo ) {
    vo.x = Project( vi.x, n, t );
    vo.y = Project( vi.y, n, t );
    vo.z = Project( vi.z, n, t );
    vo.w = Project( vi.w, n, t );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function VecCombine( va, ta, vb, tb, vo ) {
    vo.x = Combine( va.x, ta, vb.x, tb );
    vo.y = Combine( va.y, ta, vb.y, tb );
}

function VecCombine3( va, ta, vb, tb, vo ) {
    vo.x = Combine( va.x, ta, vb.x, tb );
    vo.y = Combine( va.y, ta, vb.y, tb );
    vo.z = Combine( va.z, ta, vb.z, tb );
}

function VecCombine4( va, ta, vb, tb, vo ) {
    vo.x = Combine( va.x, ta, vb.x, tb );
    vo.y = Combine( va.y, ta, vb.y, tb );
    vo.z = Combine( va.z, ta, vb.z, tb );
    vo.w = Combine( va.w, ta, vb.w, tb );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

VectorOps = {
    RandomVec , RandomVec3, RandomVec4
,   Vec , Vec3, Vec4
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


