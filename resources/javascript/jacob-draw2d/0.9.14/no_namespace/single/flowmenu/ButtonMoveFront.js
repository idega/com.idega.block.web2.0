ButtonMoveFront=function(_3e22){
Button.call(this,_3e22,16,16);
};
ButtonMoveFront.prototype=new Button;
ButtonMoveFront.prototype.type="ButtonMoveFront";
ButtonMoveFront.prototype.execute=function(){
this.palette.workflow.moveFront(this.palette.workflow.getCurrentSelection());
ToolGeneric.prototype.execute.call(this);
};
