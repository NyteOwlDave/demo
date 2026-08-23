
/*
   details-table.js
*/

function details_table( o, title ) {
    try {
        title = ( str( title ) || `Details` );
        if (! o ) {
            o = mapper;
            title = ( `Mapper Details` );
        }
        const se = details_section;
        se.innerHTML = "";
        const te = elx( "TABLE" );
        const ce = te.createCaption();
        ce.textContent = ( title );
        se.appendChild( te );
        const m = mapper( o );
        mapper.tabulate( m, te );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

details_table.edit = function() {
    const ed = hud.editor();
    const se = gid( "details-table.js" );
    ed.value = se.innerText;
    hud.show();
};

details_table.notes = function() {
    const ops = details_table;
    const ed = hud.editor();
    ed.value = ( ops.hints );
    hud.show();
};

details_table.hints = ( `

/*
  To Show Accessor Details:
*/

_caption = "Details Table";
_accessor = details_table;

details_table( _accessor, _caption );

` );


/*

# Required Owner Gadget

<section id="details_section">
</section>

> [Details Table](./details-table.html)

*/

