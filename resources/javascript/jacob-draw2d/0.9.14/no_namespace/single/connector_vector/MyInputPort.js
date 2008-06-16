MyInputPort=function(_3a30){
InputPort.call(this,_3a30);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3a32=new CommandConnect(this.parentNode.workflow,port,this);
_3a32.setConnection(new ArrowConnection());
this.parentNode.workflow.getCommandStack().execute(_3a32);
}
};
