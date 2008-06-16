SelectionHighlighter=function(_3a47){
this.workflow=_3a47;
this.counter=0;
this.black=new Color(0,0,0);
this.gray=new Color(200,200,200);
};
SelectionHighlighter.prototype.type="SelectionHighlighter";
SelectionHighlighter.prototype.onSelectionChanged=function(_3a48){
this.counter++;
debugLabel.setText("Count:"+this.counter);
var alpha=(_3a48==null)?1:0.2;
var color=(_3a48==null)?this.black:this.gray;
var doc=this.workflow.getDocument();
var _3a4c=doc.getFigures();
for(var i=0;i<_3a4c.getSize();i++){
_3a4c.get(i).setAlpha(alpha);
}
var lines=doc.getLines();
for(var i=0;i<lines.getSize();i++){
lines.get(i).setColor(color);
}
if(_3a48!=null){
_3a48.setAlpha(1);
if(_3a48 instanceof Node){
var ports=_3a48.getPorts();
for(var i=0;i<ports.getSize();i++){
var port=ports.get(i);
var _3a51=port.getConnections();
for(var j=0;j<_3a51.getSize();j++){
_3a51.get(j).setColor(this.black);
}
}
}
}
};
