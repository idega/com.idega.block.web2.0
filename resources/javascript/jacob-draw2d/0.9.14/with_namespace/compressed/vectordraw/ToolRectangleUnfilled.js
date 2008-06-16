/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolRectangleUnfilled=function(_2869){draw2d.ToolGeneric.call(this,_2869);};draw2d.ToolRectangleUnfilled.prototype=new draw2d.ToolGeneric;draw2d.ToolRectangleUnfilled.prototype.type="ToolRectangleUnfilled";draw2d.ToolRectangleUnfilled.prototype.execute=function(x,y){var _286c=new draw2d.Rectangle();_286c.setDimension(100,60);this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_286c,x,y));draw2d.ToolGeneric.prototype.execute.call(this,x,y);};