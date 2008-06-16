shape.uml.Class=function(_3f42){
Node.call(this);
this.outputPort1=null;
this.outputPort2=null;
this.setDimension(50,50);
this.setResizeable(false);
this.setClassName(_3f42);
};
shape.uml.Class.prototype=new Node;
shape.uml.Class.prototype.type="shape.uml.Class";
shape.uml.Class.prototype.setWorkflow=function(_3f43){
Node.prototype.setWorkflow.call(this,_3f43);
if(_3f43!=null&&this.portTop==null){
this.portTop=new shape.uml.InheritancePort();
this.portTop.setWorkflow(_3f43);
this.addPort(this.portTop,0,0);
this.portRight=new shape.uml.InheritancePort();
this.portRight.setWorkflow(_3f43);
this.addPort(this.portRight,0,0);
this.portBottom=new shape.uml.InheritancePort();
this.portBottom.setWorkflow(_3f43);
this.addPort(this.portBottom,0,0);
this.portLeft=new shape.uml.InheritancePort();
this.portLeft.setWorkflow(_3f43);
this.addPort(this.portLeft,0,0);
this.recalculateSize();
}
};
shape.uml.Class.prototype.setClassName=function(name){
this.headerLabel.innerHTML=name;
this.recalculateSize();
};
shape.uml.Class.prototype.addAttribute=function(name,type,_3f47){
var row=document.createElement("tr");
this.table.appendChild(row);
var td=document.createElement("td");
td.style.whiteSpace="nowrap";
row.appendChild(td);
if(_3f47){
td.innerHTML=name+" : "+type+" = "+_3f47;
}else{
td.innerHTML=name+" : "+type;
}
this.recalculateSize();
};
shape.uml.Class.prototype.setDimension=function(w,h){
Node.prototype.setDimension.call(this,w,h);
if(this.portTop!=null){
this.portTop.setPosition(this.width/2,0);
this.portRight.setPosition(this.width,this.height/2);
this.portBottom.setPosition(this.width/2,this.height);
this.portLeft.setPosition(0,this.height/2);
}
};
shape.uml.Class.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.outline="none";
item.style.border="1px solid black";
item.style.zIndex=""+Figure.ZOrderBaseIndex;
item.style.backgroundColor="rgb(255,255,206)";
this.table=document.createElement("table");
this.table.style.width="100%";
this.table.style.height="100%";
this.table.style.margin="0px";
this.table.style.padding="0px";
item.appendChild(this.table);
var _3f4d=document.createElement("tbody");
this.table.appendChild(_3f4d);
var _3f4e=document.createElement("tr");
_3f4d.appendChild(_3f4e);
this.headerLabel=document.createElement("td");
this.headerLabel.style.align="left";
this.headerLabel.style.verticalAlign="top";
this.headerLabel.style.borderBottom="1px solid black";
this.headerLabel.style.fontWeight="bold";
this.headerLabel.style.textAlign="center";
_3f4e.appendChild(this.headerLabel);
this.headerLabel.innerHTML="";
return item;
};
shape.uml.Class.prototype.recalculateSize=function(name){
this.setDimension(this.getWidth(),this.getHeight());
};
shape.uml.Class.prototype.getWidth=function(){
if(this.workflow==null){
return 10;
}
if(this.table.xgetBoundingClientRect){
return this.table.getBoundingClientRect().right-this.table.getBoundingClientRect().left;
}else{
if(document.getBoxObjectFor){
return document.getBoxObjectFor(this.table).width;
}else{
return this.table.offsetWidth;
}
}
};
shape.uml.Class.prototype.getHeight=function(){
if(this.workflow==null){
return 10;
}
if(this.table.xgetBoundingClientRect){
return this.table.getBoundingClientRect().bottom-this.table.getBoundingClientRect().top;
}else{
if(document.getBoxObjectFor){
return document.getBoxObjectFor(this.table).height;
}else{
return this.table.offsetHeight;
}
}
};
