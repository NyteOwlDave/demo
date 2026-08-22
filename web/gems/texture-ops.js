
/*
    texture-ops.js
    Dave's Demo Gems
*/


Texture = {};


Texture.all = function() {
    return all( ".texture" );
};


Texture.pick = function( index ) {
    const ops = Texture;
    const m = ops.all();
    index = parseInt( index );
    return ( m[ index ] );
};


Texture.picture = function( index, srf ) {
    const ops = Texture;
    const tex = ops.pick( index );
    if (! srf ) {
        const srf = new OffscreenCanvas();
        srf.width  = tex.naturalWidth;
        srf.height = tex.naturalHeight;
    }
    return ops.render( tex, srf );
};


Texture.render = function( tex, srf ) {
    const ops = Texture;
    srf = ( srf || Surface() );
    tex = ( tex || ops.pick( 0 ) );
    const tw = tex.naturalWidth;
    const th = tex.naturalHeight;
    const sw = srf.width;
    const sh = srf.height;
    const ctx = srf.getContext( "2d" );
    ctx.drawImage( tex, 0, 0, sw, sh );
    return ( srf );
};


Texture.folder = function( url ) {
    const parts = url.split( "/" );
    if ( parts.length > 1 ) {
        parts.pop();
        return parts.join( "/" );
    }
    return ( url );
};


Texture.filename = function( url ) {
    const parts = url.split( "/" );
    if ( parts.length > 1 ) {
        return parts.pop();
    }
    if ( url.includes( ":" ) ) {
        return ( "unknown" );
    }
    return ( url );
};

Texture.basename = function( url ) {
    const ops = Texture;
    url = ops.filename( url );
    const parts = url.split( "." );
    if ( parts.length > 1 ) {
        parts.pop();
        return parts.join( "." );
    }
    return ( url );
};


Texture.extension = function( url ) {
    const ops = Texture;
    url = ops.filename( url );
    const parts = url.split( "." );
    if ( parts.length > 1 ) {
        return parts.pop();
    }
    return ( "" );
};


Texture.mem = function() {
    const ops = Texture;
    return Object.keys( ops ).sort();
};

;
; console.log( `Loaded "texture-ops.js" Gem` )
;

