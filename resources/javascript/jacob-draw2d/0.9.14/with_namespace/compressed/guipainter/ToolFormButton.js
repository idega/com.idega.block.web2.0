/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolFormButton=function(_1986){draw2d.ToolGeneric.call(this,_1986);};draw2d.ToolFormButton.prototype=new draw2d.ToolGeneric;draw2d.ToolFormButton.prototype.type="ToolFormButton";draw2d.ToolFormButton.prototype.execute=function(x,y){var _1989=new draw2d.ButtonFigure();_1989.setDimension(100,20);var _198a=this.palette.workflow.getBestCompartmentFigure(x,y);this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,_1989,x,y,_198a));draw2d.ToolGeneric.prototype.execute.call(this,x,y);};