ToolOvalUnfilled=function(_31c9){
ToolGeneric.call(this,_31c9);
};
ToolOvalUnfilled.prototype=new ToolGeneric;
ToolOvalUnfilled.prototype.type="ToolOvalUnfilled";
ToolOvalUnfilled.prototype.execute=function(x,y){
var _31cc=new Oval();
_31cc.setDimension(100,60);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_31cc,x,y));
ToolGeneric.prototype.execute.call(this,x,y);
};
