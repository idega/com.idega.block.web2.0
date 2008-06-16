/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyOutputPort=function(_1){OutputPort.call(this,_1);};MyOutputPort.prototype=new OutputPort;MyOutputPort.prototype.onDrop=function(_2){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(this.parentNode.id==_2.parentNode.id){}else{var _3=new CommandConnect(this.parentNode.workflow,this,_2);_3.setConnection(new DecoratedConnection());this.parentNode.workflow.getCommandStack().execute(_3);}};