/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolRectangle=function(_1290){ToolGeneric.call(this,_1290);};ToolRectangle.prototype=new ToolGeneric;ToolRectangle.prototype.type="ToolRectangle";ToolRectangle.prototype.execute=function(x,y){var _1293=new Rectangle();_1293.setDimension(100,60);_1293.setBackgroundColor(new Color(255,255,255));this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_1293,x,y));ToolGeneric.prototype.execute.call(this,x,y);};