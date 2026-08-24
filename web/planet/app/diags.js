
/*

    diags.js

    Diagnostic Tests
    Dave Wellsted, NCS
    Last Updated: 2020/APR/03

    This should never be loaded in the production release.
    It's only for testing and development.

*/

// Test the texture load method
TextureDocument.test_load = function() {
    const pp = paint_planet;
    const td = new TextureDocument(pp.texture);
    td.prompt_load(function(e) {
        pp.texture = e.texture;
    });
}

// Test the texture save method
TextureDocument.test_save = function() {
    const pp = paint_planet;
    const td = new TextureDocument(pp.texture);
    td.prompt_save();
}

// Test the tokenizer
Tokenizer.test = function() {
    console.clear();
    const lines = [
        "",
        " ",
        "# Some comment",
        " # Some comment",
        "# Some comment ",
        "-",
        " # Some comment ",
        "12345", " 2423 ", "323 ", " 5454",
        "12.345", " 2.423 ", " ", "#", "32.3 ", " 5454.777",
        " ",
        " true ", " false ", " ",
        " 2020/APR/03 ",
        " "
    ];
    console.log("lines", lines);
    const doc = lines.join("\n");
    console.log("doc", doc);
    const T = Tokenizer;
    T.split(doc);
    console.log("T", T);
}

