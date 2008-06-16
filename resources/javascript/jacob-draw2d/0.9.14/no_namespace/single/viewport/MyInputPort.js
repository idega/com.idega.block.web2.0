MyInputPort=function(_358e){
InputPort.call(this,_358e);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.type="MyInputPort";
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3590=new CommandConnect(this.parentNode.workflow,port,this);
_3590.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_3590);
}
};
