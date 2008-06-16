ButtonFigure=function(title){
if(title){
this.title=title;
}else{
this.title="Button ";
}
Figure.call(this);
};
ButtonFigure.prototype=new Figure;
ButtonFigure.prototype.type="ButtonFigure";
ButtonFigure.prototype.createHTMLElement=function(){
var item=document.createElement("input");
item.id=this.id;
item.type="button";
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.zIndex=""+Figure.ZOrderBaseIndex;
item.value=this.title;
return item;
};
