ToolRedo=function(_3e6e){
Button.call(this,_3e6e);
};
ToolRedo.prototype=new Button;
ToolRedo.prototype.type="ToolRedo";
ToolRedo.prototype.execute=function(){
this.palette.workflow.getCommandStack().redo();
ToolGeneric.prototype.execute.call(this);
};
