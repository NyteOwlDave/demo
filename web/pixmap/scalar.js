
/* scalar.js */

function Random() {
 	return Math.random();
}

function Abs( x ) {
 	return Math.abs( x );
}

function Sgn( x ) {
 	return Math.sign( x );
}

function Floor( x ) {
 	return Math.floor( x );
}

function Ceiling( x ) {
 	return Math.ceil( x );
}

function Truncate( x ) {
 	return Math.trunc( x );
}

function Min( a, b ) {
 	return Math.min( a, b );
}

function Max( a, b ) {
 	return Math.max( a, b );
}

function Median( a, b, c ) {
 	return Math.min( Math.max( a, b ), c );
}

// QB64 Hack for Fractional '%' Modulus from JavaScript
function FloatMod( a, b ) {
	return ( a % b );
}

function Square( x ) {
	return ( x * x );
}

function Cube( x ) {
	return ( x * x * x );
}

function Sqrt( x ) {
	return Math.sqrt( x );
}

function Cbrt( x ) {
	return Math.cbrt( x );
}

function Log( x ) {
	return Math.log( x );
}

function Exp( x ) {
	return Math.exp( x );
}

function Pow( x, n ) {
	return Math.pow( x, n );
}

function LogN( x, n ) {
	return ( Math.log( x ) / Math.log( n ) );
}

function RootN( x, n ) {
	return Math.pow( x, 1 / n );
}

function DotSelf( a, b ) {
	return ( a * a + b * b );
}

function DotSelf3( a, b, c ) {
	return ( a * a + b * b + c * c );
}

function DotSelf4( a, b, c, d ) {
	return ( a * a + b * b + c * c + d * d );
}

function Hypot( y, x ) {
    return Math.hypot( y, x );
}

function ATan2( y, x ) {
    return Math.atan2( y, x );
}

function Sin( t ) {
    return Math.sin( t );
}

function Cos( t ) {
    return Math.cos( t );
}

function Tan( t ) {
    return Math.tan( t );
}

function ASin( x ) {
    return Math.asin( x );
}

function ACos( x ) {
    return Math.acos( x );
}

function ATan( x ) {
    return Math.atan( x );
}

function Lerp( a, b, t ) {
    return Combine( a, (1 - t), b, t );
}

function Project( a, n, t ) {
    return ( a + n * t );
}

function Combine( a, ta, b, tb ) {
    return ( a * tb + b * tb );
}

function Gamma( a, n, x ) {
    return Math.pow( a / n, 1 / x );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ScalarOps = {
  Random
, Abs, Sgn
, Max, Median, Min
, FloatMod
, Floor, Ceiling, Truncate
, Square, Cube
, Pow, Sqrt, Cbrt
, Log, Exp
, LogN, RootN
, DotSelf, DotSelf3, DotSelf4
, Tan  , Sin  , Cos
, ATan , ASin , ACos
, ATan2, Hypot
, Lerp, Project, Combine
, Gamma
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



