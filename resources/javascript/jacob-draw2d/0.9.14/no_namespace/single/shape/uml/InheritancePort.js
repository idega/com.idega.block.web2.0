shape.uml.InheritancePort=function(){
Port.call(this,new Rectangle());
this.setBackgroundColor(new Color(255,255,190));
};
shape.uml.InheritancePort.prototype=new Port;
shape.uml.InheritancePort.prototype.type="shape.uml.InheritancePort";
shape.uml.InheritancePort.prototype.onDrop=function(port){
if(this.parentNode.id==port.parentNode.id){
}else{
var _4093=new CommandConnect(this.parentNode.workflow,this,port);
_4093.setConnection(new shape.uml.InheritanceConnection());
this.parentNode.workflow.getCommandStack().execute(_4093);
}
};
