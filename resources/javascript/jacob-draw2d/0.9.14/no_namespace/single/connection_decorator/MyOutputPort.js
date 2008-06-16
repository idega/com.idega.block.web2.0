MyOutputPort=function(_406e){
OutputPort.call(this,_406e);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.type="MyOutputPort";
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _4070=new CommandConnect(this.parentNode.workflow,this,port);
_4070.setConnection(new DecoratedConnection());
this.parentNode.workflow.getCommandStack().execute(_4070);
}
};
