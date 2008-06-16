/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandDelete=function(_127d){Command.call(this,"delete figure");this.parent=_127d.parent;this.figure=_127d;this.workflow=_127d.workflow;this.connections=null;};CommandDelete.prototype=new Command;CommandDelete.prototype.type="CommandDelete";CommandDelete.prototype.execute=function(){this.redo();};CommandDelete.prototype.undo=function(){this.workflow.addFigure(this.figure);if(this.figure instanceof Connection){this.figure.reconnect();}this.workflow.setCurrentSelection(this.figure);if(this.parent!=null){this.parent.addChild(this.figure);}for(var i=0;i<this.connections.getSize();++i){this.workflow.addFigure(this.connections.get(i));this.connections.get(i).reconnect();}};CommandDelete.prototype.redo=function(){this.workflow.removeFigure(this.figure);this.workflow.setCurrentSelection(null);if(this.figure.getPorts&&this.connections==null){this.connections=new ArrayList();var ports=this.figure.getPorts();for(var i=0;i<ports.getSize();i++){if(ports.get(i).getConnections){this.connections.addAll(ports.get(i).getConnections());}}}if(this.connections==null){this.connections=new ArrayList();}if(this.parent!=null){this.parent.removeChild(this.figure);}for(var i=0;i<this.connections.getSize();++i){this.workflow.removeFigure(this.connections.get(i));}};