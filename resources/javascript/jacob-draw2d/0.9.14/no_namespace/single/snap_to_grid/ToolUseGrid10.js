ToolUseGrid10=function(_2e22){
ToggleButton.call(this,_2e22);
};
ToolUseGrid10.prototype=new ToggleButton;
ToolUseGrid10.prototype.type="ToolUseGrid10";
ToolUseGrid10.prototype.execute=function(){
if(this.isDown()){
this.getToolPalette().getWorkflow().setBackgroundImage("grid_10.png",true);
}else{
this.getToolPalette().getWorkflow().setBackgroundImage(null,false);
}
this.getToolPalette().getWorkflow().setGridWidth(10,10);
this.getToolPalette().getWorkflow().setSnapToGrid(this.isDown());
this.getToolPalette().tool2.setActive(false);
};
