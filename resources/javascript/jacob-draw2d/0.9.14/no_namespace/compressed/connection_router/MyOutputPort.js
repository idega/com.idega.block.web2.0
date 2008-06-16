/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyOutputPort=function(_dfb){OutputPort.call(this,_dfb);};MyOutputPort.prototype=new OutputPort;MyOutputPort.prototype.type="MyOutputPort";MyOutputPort.prototype.onDrop=function(port){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(this.parentNode.id==port.parentNode.id){}else{var _dfd=new CommandConnect(this.parentNode.workflow,this,port);_dfd.setConnection(new ContextmenuConnection());this.parentNode.workflow.getCommandStack().execute(_dfd);}};