/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandReconnect=function(con){draw2d.Command.call(this,"reconnect connection");this.con=con;this.oldSourcePort=con.getSource();this.oldTargetPort=con.getTarget();this.oldRouter=con.getRouter();};draw2d.CommandReconnect.prototype=new draw2d.Command;draw2d.CommandReconnect.prototype.type="CommandReconnect";draw2d.CommandReconnect.prototype.canExecute=function(){return true;};draw2d.CommandReconnect.prototype.setNewPorts=function(_26c9,_26ca){this.newSourcePort=_26c9;this.newTargetPort=_26ca;};draw2d.CommandReconnect.prototype.execute=function(){this.redo();};draw2d.CommandReconnect.prototype.undo=function(){this.con.setSource(this.oldSourcePort);this.con.setTarget(this.oldTargetPort);this.con.setRouter(this.oldRouter);if(this.con.getWorkflow().getCurrentSelection()==this.con){this.con.getWorkflow().showLineResizeHandles(this.con);}};draw2d.CommandReconnect.prototype.redo=function(){this.con.setSource(this.newSourcePort);this.con.setTarget(this.newTargetPort);this.con.setRouter(this.oldRouter);if(this.con.getWorkflow().getCurrentSelection()==this.con){this.con.getWorkflow().showLineResizeHandles(this.con);}};