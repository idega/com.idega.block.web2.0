TableAliasFigure=function(alias){
TableFigure.call(this,alias.getTableModel());
this.alias=alias;
};
TableAliasFigure.prototype=new TableFigure;
TableAliasFigure.prototype.type="TableAliasFigure";
TableAliasFigure.prototype.createHTMLElement=function(){
var item=TableFigure.prototype.createHTMLElement.call(this);
var row=this.table.insertRow(1);
this.based=row.insertCell(0);
this.based.innerHTML="Test";
this.based.colSpan="2";
this.based.style.background="transparent url(header.png) repeat-x";
this.based.style.height="25px";
this.based.style.paddingLeft="5px";
this.based.style.paddingRight="5px";
this.based.style.whiteSpace="nowrap";
this.based.style.fontStyle="italic";
this.based.style.color="rgb(100,100,100)";
return item;
};
TableAliasFigure.prototype.setTableName=function(name){
this.header.innerHTML=this.alias.getName();
this.based.innerHTML="based on &lt;"+name+"&gt;";
this.setDimension(this.getWidth(),this.getHeight());
};
