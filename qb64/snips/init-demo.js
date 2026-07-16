
function init_demo() {
    srf = doc . getElementById( SURF.ID );
    if (! srf ) {
        srf = create_surface( SURF.W, SURF.H );
        srf . id = ( SURF . ID );
        doc . body . appendChild( srf );
    };
    console.debug( `Init Demo` );
}
