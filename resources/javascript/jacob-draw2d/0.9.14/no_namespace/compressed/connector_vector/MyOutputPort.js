/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyOutputPort=function(_11e8){OutputPort.call(this,_11e8);};MyOutputPort.prototype=new OutputPort;MyOutputPort.prototype.onDrop=function(port){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(this.parentNode.id==port.parentNode.id){}else{var _11ea=new CommandConnect(this.parentNode.workflow,this,port);_11ea.setConnection(new ArrowConnection());this.parentNode.workflow.getCommandStack().execute(_11ea);}};