/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

InputPort=function(_13d1){Port.call(this,_13d1);};InputPort.prototype=new Port;InputPort.prototype.type="InputPort";InputPort.prototype.onDrop=function(port){if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){return;}if(this.parentNode.id==port.parentNode.id){}else{if(port instanceof OutputPort){var _13d3=new CommandConnect(this.parentNode.workflow,port,this);this.parentNode.workflow.getCommandStack().execute(_13d3);}}};InputPort.prototype.onDragEnter=function(port){if(port instanceof OutputPort){Port.prototype.onDragEnter.call(this,port);}else{if(port instanceof LineStartResizeHandle){var line=this.workflow.currentSelection;if(line instanceof Connection&&line.getSource() instanceof InputPort){Port.prototype.onDragEnter.call(this,line.getSource());}}else{if(port instanceof LineEndResizeHandle){var line=this.workflow.currentSelection;if(line instanceof Connection&&line.getTarget() instanceof InputPort){Port.prototype.onDragEnter.call(this,line.getTarget());}}}}};InputPort.prototype.onDragLeave=function(port){if(port instanceof OutputPort){Port.prototype.onDragLeave.call(this,port);}else{if(port instanceof LineStartResizeHandle){var line=this.workflow.currentSelection;if(line instanceof Connection&&line.getSource() instanceof InputPort){Port.prototype.onDragLeave.call(this,line.getSource());}}else{if(port instanceof LineEndResizeHandle){var line=this.workflow.currentSelection;if(line instanceof Connection&&line.getTarget() instanceof InputPort){Port.prototype.onDragLeave.call(this,line.getTarget());}}}}};