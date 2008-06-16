InputBoxFigure=function(title){
if(title){
this.title=title;
}else{
this.title="";
}
Figure.call(this);
};
InputBoxFigure.prototype=new Figure;
InputBoxFigure.prototype.type="InputBoxFigure";
InputBoxFigure.prototype.createHTMLElement=function(){
var item=Figure.prototype.createHTMLElement.call(this);
item.style.margin="0px";
item.style.padding="0px";
this.ui_element=document.createElement("div");
this.ui_element.style.position="absolute";
this.ui_element.style.left="0px";
this.ui_element.style.top="0px";
this.ui_element.style.cursor="move";
this.ui_element.style.borderStyle="inset";
item.appendChild(this.ui_element);
return item;
};
InputBoxFigure.prototype.setDimension=function(w,h){
Figure.prototype.setDimension.call(this,w,20);
if(this.ui_element!=null){
this.ui_element.style.width=(this.getWidth()-4)+"px";
this.ui_element.style.height=(this.getHeight()-4)+"px";
}
};
InputBoxFigure.prototype.getMinWidth=function(){
return 50;
};
