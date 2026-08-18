
/*

# Dial of Destiny

> ( `destiny-app.js` )

*/


function main() {
	try {
	    dt.oninput = onDateChanged;
	    currentDate.write( dt );
	    onDateChanged();
	} catch ( e ) {
		alert ( e );
		throw ( e );
	}
}

addEventListener( "load", main );

