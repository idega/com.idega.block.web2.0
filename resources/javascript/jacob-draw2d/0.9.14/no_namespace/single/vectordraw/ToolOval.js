ToolOval=function(_31d7){
ToolGeneric.call(this,_31d7);
};
ToolOval.prototype=new ToolGeneric;
ToolOval.prototype.type="ToolOval";
ToolOval.prototype.execute=function(x,y){
var _31da=new Oval();
_31da.setDimension(100,60);
_31da.setBackgroundColor(new Color(255,255,255));
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_31da,x,y));
ToolGeneric.prototype.execute.call(this,x,y);
};
