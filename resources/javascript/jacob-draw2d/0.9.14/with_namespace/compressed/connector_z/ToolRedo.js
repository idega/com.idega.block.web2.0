/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolRedo=function(_1d91){draw2d.Button.call(this,_1d91);};draw2d.ToolRedo.prototype=new draw2d.Button;draw2d.ToolRedo.prototype.type="ToolRedo";draw2d.ToolRedo.prototype.execute=function(){this.palette.workflow.getCommandStack().redo();draw2d.ToolGeneric.prototype.execute.call(this);};