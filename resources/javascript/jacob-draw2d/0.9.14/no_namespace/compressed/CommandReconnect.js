/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandReconnect=function(con){Command.call(this,"reconnect connection");this.con=con;this.oldSourcePort=con.getSource();this.oldTargetPort=con.getTarget();this.oldRouter=con.getRouter();};CommandReconnect.prototype=new Command;CommandReconnect.prototype.type="CommandReconnect";CommandReconnect.prototype.canExecute=function(){return true;};CommandReconnect.prototype.setNewPorts=function(_8b2,_8b3){this.newSourcePort=_8b2;this.newTargetPort=_8b3;};CommandReconnect.prototype.execute=function(){this.redo();};CommandReconnect.prototype.undo=function(){this.con.setSource(this.oldSourcePort);this.con.setTarget(this.oldTargetPort);this.con.setRouter(this.oldRouter);if(this.con.getWorkflow().getCurrentSelection()==this.con){this.con.getWorkflow().showLineResizeHandles(this.con);}};CommandReconnect.prototype.redo=function(){this.con.setSource(this.newSourcePort);this.con.setTarget(this.newTargetPort);this.con.setRouter(this.oldRouter);if(this.con.getWorkflow().getCurrentSelection()==this.con){this.con.getWorkflow().showLineResizeHandles(this.con);}};