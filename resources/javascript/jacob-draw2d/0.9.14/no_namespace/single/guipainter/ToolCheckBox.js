ToolCheckBox=function(_3504){
ToolGeneric.call(this,_3504);
};
ToolCheckBox.prototype=new ToolGeneric;
ToolCheckBox.prototype.type="ToolCheckBox";
ToolCheckBox.prototype.execute=function(x,y){
var _3507=new CheckBoxFigure();
_3507.setDimension(100,20);
var _3508=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_3507,x,y,_3508));
ToolGeneric.prototype.execute.call(this,x,y);
};
