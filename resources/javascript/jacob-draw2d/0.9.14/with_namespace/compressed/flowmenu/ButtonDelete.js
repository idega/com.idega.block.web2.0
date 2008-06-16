/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ButtonDelete=function(_1d84){draw2d.Button.call(this,_1d84,16,16);};draw2d.ButtonDelete.prototype=new draw2d.Button;draw2d.ButtonDelete.prototype.type="ButtonDelete";draw2d.ButtonDelete.prototype.execute=function(){this.palette.workflow.getCommandStack().execute(new draw2d.CommandDelete(this.palette.workflow.getCurrentSelection()));draw2d.ToolGeneric.prototype.execute.call(this);};