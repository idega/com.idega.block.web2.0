/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolGroup=function(_d82){ToolGeneric.call(this,_d82);this.setTooltip("Form Group");};ToolGroup.prototype=new ToolGeneric;ToolGroup.prototype.type="ToolGroup";ToolGroup.prototype.execute=function(x,y){var _d85=new GroupFigure();_d85.setDimension(100,60);var _d86=this.palette.workflow.getBestCompartmentFigure(x,y);this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_d85,x,y,_d86));ToolGeneric.prototype.execute.call(this,x,y);};