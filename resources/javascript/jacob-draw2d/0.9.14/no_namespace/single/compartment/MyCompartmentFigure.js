MyCompartmentFigure=function(){
CompartmentFigure.call(this);
this.defaultColor=new Color(230,230,250);
this.setBackgroundColor(this.defaultColor);
};
MyCompartmentFigure.prototype=new CompartmentFigure;
MyCompartmentFigure.prototype.onFigureLeave=function(_31aa){
CompartmentFigure.prototype.onFigureLeave.call(this,_31aa);
if(_31aa instanceof CompartmentFigure){
_31aa.setBackgroundColor(_31aa.defaultColor);
}
};
MyCompartmentFigure.prototype.onFigureDrop=function(_31ab){
CompartmentFigure.prototype.onFigureDrop.call(this,_31ab);
if(_31ab instanceof CompartmentFigure){
_31ab.setBackgroundColor(this.getBackgroundColor().darker(0.1));
}
};
MyCompartmentFigure.prototype.setBackgroundColor=function(color){
CompartmentFigure.prototype.setBackgroundColor.call(this,color);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
if(child instanceof CompartmentFigure){
child.setBackgroundColor(this.getBackgroundColor().darker(0.1));
}
}
};
