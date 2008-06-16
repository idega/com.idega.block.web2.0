ToolRedo=function(_3f56){
Button.call(this,_3f56);
};
ToolRedo.prototype=new Button;
ToolRedo.prototype.type="ToolRedo";
ToolRedo.prototype.execute=function(){
this.palette.workflow.getCommandStack().redo();
ToolGeneric.prototype.execute.call(this);
};
