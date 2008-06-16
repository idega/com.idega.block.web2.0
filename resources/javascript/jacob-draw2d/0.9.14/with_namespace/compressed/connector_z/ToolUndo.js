/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolUndo=function(_19d3){draw2d.Button.call(this,_19d3);};draw2d.ToolUndo.prototype=new draw2d.Button;draw2d.ToolUndo.prototype.type="ToolUndo";draw2d.ToolUndo.prototype.execute=function(){this.palette.workflow.getCommandStack().undo();draw2d.ToolGeneric.prototype.execute.call(this);};