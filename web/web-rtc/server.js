
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// server.js (Node)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// # Ensure the Node.js WebSocket Package is Installed
// > npm install ws
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// + Gemini Chat
// @ https://gemini.google.com/app/648a3941355c7570
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PORT : 8282
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const WebSocket = require('ws');


const banner = ( `
____________________________________________________________________________________________

######                       ###           #     #                  ######  #######  #####
#     #   ##   #    # ###### ### .####     #  #  # ###### #####     #     #    #    #     #
#     #  #  #  #    # #       #  #         #  #  # #      #    #    #     #    #    #
#     # #    # #    # #####  #   .####     #  #  # #####  #####     ######     #    #
#     # ###### #    # #               #    #  #  # #      #    #    #   #      #    #
#     # #    #  #  #  #          #    #    #  #  # #      #    #    #    #     #    #     #
######  #    #   ##   ######     .####.     ## ##  ###### #####     #     #    #     #####

            .#####.
            #     # ###### #####  #    # ###### #####
            #       #      #    # #    # #      #    #
            .#####  #####  #    # #    # #####  #    #
                  # #      #####  #    # #      #####
            #     # #      #   #   #  #  #      #   #
__________  .#####. ###### #    #   ##   ###### #    #  ______________________________________

` );

const port = 8282;

// Listen across all network interfaces ( LAN accessible )
const wss = new WebSocket.Server( { port } );

function announce( s ) {
    console.clear ();
    console.log   ( banner );
    console.log   ( `# ${s}\n` );
}

function blurt( s ) {
    const dt = Date.now();
    console.log( `- [${dt}] ${s}` );
}

const connected = function( ws ) {

    blurt( "New Client Connected" );

    // Connection State
    let sender_msg = ( "" );
    let sender_ws  = ( ws );
    let notified   = 0;

    // Is This Who Called?
    const is_sender =( client )=> (
        client === sender_ws
    );

    // Client Hung Up?
    const not_ready =( client )=> (
        client . readyState !== WebSocket . OPEN
    );

    /*
        Relay the signaling data
        ( offers, answers, ICE candidates )
    */
    const notify = function( client ) {
        if ( is_sender( client ) ) { return; }
        if ( not_ready( client ) ) { return; }
        const msg = ( sender_msg ) . toString();
        client . send( msg );
        notified += 1;
    }

    // Notify ALL Clients
    const notify_clients = function() {
        notified = 0;
        const clients = ( wss . clients );
        clients . forEach( notify );
        const n = notified;
        if ( n === 1 ) {
            blurt( `Notified 1 Client` );
        } else if (! n ) {
            blurt( `No Clients were Notified` );
        } else {
            blurt( `Notified ${n} Clients` );
        }
    };

    const receive = function( message ) {
        blurt( "Message Received" );
        sender_msg = ( message );
        notify_clients();
    };

    const disconnected = function() {
        blurt( "Client Disconnected" );
    };

    ws . on( "message", receive   );
    ws . on( "close", disconnected );

    sender_ws  = ( null );
    sender_msg = ( null );

};

// Listen for Incoming Messages
wss . on( "connection" , connected );

announce(
 `WebRTC Signaling Server running on Port ${port} ...`
);

