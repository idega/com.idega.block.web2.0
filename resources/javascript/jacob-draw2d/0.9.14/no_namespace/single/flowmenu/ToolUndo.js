ToolUndo=function(_39e4){
Button.call(this,_39e4);
};
ToolUndo.prototype=new Button;
ToolUndo.prototype.type="ToolUndo";
ToolUndo.prototype.execute=function(){
this.palette.workflow.getCommandStack().undo();
ToolGeneric.prototype.execute.call(this);
};
