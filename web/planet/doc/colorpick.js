
/*

    colorpick.js

    Support for a very basic RGBv color picker.

    Dave Wellsted, NCS
    2020-APR-05

*/

(function(){
    let idRed, idRedN;
    let idGrn, idGrnN;
    let idBlu, idBluN;
    let idRGB, idRGBN;
    let idSample;
    const attr = (e,n,v) => e.setAttribute(n,v);
    const rd = (e) => e.value;
    const rdi = (e) => parseInt(rd(e));
    const wr = (e,s) => e.value = s;
    const width = (e,n) => e.style.width = `${n}px`;
    const height = (e,n) => e.style.height = `${n}px`;
    const rgb = (r, g, b) => `rgb(${r},${g},${b})`;
    function html_color(r, g, b) {
        r &= 0xFF;
        g &= 0xFF;
        b &= 0xFF;
        const n = (r<<16)|(g<<8)|b;
        let s = n.toString(16);
        return "#" + "0".repeat(6-s.length) + s;
    }
    function el(type,text) {
        if (typeof text !== "undefined") {
            const e = el(type);
            e.innerText = String(text);
            return e;
        }
        return document.createElement(type);
    }
    function en(type,child) {
        const old = child.parentElement;
        if (old) {
            old.removeChild(old);
        }
        const parent = el(type);
        parent.appendChild(child);
        return parent;
    }
    // Get element by ID
    function gid(name) {
        return document.getElementById(name);
    }
    // Create the color picker gadget
    // This is the fieldset and all controls (initialized)
    function createGadget() {
        const lg = el("legend", "RGB Color Picker");
        const fs = en("fieldset", lg);
        const table = el("table");
        attr(table, "border", "0");
        const tr = el("tr");
        const left_pane = el("td");     tr.appendChild(left_pane);
        const right_pane = el("td");    tr.appendChild(right_pane);
        table.appendChild(tr);
        fs.appendChild(table);
        function channel(name) {
            const id = "id" + name;
            const idN = id + "N";
            const inp = el("input");
            const rng = el("input");
            const lbl = el("label", name);
            attr(inp, "id", idN);
            attr(rng, "id", id);
            const div = el("div");
            [ inp, rng, lbl ].forEach(e=>{
                div.appendChild(e);
            });
            return div;
        }
        ["Red", "Grn", "Blu", "RGB"].forEach(name=>{
            left_pane.appendChild(channel(name));
        });
        const samp = el("div");
        attr(samp, "id", "idSample");
        right_pane.appendChild(samp);
        let parent = gid("idColorPicker") || document.body;
        parent.appendChild(fs);
        idRed = gid("idRed"); idRedN = gid("idRedN");
        idGrn = gid("idGrn"); idGrnN = gid("idGrnN");
        idBlu = gid("idBlu"); idBluN = gid("idBluN");
        idRGB = gid("idRGB"); idRGBN = gid("idRGBN");
        idSample = gid("idSample");
    }
    // Apply sample color
    function apply_sample(c) {
        idSample.style.backgroundColor = c;
    }
    // Apply r, g, b colors to controls
    function apply_rgb(r, g, b) {
        const c = html_color(r,g,b);
        wr(idRGB, c); wr(idRGBN, c);
        apply_sample(c);
    }
    // Apply combined color to controls
    function apply_color(color) {
        apply_sample(color)
        const n = parseInt(color.replace("#", "0x"));
        const r = (n>>16) & 0xFF;
        const g = (n>>8) & 0xFF;
        const b = (n) & 0xFF;
        wr(idRed, r);
        wr(idGrn, g);
        wr(idBlu, b);
        wr(idRedN, r);
        wr(idGrnN, g);
        wr(idBluN, b);
    }
    // Event handler
    function onRefresh() {
        const r = rdi(idRed); wr(idRedN, r);
        const g = rdi(idGrn); wr(idGrnN, g);
        const b = rdi(idBlu); wr(idBluN, b);
        apply_rgb(r, g, b);
    }
    // Event handler
    function onRefreshN() {
        const r = rdi(idRedN); wr(idRed, r);
        const g = rdi(idGrnN); wr(idGrn, g);
        const b = rdi(idBluN); wr(idBlu, b);
        apply_rgb(r, g, b);
    }
    // Event handler
    function onDetect() {
        const c = rd(idRGB);
        wr(idRGBN, c);
        apply_color(c);
    }
    // Event handler
    function onDetectN() {
        const c = rd(idRGBN);
        wr(idRGB, c);
        apply_color(c);
    }
    // Prepare sample control
    function prepSample() {
        width(idSample, 200);
        height(idSample, 200);
    }
    // Prepare wheel (range/slider) control
    function prepWheel(ctrl) {
        attr(ctrl, "type", "range");
        attr(ctrl, "min", "0");
        attr(ctrl, "max", "255");
        ctrl.oninput = onRefresh;
    }
    // Prepare number control for wheel
    function prepWheelN(ctrl) {
        attr(ctrl, "type", "text");
        width(ctrl, 100);
        ctrl.oninput = onRefreshN;
    }
    // Prepare color control
    function prepColor(ctrl) {
        attr(ctrl, "type", "color");
        wr(ctrl, html_color(127, 127, 127));
        ctrl.oninput = onDetect;
        ctrl.oninput();
    }
    // Prepare number control for color
    function prepColorN(ctrl) {
        attr(ctrl, "type", "text");
        width(ctrl, 100);
        ctrl.oninput = onDetectN;
    }
    // Create the whole gadget
    createGadget();
    // Prepare the number controls for each channel
    [
        idRedN,
        idGrnN,
        idBluN
    ].forEach(prepWheelN);
    // Prepare the range/slider controls for each channel
    [
        idRed,
        idGrn,
        idBlu
    ].forEach(prepWheel);
    // Prepare the sample control
    prepSample();
    // Prepare the number control for the combined color
    prepColorN(idRGBN);
    // Prepare the color picker control for the combined color
    prepColor(idRGB);
})();


