/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolCircle=function(_147b){ToolGeneric.call(this,_147b);};ToolCircle.prototype=new ToolGeneric;ToolCircle.prototype.type="ToolCircle";ToolCircle.prototype.execute=function(x,y){var _147e=new Circle();_147e.setDimension(100,100);_147e.setBackgroundColor(new Color(255,255,255));this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_147e,x,y));ToolGeneric.prototype.execute.call(this,x,y);};