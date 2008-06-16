ToolInputBox=function(_3844){
ToolGeneric.call(this,_3844);
};
ToolInputBox.prototype=new ToolGeneric;
ToolInputBox.prototype.type="ToolInputBox";
ToolInputBox.prototype.execute=function(x,y){
var _3847=new InputBoxFigure();
_3847.setDimension(100,20);
this.palette.workflow.addFigure(_3847,x,y);
var _3848=this.palette.workflow.getBestCompartmentFigure(x,y);
if(_3848){
_3848.addChild(_3847);
}
ToolGeneric.prototype.execute.call(this,x,y);
};
