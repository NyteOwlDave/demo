
/* core-ops.js */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;
; str =( o )=> String( o || "" ).trim()
; arr =( o )=> Array.from( o || [] )
; unq =( o )=> ( new Set ( o || [] ) )
; dct =(   )=> ( new Map() )
;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;
; ole =( q, e )=>    ( e.querySelector   ( q ) )
; ale =( q, e )=> arr( e.querySelectorAll( q ) )
; one =( q )=> ole( q, doc )
; all =( q )=> ale( q, doc )
;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;
; elx =( t )=> doc.createElement ( t )
; gid =( i )=> doc.getElementById( i )
;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;
; mem =( o )=> Object.keys( o || window ).sort()
; dir =( o )=> mem( o || localStorage   || {} );
; tmp =( o )=> mem( o || sessionStorage || {} );
;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;
; gad =( o )=> ( o instanceof HTMLElement         )
; ged =( o )=> ( o instanceof HTMLTextAreaElement )
; gvw =( o )=> ( o instanceof HTMLPreElement      )
; gtb =( o )=> ( o instanceof HTMLTableElement    )
; gsc =( o )=> ( o instanceof HTMLSectionElement  )
;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;
; isa =( t, o )=> ( t === typeof o )
; iar =( o )=> Array.isArray( o )
; iob =( o )=> ( o instanceof Object )
;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


CoreOps = {
  str, arr, unq, dct
, ole, ale, one, all
, elx, gid
, mem, dir, tmp
, gad, ged, gvw, gtb, gsc
, isa, iar, iob
};


;
; console.log ( `Load "core-ops.js" gem` )
;

