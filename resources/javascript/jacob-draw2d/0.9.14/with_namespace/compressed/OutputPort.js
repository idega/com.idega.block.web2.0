/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.OutputPort=function(_166c){draw2d.Port.call(this,_166c);this.maxFanOut=100;};draw2d.OutputPort.prototype=new draw2d.Port;draw2d.OutputPort.prototype.type="OutputPort";draw2d.OutputPort.prototype.onDrop=function(port){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(this.parentNode.id==port.parentNode.id){}else{if(port instanceof draw2d.InputPort){var _166e=new draw2d.CommandConnect(this.parentNode.workflow,this,port);this.parentNode.workflow.getCommandStack().execute(_166e);}}};draw2d.OutputPort.prototype.onDragEnter=function(port){if(this.getMaxFanOut()<=this.getFanOut()){return;}if(port instanceof draw2d.InputPort){draw2d.Port.prototype.onDragEnter.call(this,port);}else{if(port instanceof draw2d.LineStartResizeHandle){var line=this.workflow.currentSelection;if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.OutputPort){draw2d.Port.prototype.onDragEnter.call(this,line.getSource());}}else{if(port instanceof draw2d.LineEndResizeHandle){var line=this.workflow.currentSelection;if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.OutputPort){draw2d.Port.prototype.onDragEnter.call(this,line.getTarget());}}}}};draw2d.OutputPort.prototype.onDragLeave=function(port){if(port instanceof draw2d.InputPort){draw2d.Port.prototype.onDragLeave.call(this,port);}else{if(port instanceof draw2d.LineStartResizeHandle){var line=this.workflow.currentSelection;if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.OutputPort){draw2d.Port.prototype.onDragLeave.call(this,line.getSource());}}else{if(port instanceof draw2d.LineEndResizeHandle){var line=this.workflow.currentSelection;if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.OutputPort){draw2d.Port.prototype.onDragLeave.call(this,line.getTarget());}}}}};draw2d.OutputPort.prototype.onDragstart=function(x,y){if(this.maxFanOut==-1){return true;}if(this.getMaxFanOut()<=this.getFanOut()){return false;}return true;};draw2d.OutputPort.prototype.setMaxFanOut=function(count){this.maxFanOut=count;};draw2d.OutputPort.prototype.getMaxFanOut=function(){return this.maxFanOut;};draw2d.OutputPort.prototype.getFanOut=function(){if(this.getParent().workflow==null){return 0;}var count=0;var lines=this.getParent().workflow.getLines();var size=lines.getSize();for(var i=0;i<size;i++){var line=lines.get(i);if(line instanceof draw2d.Connection){if(line.getSource()==this){count++;}else{if(line.getTarget()==this){count++;}}}}return count;};