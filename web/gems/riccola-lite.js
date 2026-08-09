
/* riccola-lite.js */

function riccola( k, v ) {
    const type = "text/plain";
    const charset = "utf-8";
    const options = { type, charset };
    k = str( k ) || "ideka.md";
    v = str( v );
    const b = new Blob( [ v ], options );
    const a = elx( "A" );
    a . href = URL.createObjectURL( b );
    a . download = ( k );
    a . click();
    URL.revokeObjectURL( a . href );
}
