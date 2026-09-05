
/* decal-menu.js */

function init_decal_menu( menu, ops ) {
    menu . ops = ops; // Attach Accessor to Menu Gadget
    // Read Decals as Array ( from Core List )
    // e.g. " ➕ | ➖ | ✔️ | ❔ "
    let m = (
        ( menu )
        . textContent
        . trim()
        . split( "|" )
    );
    // Clean Up Decal List
    m = (
        ( m )
        . map( (s) => (s).trim() )
        . filter( (s)=>(s) )
    );
    // Remove Existing Content from menu
    ( menu ).innerHTML = "";
    // Create Menu Buttons
    ( m )
    . forEach(
        ( k ) => {
            const be = elx( "BUTTON" );
            menu . appendChild( be );
            be . textContent = ( k );
            be . onclick = function( e ) {
                const sender = ( e.target );
                sender . event = ( e );
                zap( sender );
            };
        }
    );
}

function zap( sender ) {
    try {
        zap.error = "";
        zap.sender = ( sender );
        const ev = sender.event;
        const k = sender.textContent.trim();
        const method = method_map[ k ];
        const parent = sender.parentElement;
        const ops = parent.ops;
        if (! ( ops instanceof Object ) ) {
            console.warn( { menu : parent } );
            throw new Error( `Menu Has No Accessor` );
        }
        if ( ev.ctrlKey ) {
            if ( "function" === typeof ops.hint ) {
                ops.hint( method );
            }
            return;
        }
        const fn = ops[ method ];
        if ( "function" !== typeof fn ) {
            console.warn( { menu : parent } );
            throw new Error(
                `Missing Accessor Method : ${method}`
            );
        }
        fn();
    } catch ( e ) {
        zap.error = ( e.message  );
        console . error( e.message );
        if ( zap.alerts ) {
            alert( e );
        }
    }
}

;
; zap.alerts = ( true )
;
; console.log( `Loaded "decal-menu.js" Gem Module` )
;
