MyDoubleClickFigure=function(){
Rectangle.call(this);
this.setDimension(50,50);
this.setBackgroundColor(new Color(220,255,255));
};
MyDoubleClickFigure.prototype=new Rectangle;
MyDoubleClickFigure.prototype.type="MyDoubleClickFigure";
MyDoubleClickFigure.prototype.onDoubleClick=function(){
var w=parseInt(prompt("Enter border line width",this.getLineWidth()));
if(w>0){
this.setLineWidth(w);
}
};
