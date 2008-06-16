MyInputPort=function(_3267){
InputPort.call(this,_3267);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3269=new CommandConnect(this.parentNode.workflow,port,this);
_3269.setConnection(new DecoratedConnection());
this.parentNode.workflow.getCommandStack().execute(_3269);
}
};
