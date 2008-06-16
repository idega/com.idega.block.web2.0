/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolRectangleUnfilled=function(_546){ToolGeneric.call(this,_546);};ToolRectangleUnfilled.prototype=new ToolGeneric;ToolRectangleUnfilled.prototype.type="ToolRectangleUnfilled";ToolRectangleUnfilled.prototype.execute=function(x,y){var _549=new Rectangle();_549.setDimension(100,60);this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_549,x,y));ToolGeneric.prototype.execute.call(this,x,y);};