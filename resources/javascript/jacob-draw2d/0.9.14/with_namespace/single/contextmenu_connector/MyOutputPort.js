draw2d.MyOutputPort=function(_5310){draw2d.OutputPort.call(this,_5310);};draw2d.MyOutputPort.prototype=new draw2d.OutputPort;draw2d.MyOutputPort.prototype.type="MyOutputPort";draw2d.MyOutputPort.prototype.onDrop=function(port){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(this.parentNode.id==port.parentNode.id){}else{var _5312=new draw2d.CommandConnect(this.parentNode.workflow,this,port);_5312.setConnection(new draw2d.ContextmenuConnection());this.parentNode.workflow.getCommandStack().execute(_5312);}};