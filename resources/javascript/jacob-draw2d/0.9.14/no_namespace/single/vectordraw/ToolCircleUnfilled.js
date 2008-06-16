ToolCircleUnfilled=function(_2d20){
ToolGeneric.call(this,_2d20);
};
ToolCircleUnfilled.prototype=new ToolGeneric;
ToolCircleUnfilled.prototype.type="ToolCircleUnfilled";
ToolCircleUnfilled.prototype.execute=function(x,y){
var _2d23=new Circle();
_2d23.setDimension(100,100);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_2d23,x,y));
ToolGeneric.prototype.execute.call(this,x,y);
};
