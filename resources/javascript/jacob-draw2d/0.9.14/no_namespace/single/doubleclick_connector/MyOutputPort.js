MyOutputPort=function(_2d2c){
OutputPort.call(this,_2d2c);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2d2e=new CommandConnect(this.parentNode.workflow,this,port);
_2d2e.setConnection(new DoubleclickConnection());
this.parentNode.workflow.getCommandStack().execute(_2d2e);
}
};
