MyInputPort=function(_3f00){
InputPort.call(this,_3f00);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.type="MyInputPort";
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3f02=new CommandConnect(this.parentNode.workflow,port,this);
_3f02.setConnection(new DecoratedConnection());
this.parentNode.workflow.getCommandStack().execute(_3f02);
}
};
