GroupFigure=function(title){
if(title){
this.title=title;
}else{
this.title="";
}
this.titlebar=null;
this.defaultBackgroundColor=new Color(230,230,250);
this.highlightBackgroundColor=new Color(250,250,200);
CompartmentFigure.call(this);
this.setBackgroundColor(this.defaultBackgroundColor);
};
GroupFigure.prototype=new CompartmentFigure;
GroupFigure.prototype.type="GroupFigure";
GroupFigure.prototype.createHTMLElement=function(){
var item=CompartmentFigure.prototype.createHTMLElement.call(this);
item.style.margin="0px";
item.style.padding="0px";
item.style.border="1px solid black";
item.style.cursor=null;
this.titlebar=document.createElement("div");
this.titlebar.style.position="absolute";
this.titlebar.style.left="0px";
this.titlebar.style.top="0px";
this.titlebar.style.width=(this.getWidth()-5)+"px";
this.titlebar.style.height="15px";
this.titlebar.style.margin="0px";
this.titlebar.style.padding="0px";
this.titlebar.style.font="normal 10px verdana";
this.titlebar.style.backgroundColor="blue";
this.titlebar.style.borderBottom="1px solid gray";
this.titlebar.style.borderLeft="5px solid transparent";
this.titlebar.style.whiteSpace="nowrap";
this.titlebar.style.textAlign="left";
this.titlebar.style.backgroundImage="url(window_toolbar.png)";
this.textNode=document.createTextNode(this.title);
this.titlebar.appendChild(this.textNode);
item.appendChild(this.titlebar);
return item;
};
GroupFigure.prototype.onFigureEnter=function(_384b){
if(this.children[_384b.id]==null){
this.setBackgroundColor(this.highlightBackgroundColor);
}
CompartmentFigure.prototype.onFigureEnter.call(this,_384b);
};
GroupFigure.prototype.onFigureLeave=function(_384c){
CompartmentFigure.prototype.onFigureLeave.call(this,_384c);
this.setBackgroundColor(this.defaultBackgroundColor);
};
GroupFigure.prototype.onFigureDrop=function(_384d){
CompartmentFigure.prototype.onFigureDrop.call(this,_384d);
this.setBackgroundColor(this.defaultBackgroundColor);
};
GroupFigure.prototype.setDimension=function(w,h){
CompartmentFigure.prototype.setDimension.call(this,w,h);
if(this.titlebar!=null){
this.titlebar.style.width=(this.getWidth()-5)+"px";
}
};
GroupFigure.prototype.setTitle=function(title){
this.title=title;
};
GroupFigure.prototype.getMinWidth=function(){
return 50;
};
GroupFigure.prototype.getMinHeight=function(){
return 50;
};
GroupFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!=null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
