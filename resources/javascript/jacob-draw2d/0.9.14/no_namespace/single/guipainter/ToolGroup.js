ToolGroup=function(_3a18){
ToolGeneric.call(this,_3a18);
this.setTooltip("Form Group");
};
ToolGroup.prototype=new ToolGeneric;
ToolGroup.prototype.type="ToolGroup";
ToolGroup.prototype.execute=function(x,y){
var _3a1b=new GroupFigure();
_3a1b.setDimension(100,60);
var _3a1c=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_3a1b,x,y,_3a1c));
ToolGeneric.prototype.execute.call(this,x,y);
};
