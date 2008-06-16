MyInputPort=function(_3e4f){
InputPort.call(this,_3e4f);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.type="MyInputPort";
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3e51=new CommandConnect(this.parentNode.workflow,port,this);
_3e51.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_3e51);
}
};
