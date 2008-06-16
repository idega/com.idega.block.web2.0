/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolInputBox=function(_d95){ToolGeneric.call(this,_d95);};ToolInputBox.prototype=new ToolGeneric;ToolInputBox.prototype.type="ToolInputBox";ToolInputBox.prototype.execute=function(x,y){var _d98=new InputBoxFigure();_d98.setDimension(100,20);var _d99=this.palette.workflow.getBestCompartmentFigure(x,y);this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_d98,x,y,_d99));ToolGeneric.prototype.execute.call(this,x,y);};