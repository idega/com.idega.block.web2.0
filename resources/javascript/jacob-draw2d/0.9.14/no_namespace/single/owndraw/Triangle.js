Triangle=function(width,_30ab){
VectorFigure.call(this);
if(width&&_30ab){
this.setDimension(width,_30ab);
}
};
Triangle.prototype=new VectorFigure;
Triangle.prototype.paint=function(){
VectorFigure.prototype.paint.call(this);
var x=new Array(this.getWidth()/2,this.getWidth(),0);
var y=new Array(0,this.getHeight(),this.getHeight());
this.graphics.setStroke(this.stroke);
if(this.bgColor!=null){
this.graphics.setColor(this.bgColor.getHTMLStyle());
this.graphics.fillPolygon(x,y);
}
if(this.lineColor!=null){
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.graphics.drawPolygon(x,y);
}
this.graphics.paint();
};
