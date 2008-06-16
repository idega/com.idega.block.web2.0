ToolFormButton=function(_2e4a){
ToolGeneric.call(this,_2e4a);
};
ToolFormButton.prototype=new ToolGeneric;
ToolFormButton.prototype.type="ToolFormButton";
ToolFormButton.prototype.execute=function(x,y){
var _2e4d=new ButtonFigure();
_2e4d.setDimension(100,20);
var _2e4e=this.palette.workflow.getBestCompartmentFigure(x,y);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_2e4d,x,y,_2e4e));
ToolGeneric.prototype.execute.call(this,x,y);
};
