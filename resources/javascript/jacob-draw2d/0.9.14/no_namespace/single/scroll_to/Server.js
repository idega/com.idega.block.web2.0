Server=function(pkey,ip,state){
this.label=new Label(ip);
this.label.setCanDrag(false);
this.label.setSelectable(false);
this.label.setBackgroundColor(new Color(255,255,255));
this.label.setBorder(new LineBorder());
this.req==null;
this.pkey=pkey;
this.ip=ip;
this.state=state;
if(this.state=="up"){
ImageFigure.call(this,"Server_up.png");
}else{
ImageFigure.call(this,"Server_down.png");
}
this.setDimension(54,60);
};
Server.prototype=new ImageFigure;
Server.prototype.type="Server";
Server.prototype.dispose=function(){
overviewWindow.removeServer(this);
this.workflow.removeFigure(this.label);
ImageFigure.prototype.dispose.call(this);
};
Server.prototype.isReachable=function(){
return this.state=="up";
};
Server.prototype.createHTMLElement=function(){
var item=ImageFigure.prototype.createHTMLElement.call(this);
item.style.width=this.width+"px";
item.style.height=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.border="0px";
return item;
};
Server.prototype.setWorkflow=function(_2ca7){
ImageFigure.prototype.setWorkflow.call(this,_2ca7);
if(_2ca7==null){
return;
}
_2ca7.addFigure(this.label,this.x-20,this.y-10);
};
Server.prototype.onDragend=function(){
ImageFigure.prototype.onDragend.call(this);
};
Server.prototype.onDoubleClick=function(){
var value=prompt("Server IP:",this.ip);
if(value==null){
return;
}
this.ip=value;
this.updateLabel();
};
Server.prototype.onDrag=function(){
ImageFigure.prototype.onDrag.call(this);
this.updateLabel();
};
Server.prototype.setPosition=function(xPos,yPos){
ImageFigure.prototype.setPosition.call(this,xPos,yPos);
this.updateLabel();
};
Server.prototype.updateLabel=function(){
this.label.setText(this.ip);
var xpos=this.getX()+(this.getWidth()/2)-(this.label.getWidth()/2);
this.label.setPosition(xpos,this.y-this.label.getHeight()-3);
};
