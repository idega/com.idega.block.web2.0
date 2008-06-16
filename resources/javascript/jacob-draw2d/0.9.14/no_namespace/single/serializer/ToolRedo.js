ToolRedo=function(_2e5d){
Button.call(this,_2e5d);
};
ToolRedo.prototype=new Button;
ToolRedo.prototype.type="ToolRedo";
ToolRedo.prototype.execute=function(){
this.palette.workflow.getCommandStack().redo();
ToolGeneric.prototype.execute.call(this);
};
