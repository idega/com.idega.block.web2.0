var tree;
var nodes = new Array();
var nodeIndex;
treeInit();

function treeInit() {
    buildRandomTextNodeTree();
}

function buildRandomTextNodeTree() {
    tree = new YAHOO.widget.TreeView(widget.uuid);

    for (var i = 0; i < Math.floor((Math.random()*4) + 3); i++) {
        var tmpNode = new YAHOO.widget.TextNode("label-" + i, tree.getRoot(), false);
        buildLargeBranch(tmpNode);
    }
    tree.draw();
}

var callback = null;

function buildLargeBranch(node) {
    if (node.depth < 10) {
        for ( var i = 0; i < 10; i++ ) {
            new YAHOO.widget.TextNode(node.label + "-" + i, node, false);
        }
    }
}

function buildRandomTextBranch(node) {
    if (node.depth < 10) {
        for ( var i = 0; i < Math.floor(Math.random() * 4) ; i++ ) {
            var tmpNode = new YAHOO.widget.TextNode(node.label + "-" + i, node, false);
            buildRandomTextBranch(tmpNode);
        }
    }
}
    
// add to the instance map for later refernece
jmaki.attributes.put(widget.uuid, tree);