MyOutputPort=function(_3a91){
OutputPort.call(this,_3a91);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.type="MyOutputPort";
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _3a93=new CommandConnect(this.parentNode.workflow,this,port);
_3a93.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_3a93);
}
};
