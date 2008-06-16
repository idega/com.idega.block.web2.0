MyInputPort=function(_2e47){
InputPort.call(this,_2e47);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.type="MyInputPort";
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2e49=new CommandConnect(this.parentNode.workflow,port,this);
_2e49.setConnection(new DoubleclickConnection());
this.parentNode.workflow.getCommandStack().execute(_2e49);
}
};
