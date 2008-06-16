/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyInputPort=function(_1ead){draw2d.InputPort.call(this,_1ead);};draw2d.MyInputPort.prototype=new draw2d.InputPort;draw2d.MyInputPort.prototype.type="MyInputPort";draw2d.MyInputPort.prototype.onDrop=function(port){if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){return;}if(this.parentNode.id==port.parentNode.id){}else{var _1eaf=new draw2d.CommandConnect(this.parentNode.workflow,port,this);_1eaf.setConnection(new draw2d.ContextmenuConnection());this.parentNode.workflow.getCommandStack().execute(_1eaf);}};