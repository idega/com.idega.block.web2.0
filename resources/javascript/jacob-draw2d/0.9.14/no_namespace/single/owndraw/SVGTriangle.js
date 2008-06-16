SVGTriangle=function(width,_31b1){
Figure.call(this);
if(width&&_31b1){
this.setDimension(width,_31b1);
}
};
SVGTriangle.prototype=new SVGFigure;
SVGTriangle.prototype.paint=function(){
this.context.clearRect(0,0,this.getWidth(),this.getHeight());
this.context.fillStyle="rgba(200,0,0,0.3)";
this.context.fillStyle="rgb(0,200,0)";
this.context.beginPath();
this.context.moveTo(this.width/2,0);
this.context.lineTo(this.width,this.height);
this.context.lineTo(0,this.height);
this.context.closePath();
this.context.stroke();
};
