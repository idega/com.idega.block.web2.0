/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyInputPort=function(_418){InputPort.call(this,_418);};MyInputPort.prototype=new InputPort;MyInputPort.prototype.type="MyInputPort";MyInputPort.prototype.onDrop=function(port){if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){return;}if(this.parentNode.id==port.parentNode.id){}else{var _41a=new CommandConnect(this.parentNode.workflow,port,this);_41a.setConnection(new ContextmenuConnection());this.parentNode.workflow.getCommandStack().execute(_41a);}};