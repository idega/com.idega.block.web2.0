MyOutputPort=function(_2d25){
OutputPort.call(this,_2d25);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2d27=new CommandConnect(this.parentNode.workflow,this,port);
_2d27.setConnection(new DoubleclickConnection());
this.parentNode.workflow.getCommandStack().execute(_2d27);
}
};
