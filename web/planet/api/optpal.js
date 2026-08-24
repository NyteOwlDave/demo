
/*

  optpal.js
  
  Creates an optimal color palette for a bitmap
  
  Author:   Dave Wellsted, NCS
  Updated:  2020-MAY-17

  REQUIRES: 
  
    v4/color.js

  2020-APR-03
  Cosmetic improvements
  General tweaks

  2020-MAY-17
  Cosmetics

*/

// Creates an optimal 256-color palette from an image
// The bmp arg is an ImageData or an HTMLCanvasElement object
// The palette format is array-based (not object-based)
const createOptimalPalette = (function() {
    // Creates a new color summing object
    function newColorSum() {
        return MakeColor(0,0,0);    // color.js
    }
    // Creates a new node object
    function newNode() {
        return {
            leaf: false,
            level: 0,
            numColors: 0,
            numChildNodes: 0,
            childNodes: [null,null,null,null,null,null,null,null],
            reducible: null,
            sum: newColorSum()
        };
    }
    // Declare variables
    let myColorIndex, myNumLeaves, myReduceLevel, myLeafLevel;
    let myTree, myNumNodes, myMaxNodes;
    let myPal = [];
    let myReduceList = [];
    // Clear the palette (set to all black)
    function clearPalette() {
        myPal = [];
        for (let n=0; n<256; n++) {
            myPal[n] = [0,0,0];
        }
    }
    // Clear the reduce list (set to all null)
    function clearReduceList() {
        myReduceList = [];
        for (let n=0; n<8; n++) {
            myReduceList[n] = null;
        }
        myReduceLevel = 7;
        myLeafLevel = 8;
    }
    // Test a bit
    // Returns: 0 for faile
    //          That exact bit otherwise (in place)
    function testBit(a,b) {
        return ((a&(1<<b))>>b);
    }
    // Create a new node
    function createNode(level) {
        const node = newNode();
        myNumNodes += 1;
        if (myNumNodes > myMaxNodes) {
            myMaxNodes = myNumNodes;
        }
        node.level = level;
        node.leaf = (level >= myLeafLevel);
        if (node.leaf) {
            myNumLeaves++;
        }
        return node;
    }
    // Whether a node is reducible
    function getReducible() {
        let n;
        for (n=myReduceLevel; n>0; n--) {
            if (myReduceList[n]) break;
        }
        const node = myReduceList[n];
        if (!node) {
            throw new Error("Reducible list is empty");
        }
        myReduceList[n] = node.reducible;
        return node;
    }
    // Make a node reducible
    function makeReducible(node,level) {
        node.reducible = myReduceList[level];
        myReduceList[level] = node;
    }
    // Build palette from color sums
    function buildPalette(node) {
        if (!node) return;
        if (myColorIndex > 255) return;
        if (node.leaf || (node.level >= myLeafLevel)) {
            const scale = 1 / node.numColors;
            const level = n => Math.floor(n * scale)
            node.leaf = true;
            myPal[myColorIndex][0] = level(node.sum.R);
            myPal[myColorIndex][1] = level(node.sum.G);
            myPal[myColorIndex][2] = level(node.sum.B);
            myColorIndex += 1
        }
        else {
            for (let n=0; n<8; n++) {
                buildPalette(node.childNodes[n]);
            }
        }
    }
    // Destroy tree
    function destroyTree(node) {
        if (!node) return;
        for (let n=0; n<8; n++) {
            destroyTree(node.childNodes[n]);
            node.childNodes[n] = null;
        }
        myNumNodes--;
    }
    // Reduce tree
    function reduceTree() {
        const node = getReducible();
        node.leaf = true;
        myNumLeaves -= (node.numChildNodes - 1);
        for (let n=0; n<8; n++) {
            destroyTree(node.childNodes[n]);
            node.childNodes[n] = null;
        }
        let level = node.level;
        if (level < myReduceLevel) {
            myReduceLevel = level;
            myLeafLevel = level + 1;
        }
    }
    // Insert node into tree
    function insertNode(node,r,g,b,level) {
        if (!node) {
            if (level !== 0) {
                throw new Error("Expected a parent node at level " + level);
            }
            node = createNode(level);
            myTree = node ;
        }    
        node.numColors++;
        node.sum.R += r;
        node.sum.G += g;
        node.sum.B += b;
        if ((!node.leaf) && (level < myLeafLevel)) {
            const bit = 7 - level;
            let index = (testBit(r,bit) * 4) +
                        (testBit(g,bit) * 2) +
                        (testBit(b,bit));
            if (!node.childNodes[index]) {
                node.numChildNodes++;
                if (node.numChildNodes == 2) {
                    makeReducible(node, level);
                }
                node.childNodes[index] = createNode(level+1);
            }
            insertNode(node.childNodes[index], r, g, b, level+1);
        }
    }
    // Generate tree
    function generateTree(bmp) {
        myNumLeaves = 0;
        myNumNodes = 0;
        myMaxNodes = 0;
        myTree = null;
        clearReduceList();
        const w = bmp.width;
        const h = bmp.height;
        for (let y=0; y<h; y++) {
            let j = y * w;
            for (let x=0; x<w; x++) {
                let i = 4 * (j+x);
                let r = bmp.data[i];
                let g = bmp.data[i+1];
                let b = bmp.data[i+2];
                insertNode(myTree, r, g, b, 0);
                if (myNumLeaves > 255) {
                    reduceTree();
                }
            }
        }
    }
    // Run the logic and return the resulting palette
    return (function(bmp) {
        clearPalette();
        myColorIndex = 1;
        // If it's a canvas, grab ImageData from that
        if (bmp instanceof HTMLCanvasElement) {
            const w = bmp.width;
            const h = bmp.height;
            const ctx = bmp.getContext('2d');
            bmp = ctx.getImageData(0, 0, w, h);
        }
        generateTree(bmp);
        buildPalette(myTree);
        destroyTree(myTree);
        clearReduceList();
        return myPal;
    });
})();
