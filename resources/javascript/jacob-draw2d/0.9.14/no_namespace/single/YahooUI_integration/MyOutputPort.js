MyOutputPort=function(_32c8){
OutputPort.call(this,_32c8);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.type="MyOutputPort";
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _32ca=new CommandConnect(this.parentNode.workflow,this,port);
_32ca.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_32ca);
}
};
