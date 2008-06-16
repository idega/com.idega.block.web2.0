MyWorkflow=function(id){
Workflow.call(this,id);
};
MyWorkflow.prototype=new Workflow;
MyWorkflow.prototype.type="MyWorkflow";
MyWorkflow.prototype.getContextMenu=function(){
var menu=new Menu();
var oThis=this;
menu.appendMenuItem(new MenuItem("Grid 10x10",null,function(x,y){
oThis.setGridWidth(10,10);
oThis.setBackgroundImage("grid_10.png",true);
}));
menu.appendMenuItem(new MenuItem("Grid 20x20",null,function(x,y){
oThis.setGridWidth(20,20);
oThis.setBackgroundImage("grid_20.png",true);
}));
menu.appendMenuItem(new MenuItem("Add Circle",null,function(x,y){
oThis.addFigure(new Circle(30),x,y);
}));
return menu;
};
