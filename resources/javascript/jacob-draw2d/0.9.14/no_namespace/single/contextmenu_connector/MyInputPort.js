MyInputPort=function(_30ae){
InputPort.call(this,_30ae);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.type="MyInputPort";
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _30b0=new CommandConnect(this.parentNode.workflow,port,this);
_30b0.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_30b0);
}
};
