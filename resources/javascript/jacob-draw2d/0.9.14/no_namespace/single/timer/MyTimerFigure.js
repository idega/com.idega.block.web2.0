MyTimerFigure=function(delay){
Rectangle.call(this);
this.setDimension(50,50);
this.setBackgroundColor(new Color(220,255,255));
var oThis=this;
var func=function(){
oThis.toggle();
};
this.timer=window.setInterval(func,delay);
this.highlight=false;
};
MyTimerFigure.prototype=new Rectangle;
MyTimerFigure.prototype.type="MyTimerFigure";
MyTimerFigure.prototype.dispose=function(){
Rectangle.prototype.dispose.call(this);
window.clearInterval(this.timer);
};
MyTimerFigure.prototype.toggle=function(){
if(this.highlight){
this.setBackgroundColor(new Color(245,115,115));
}else{
this.setBackgroundColor(new Color(115,245,115));
}
this.highlight=!this.highlight;
};
