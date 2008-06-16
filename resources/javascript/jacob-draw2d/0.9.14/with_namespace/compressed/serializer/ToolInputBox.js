/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolInputBox=function(_2639){draw2d.ToolGeneric.call(this,_2639);};draw2d.ToolInputBox.prototype=new draw2d.ToolGeneric;draw2d.ToolInputBox.prototype.type="ToolInputBox";draw2d.ToolInputBox.prototype.execute=function(x,y){var _263c=new draw2d.InputBoxFigure();_263c.setDimension(100,20);this.palette.workflow.addFigure(_263c,x,y);var _263d=this.palette.workflow.getBestCompartmentFigure(x,y);if(_263d){_263d.addChild(_263c);}draw2d.ToolGeneric.prototype.execute.call(this,x,y);};