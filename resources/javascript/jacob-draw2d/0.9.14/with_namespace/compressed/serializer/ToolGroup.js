/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolGroup=function(_1b16){draw2d.ToolGeneric.call(this,_1b16);this.setTooltip("Form Group");};draw2d.ToolGroup.prototype=new draw2d.ToolGeneric;draw2d.ToolGroup.prototype.type="ToolGroup";draw2d.ToolGroup.prototype.execute=function(x,y){var _1b19=new draw2d.GroupFigure();_1b19.setDimension(100,60);this.palette.workflow.addFigure(_1b19,x,y);draw2d.ToolGeneric.prototype.execute.call(this,x,y);};