
/*

# Dial of Destiny

> ( `destiny.js` )

*/


const canvas = document.querySelector( 'canvas' );

const ctx = canvas.getContext( "2d" );

const dayCounts = [

// JAN FEB MAR APR
    31, 28, 31, 30,

// MAY JUN JUL AUG
    31, 30, 31, 31,

//  SEP OCT NOV DEC
    30, 31, 30, 31

];


class JulianDate {
	constructor( date ) {
    if ( date ) {
		this.date = new Date( date );
    } else {
		this.read( dt );
    }
    console.log( this.date );
	}
	get dayIndex() {
		let sum = this.dayOfMonth;
		const limit = this.monthIndex;
    for ( let mi = 0; mi < limit; mi++ ) {
			sum += dayCounts[ mi ];
		}
		if ( limit < 2 ) return sum;
		return isLeapYear() ? (sum + 1) : sum;
	}
	get dayOfMonth() {
		return this.date.getDate();
  	}
	get monthIndex() {
		return this.date.getMonth();
  	}
	get year() {
		return this.date.getFullYear();
	}
  	read( input ) {
    	const s = input.value.substring( 0, 10 );
    	if ( s.length != 10 ) {
    	   this.date = new Date();
    	   return this.write( input );
    	}
    	const parts = s.split( "-" );
    	let t = parts[1] + "/" + parts[2] + "/" + parts[0];
    	this.date = new Date( t );
    	return this;
  	}
  	write( input ) {
	    let dd = String( this.dayOfMonth );
	    let mm = String( this.monthIndex + 1 );
	    let yyyy = String( this.year );
	    dd = dd.padStart( 2, '0' );
	    mm = mm.padStart( 2, '0' );
	    yyyy = yyyy.padStart( 4, '0' );
	    let value = `${yyyy}-${mm}-${dd}`;
	    console.log( { dd, mm, yyyy, value } );
	    input.value = value;
	    return this;
  	}
};

function isLeapYear( year ) {
    if ( 0 === ( year % 400 ) ) return true;
    if ( 0 === ( year % 100 ) ) return false;
    return ( 0 === ( year % 4 ) );
}

function daysInYear( year ) {
    return isLeapYear( year ) ? 366 : 365;
}

function daysInMonth( monthIndex ) {
    if ( isLeapYear() ) {
        if ( monthIndex == 1 ) { return 29; }
    }
    return dayCounts[ monthIndex ];
}

function dayIndex( date ) {
    const dt = new JulianDate( date );
    return dt.dayIndex;
}


function test() {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo( 5, 5 );
    ctx.lineTo( 150, 150 );
    ctx.stroke();
}

function test2() {
    const twopi = Math.PI * 1.35;
    dialFilled( 250, 250, 225, 0, twopi );
}

function dialFilled( x, y, r, as, ae ) {
    const tp =  Math.PI * 2.0;
    const ro = -Math.PI * 0.5;
    ctx.clearRect( 0, 0, 500, 500 );
    ctx.fillStyle = "rgba(220,220,22,0.54321)";
    ctx.beginPath();
    ctx.moveTo( x, y );
    ctx.ellipse( x, y, r, r, ro, as, ae );
    ctx.fill();
    ctx.strokeStyle = "rgba(120,220,22,0.45432)";
    ctx.lineWidth = "3";
    ctx.beginPath();
    ctx.ellipse( x, y, r, r, 0, 0, tp );
    ctx.stroke();
}

function dial( ratio ) {
    ratio = Math.min( ratio, 1 );
    ratio = Math.max( ratio, 0 );
    const radians = 2 * Math.PI * ratio;
    dialFilled( 250, 250, 225, 0, radians );
}

function percent( ratio ) {
    ratio *= 100;
    return ratio.toFixed(1) + "%";
}

function readout( total, used ) {
    const ratio = used / total;
    const pct = percent( ratio );
    const unused = total - used;
    dr.innerText = `Days Remaining ${unused} of ${total}`;
    dc.innerText = `Days Completed ${used} (${pct})`;
}

let currentDate = new JulianDate();

function onDateChanged( evt ) {
    const ie = evt ? evt.target : dt;
    currentDate.read( ie );
    const date = currentDate;
    const year = date.year;
    // dt.innerText = year;
    const total = daysInYear( year );
    const used = date.dayIndex;
    readout( total, used );
    const ratio = used / total;
    dial( ratio );
}

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

