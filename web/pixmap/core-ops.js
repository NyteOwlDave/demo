
/* core-ops.js */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
; str =( o )=> String( o || "" ).trim()
; arr =( o )=> Array.from( o || [] )
; unq =( o )=> ( new Set ( o || [] ) )
; dct =(   )=> ( new Map() )
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
; ole =( q, e )=>    ( e.querySelector   ( q ) )
; ale =( q, e )=> arr( e.querySelectorAll( q ) )
; one =( q )=> ole( q, doc )
; all =( q )=> ale( q, doc )
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
; elx =( t )=> doc.createElement ( t )
; gid =( i )=> doc.getElementById( i )
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
; mem =( o )=> Object.keys( o || window ).sort()
; dir =( o )=> mem( o || localStorage   || {} );
; tmp =( o )=> mem( o || sessionStorage || {} );
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


CoreOps = {
  str, arr, unq, dct
, ole, ale, one, all
, elx, gid
, mem, dir, tmp
};

