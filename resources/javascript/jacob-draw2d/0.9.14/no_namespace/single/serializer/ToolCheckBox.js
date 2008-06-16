ToolCheckBox=function(_2c9e){
ToolGeneric.call(this,_2c9e);
};
ToolCheckBox.prototype=new ToolGeneric;
ToolCheckBox.prototype.type="ToolCheckBox";
ToolCheckBox.prototype.execute=function(x,y){
var _2ca1=new CheckBoxFigure();
_2ca1.setDimension(100,20);
this.palette.workflow.addFigure(_2ca1,x,y);
var _2ca2=this.palette.workflow.getBestCompartmentFigure(x,y);
if(_2ca2){
_2ca2.addChild(_2ca1);
}
ToolGeneric.prototype.execute.call(this,x,y);
};
