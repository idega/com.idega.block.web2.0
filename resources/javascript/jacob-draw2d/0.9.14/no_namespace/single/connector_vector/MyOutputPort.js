MyOutputPort=function(_3e7e){
OutputPort.call(this,_3e7e);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3e80=new CommandConnect(this.parentNode.workflow,this,port);
_3e80.setConnection(new ArrowConnection());
this.parentNode.workflow.getCommandStack().execute(_3e80);
}
};
