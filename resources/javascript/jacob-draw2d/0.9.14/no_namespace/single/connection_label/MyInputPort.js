MyInputPort=function(_3a8e){
InputPort.call(this,_3a8e);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.type="MyInputPort";
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3a90=new CommandConnect(this.parentNode.workflow,port,this);
_3a90.setConnection(new DoubleclickConnection());
this.parentNode.workflow.getCommandStack().execute(_3a90);
}
};
