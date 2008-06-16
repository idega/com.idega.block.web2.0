ToolGroup=function(_4097){
ToolGeneric.call(this,_4097);
this.setTooltip("Form Group");
};
ToolGroup.prototype=new ToolGeneric;
ToolGroup.prototype.type="ToolGroup";
ToolGroup.prototype.execute=function(x,y){
var _409a=new GroupFigure();
_409a.setDimension(100,60);
this.palette.workflow.addFigure(_409a,x,y);
ToolGeneric.prototype.execute.call(this,x,y);
};
