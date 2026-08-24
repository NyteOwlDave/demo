/*

  dlg.js
  
  Dialog functions

  Dave Wellsted, NyteOwl Computer Software
  Last Updated: 2020-MAY-17

  REQUIRES:

    nada

  2020-MAY-17
  Cosmetics
  
*/

// Simple input box
function inputBox(prompt, initial) {
    const psi = (n) => typeof n !== "undefined";
    initial = psi(initial) ? String(initial).trim() : "";
    let s = window.prompt(prompt, initial);
    if (!s) return "";
    return s.trim();
}

// Prompt for filename(s)
function fileDialog(multiple, accept, onloaded) {
    const input = document.createElement("input");
    input.type = "file";
    if (multiple) {
        input.setAttribute("multiple", "true");
    } else {
        input.setAttribute("multiple", "false");
    }
    input.setAttribute("accept", accept);
    input.oninput = function(e) {
        const files = e.target.files;
        onloaded(files);
        return true;
    }
    input.click();
}

// Prompt to load a text file
function textFileDialog(multiple, onloaded) {
    fileDialog(multiple, "text/*", onloaded)
}

// Prompt to load an image file
function imageFileDialog(multiple, onloaded) {
    fileDialog(multiple, "image/*", onloaded)
}

