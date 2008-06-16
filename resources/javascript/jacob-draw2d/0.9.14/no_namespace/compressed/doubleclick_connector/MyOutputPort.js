/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyOutputPort=function(_96){OutputPort.call(this,_96);};MyOutputPort.prototype=new OutputPort;MyOutputPort.prototype.onDrop=function(_97){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(this.parentNode.id==_97.parentNode.id){}else{var _98=new CommandConnect(this.parentNode.workflow,this,_97);_98.setConnection(new DoubleclickConnection());this.parentNode.workflow.getCommandStack().execute(_98);}};