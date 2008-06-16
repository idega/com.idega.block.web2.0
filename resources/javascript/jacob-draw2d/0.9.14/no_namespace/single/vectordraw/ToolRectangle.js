ToolRectangle=function(_3f26){
ToolGeneric.call(this,_3f26);
};
ToolRectangle.prototype=new ToolGeneric;
ToolRectangle.prototype.type="ToolRectangle";
ToolRectangle.prototype.execute=function(x,y){
var _3f29=new Rectangle();
_3f29.setDimension(100,60);
_3f29.setBackgroundColor(new Color(255,255,255));
this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_3f29,x,y));
ToolGeneric.prototype.execute.call(this,x,y);
};
