MyOutputPort=function(_2c97){
OutputPort.call(this,_2c97);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2c99=new CommandConnect(this.parentNode.workflow,this,port);
_2c99.setConnection(new DecoratedConnection());
this.parentNode.workflow.getCommandStack().execute(_2c99);
}
};
