ToolLine=function(_31c5){
ToolGeneric.call(this,_31c5);
};
ToolLine.prototype=new ToolGeneric;
ToolLine.prototype.type="ToolLine";
ToolLine.prototype.execute=function(x,y){
var _31c8=new Line();
_31c8.setStartPoint(x,y);
_31c8.setEndPoint(x+100,y+100);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_31c8));
ToolGeneric.prototype.execute.call(this,x,y);
};
