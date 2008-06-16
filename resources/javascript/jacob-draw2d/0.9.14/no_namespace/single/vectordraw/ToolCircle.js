ToolCircle=function(_4111){
ToolGeneric.call(this,_4111);
};
ToolCircle.prototype=new ToolGeneric;
ToolCircle.prototype.type="ToolCircle";
ToolCircle.prototype.execute=function(x,y){
var _4114=new Circle();
_4114.setDimension(100,100);
_4114.setBackgroundColor(new Color(255,255,255));
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_4114,x,y));
ToolGeneric.prototype.execute.call(this,x,y);
};
