/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolLine=function(_52f){ToolGeneric.call(this,_52f);};ToolLine.prototype=new ToolGeneric;ToolLine.prototype.type="ToolLine";ToolLine.prototype.execute=function(x,y){var _532=new Line();_532.setStartPoint(x,y);_532.setEndPoint(x+100,y+100);this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_532));ToolGeneric.prototype.execute.call(this,x,y);};