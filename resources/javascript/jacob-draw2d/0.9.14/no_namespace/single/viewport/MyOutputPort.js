MyOutputPort=function(_31c2){
OutputPort.call(this,_31c2);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.type="MyOutputPort";
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _31c4=new CommandConnect(this.parentNode.workflow,this,port);
_31c4.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_31c4);
}
};
