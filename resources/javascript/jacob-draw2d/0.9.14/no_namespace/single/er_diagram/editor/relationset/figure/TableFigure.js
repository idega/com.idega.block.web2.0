TableFigure=function(table){
if(!table){
return;
}
this.table=null;
this.header=null;
this.leftPort=null;
this.topPort=null;
this.rightPort=null;
this.bottomPort=null;
this.tableModel=table;
Node.call(this);
this.setResizeable(false);
};
TableFigure.prototype=new Node;
TableFigure.prototype.type="TableFigure";
TableFigure.prototype.createHTMLElement=function(){
var item=Node.prototype.createHTMLElement.call(this);
item.style.width="100px";
item.style.height="100px";
item.style.margin="0px";
item.style.padding="0px";
this.table=document.createElement("table");
this.table.style.fontSize="8pt";
this.table.style.margin="0px";
this.table.style.padding="0px";
this.table.cellPadding="0";
this.table.cellSpacing="0";
var row=this.table.insertRow(0);
this.header=row.insertCell(0);
this.header.innerHTML="Test";
this.header.colSpan="2";
this.header.style.background="transparent url(header.png) repeat-x";
this.header.style.height="25px";
this.header.style.paddingLeft="5px";
this.header.style.paddingRight="5px";
item.appendChild(this.table);
return item;
};
TableFigure.prototype.setWorkflow=function(_3ef6){
Node.prototype.setWorkflow.call(this,_3ef6);
if(_3ef6!=null){
this.setDimension(this.getWidth(),this.getHeight());
this.leftPort=new Port();
this.leftPort.setWorkflow(_3ef6);
this.addPort(this.leftPort,0,this.height/2);
this.topPort=new Port();
this.topPort.setWorkflow(_3ef6);
this.addPort(this.topPort,this.width/2,0);
this.rightPort=new Port();
this.rightPort.setWorkflow(_3ef6);
this.addPort(this.rightPort,this.width,this.height/2);
this.bottomPort=new Port();
this.bottomPort.setWorkflow(_3ef6);
this.addPort(this.bottomPort,this.width/2,this.height);
this.setTableName(this.tableModel.getName());
var _3ef7=this.tableModel.getFieldModels();
for(var i=0;i<_3ef7.getSize();i++){
this.addColumn(_3ef7.get(i).getExtendedDescriptionLabel());
}
}
};
TableFigure.prototype.setDimension=function(w,h){
Node.prototype.setDimension.call(this,w,h);
if(this.leftPort!=null){
this.leftPort.setPosition(0,this.height/2);
this.topPort.setPosition(this.width/2,0);
this.rightPort.setPosition(this.width,this.height/2);
this.bottomPort.setPosition(this.width/2,this.height);
}
};
TableFigure.prototype.setTableName=function(name){
this.header.innerHTML=name;
this.setDimension(this.getWidth(),this.getHeight());
};
TableFigure.prototype.getWidth=function(){
if(this.table==null){
return 10;
}
if(window.getComputedStyle){
return parseInt(getComputedStyle(this.table,"").getPropertyValue("width"));
}
return (this.table.clientWidth);
};
TableFigure.prototype.getHeight=function(){
if(this.table==null){
return 10;
}
if(window.getComputedStyle){
return parseInt(getComputedStyle(this.table,"").getPropertyValue("height"));
}
return (this.table.clientHeight);
};
TableFigure.prototype.addColumn=function(name){
var x=this.table.insertRow(this.table.rows.length);
var y=x.insertCell(0);
y.innerHTML=name;
y.style.backgroundColor="gray";
y.style.whiteSpace="nowrap";
y.style.padding="2px";
this.setDimension(this.getWidth(),this.getHeight());
};
