/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandDelete=function(_1b34){draw2d.Command.call(this,"delete figure");this.parent=_1b34.parent;this.figure=_1b34;this.workflow=_1b34.workflow;this.connections=null;};draw2d.CommandDelete.prototype=new draw2d.Command;draw2d.CommandDelete.prototype.type="CommandDelete";draw2d.CommandDelete.prototype.execute=function(){this.redo();};draw2d.CommandDelete.prototype.undo=function(){this.workflow.addFigure(this.figure);if(this.figure instanceof draw2d.Connection){this.figure.reconnect();}this.workflow.setCurrentSelection(this.figure);if(this.parent!=null){this.parent.addChild(this.figure);}for(var i=0;i<this.connections.getSize();++i){this.workflow.addFigure(this.connections.get(i));this.connections.get(i).reconnect();}};draw2d.CommandDelete.prototype.redo=function(){this.workflow.removeFigure(this.figure);this.workflow.setCurrentSelection(null);if(this.figure.getPorts&&this.connections==null){this.connections=new draw2d.ArrayList();var ports=this.figure.getPorts();for(var i=0;i<ports.getSize();i++){if(ports.get(i).getConnections){this.connections.addAll(ports.get(i).getConnections());}}}if(this.connections==null){this.connections=new draw2d.ArrayList();}if(this.parent!=null){this.parent.removeChild(this.figure);}for(var i=0;i<this.connections.getSize();++i){this.workflow.removeFigure(this.connections.get(i));}};