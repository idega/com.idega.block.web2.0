ToolUseGeometry=function(_408e){
ToggleButton.call(this,_408e);
};
ToolUseGeometry.prototype=new ToggleButton;
ToolUseGeometry.prototype.type="ToolUseGeometry";
ToolUseGeometry.prototype.execute=function(){
this.getToolPalette().getWorkflow().setSnapToGeometry(this.isDown());
};
