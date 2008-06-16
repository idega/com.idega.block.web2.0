OverviewWindow=function(name){
Window.call(this,"Overview Window");
this.setDimension(180,150);
this.servers=new Object();
this.name=name;
};
OverviewWindow.prototype=new Window;
OverviewWindow.prototype.type="OverviewWindow";
OverviewWindow.prototype.createHTMLElement=function(){
var item=Window.prototype.createHTMLElement.call(this);
this.inputDiv=document.createElement("div");
this.inputDiv.style.position="absolute";
this.inputDiv.style.left="10px";
this.inputDiv.style.top="20px";
this.inputDiv.style.overflow="auto";
this.inputDiv.style.border="1px solid black";
this.inputDiv.style.font="normal 10px verdana";
item.appendChild(this.inputDiv);
return item;
};
OverviewWindow.prototype.setDimension=function(w,h){
Window.prototype.setDimension.call(this,w,h);
if(this.inputDiv!=null){
this.inputDiv.style.height=(h-30)+"px";
this.inputDiv.style.width=(w-20)+"px";
}
};
OverviewWindow.prototype.addServer=function(_3a57){
this.servers[_3a57.id]=_3a57;
this.createList();
};
OverviewWindow.prototype.removeServer=function(_3a58){
this.servers[_3a58.id]=null;
this.createList();
};
OverviewWindow.prototype.createList=function(){
this.inputDiv.innerHTML="";
var list=document.createElement("ul");
for(key in this.servers){
var _3a5a=this.servers[key];
if(_3a5a!=null){
var li=document.createElement("li");
var a=document.createElement("a");
a.href="javascript:OverviewWindow.scrollTo('"+_3a5a.id+"')";
a.innerHTML=_3a5a.ip;
li.appendChild(a);
if(_3a5a.isReachable()){
a.style.color="green";
}else{
a.style.color="red";
a.style.fontWeight="bold";
}
list.appendChild(li);
}
}
this.inputDiv.appendChild(list);
};
OverviewWindow.scrollTo=function(id){
var _3a5e=workflow.getFigure(id);
workflow.scrollTo(_3a5e.getX()-OverviewWindow.screenWidth()/2,_3a5e.getY()-OverviewWindow.screenHeight()/2);
};
OverviewWindow.prototype.onDragend=function(){
Window.prototype.onDragend.call(this);
};
OverviewWindow.screenWidth=function(){
var _3a5f=0;
if(typeof (window.innerWidth)=="number"){
_3a5f=window.innerWidth;
}else{
if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
_3a5f=document.documentElement.clientWidth;
}else{
if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
_3a5f=document.body.clientWidth;
}
}
}
return _3a5f;
};
OverviewWindow.screenHeight=function(){
var _3a60=0;
if(typeof (window.innerWidth)=="number"){
_3a60=window.innerHeight;
}else{
if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
_3a60=document.documentElement.clientHeight;
}else{
if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
_3a60=document.body.clientHeight;
}
}
}
return _3a60;
};
