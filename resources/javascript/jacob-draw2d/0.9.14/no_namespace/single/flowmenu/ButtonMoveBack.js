ButtonMoveBack=function(_4091){
Button.call(this,_4091,16,16);
};
ButtonMoveBack.prototype=new Button;
ButtonMoveBack.prototype.type="ButtonMoveBack";
ButtonMoveBack.prototype.execute=function(){
this.palette.workflow.moveBack(this.palette.workflow.getCurrentSelection());
ToolGeneric.prototype.execute.call(this);
};
