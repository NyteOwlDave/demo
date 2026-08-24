
/*

    graytable.js

    Generator for an HTML table showing a 4x4 gray scale palette.

    Dave Wellsted, NCS
    2020-APR-05

    DEPENDS:

    idGrayTable -- should be a DIV with this ID to position the output
                   on the page

*/

(function(){
    const attr = (e,n,v) => e.setAttribute(n,v);
    // const rd = (e) => e.value;
    // const rdi = (e) => parseInt(rd(e));
    // const wr = (e,s) => e.value = s;
    const width = (e,n) => e.style.width = `${n}px`;
    const height = (e,n) => e.style.height = `${n}px`;
    // Compose a CSS color string
    const rgb = (r, g, b) => `(${r},${g},${b})`;
    // Compose an HTML color string
    function html_color(r, g, b) {
        r &= 0xFF;
        g &= 0xFF;
        b &= 0xFF;
        const n = (r<<16)|(g<<8)|b;
        const s = n.toString(16);
        return "#" + "0".repeat(6-s.length) + s;
    }
    // Create HTML element with optional inner text
    function el(type,text) {
        if (typeof text !== "undefined") {
            const e = el(type);
            e.innerText = String(text);
            return e;
        }
        return document.createElement(type);
    }
    // Enclose HTML element in a new parent
    // (any prior parent is disowned)
    function en(type,child) {
        const old = child.parentElement;
        if (old) {
            old.removeChild(old);
        }
        const parent = el(type);
        parent.appendChild(child);
        return parent;
    }
    // Get HTML element by ID
    function gid(name) {
        return document.getElementById(name);
    }
    // Generate the table
    function table() {
        // Create a TH element with inner text
        function index(text) {
            return el("th",text);
        }
        // Create a SPAN element with inner text
        function span(text) {
            return el("span", text);
        }
        // Create a TD element with all the data for
        // the palette entry at index i
        function cell(i) {
            const r = g = b = Math.round(i * 255 / 15);
            const msg = en("div", span("Index " + i));
            msg.appendChild(el("br"));
            msg.appendChild(span(rgb(r,g,b)));
            const samp = el("div", " ");
            width(samp, 16);
            height(samp, 16);
            samp.style.backgroundColor = html_color(r, g, b);
            const td = el("td");
            [ msg, samp ].forEach(c=>td.appendChild(c));
            return td;
        }
        // Create a TR element and all content for
        // the palette entries in row y (including an index TH)
        // so 5 child elements total
        function row(y) {
            const tr = el("tr");
            let i = y * 4; 
            tr.appendChild(index(y));
            for (let x=0; x<4; x++) {
                tr.appendChild(cell(i++));
            }
            return tr;
        }
        // Create the single row for the THEAD block
        const thr = el("tr");
        thr.appendChild(index("y\\x"));
        for (let x=0; x<4; x++) {
            thr.appendChild(index(x));
        }
        const thead = en("thead", thr);
        // Create the 16 rows for the TBODY block
        const tbody = el("tbody");
        for (let y=0; y<4; y++) {
            tbody.appendChild(row(y));
        }
        // Create the single row for the TFOOT block
        const tfd = index("Gray Scale Palette");
        attr(tfd, "colspan", 5);
        const tfr = en("tr", tfd);
        const tfoot = en("tfoot", tfr);
        // Create the TABLE element and populate it
        const table = el("table");
        [ thead, tbody, tfoot ].forEach(c=>table.appendChild(c));
        // Locate parent element and append table to it
        const parent = gid("idGrayTable") || document.body;
        parent.appendChild(table);
    }
    // Execute
    table();
})();

