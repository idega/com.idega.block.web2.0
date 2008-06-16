ButtonDelete=function(_30a9){
Button.call(this,_30a9,16,16);
};
ButtonDelete.prototype=new Button;
ButtonDelete.prototype.type="ButtonDelete";
ButtonDelete.prototype.execute=function(){
this.palette.workflow.getCommandStack().execute(new CommandDelete(this.palette.workflow.getCurrentSelection()));
ToolGeneric.prototype.execute.call(this);
};
