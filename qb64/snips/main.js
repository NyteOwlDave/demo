
function main( event ) {
    try {
        init_ui();      // Gadgets
        init_io();      // File I/O
        init_demo();    // App Core Logic
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

