MyInputPort=function(_385b){
InputPort.call(this,_385b);
};
MyInputPort.prototype=new InputPort;
MyInputPort.prototype.type="MyInputPort";
MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _385d=new CommandConnect(this.parentNode.workflow,port,this);
_385d.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_385d);
}
};
