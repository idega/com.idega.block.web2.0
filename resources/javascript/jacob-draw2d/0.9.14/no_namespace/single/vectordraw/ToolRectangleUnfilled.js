ToolRectangleUnfilled=function(_31dc){
ToolGeneric.call(this,_31dc);
};
ToolRectangleUnfilled.prototype=new ToolGeneric;
ToolRectangleUnfilled.prototype.type="ToolRectangleUnfilled";
ToolRectangleUnfilled.prototype.execute=function(x,y){
var _31df=new Rectangle();
_31df.setDimension(100,60);
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_31df,x,y));
ToolGeneric.prototype.execute.call(this,x,y);
};
