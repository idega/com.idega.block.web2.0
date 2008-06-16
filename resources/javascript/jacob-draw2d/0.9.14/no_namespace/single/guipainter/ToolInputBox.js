ToolInputBox=function(_3a2b){
ToolGeneric.call(this,_3a2b);
};
ToolInputBox.prototype=new ToolGeneric;
ToolInputBox.prototype.type="ToolInputBox";
ToolInputBox.prototype.execute=function(x,y){
var _3a2e=new InputBoxFigure();
_3a2e.setDimension(100,20);
var _3a2f=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_3a2e,x,y,_3a2f));
ToolGeneric.prototype.execute.call(this,x,y);
};
