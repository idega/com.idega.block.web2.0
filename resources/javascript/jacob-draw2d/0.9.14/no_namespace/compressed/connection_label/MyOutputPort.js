/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyOutputPort=function(_8f){OutputPort.call(this,_8f);};MyOutputPort.prototype=new OutputPort;MyOutputPort.prototype.onDrop=function(_90){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(this.parentNode.id==_90.parentNode.id){}else{var _91=new CommandConnect(this.parentNode.workflow,this,_90);_91.setConnection(new DoubleclickConnection());this.parentNode.workflow.getCommandStack().execute(_91);}};