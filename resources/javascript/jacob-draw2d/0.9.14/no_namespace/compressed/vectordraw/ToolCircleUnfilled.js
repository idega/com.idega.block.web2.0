/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolCircleUnfilled=function(_8a){ToolGeneric.call(this,_8a);};ToolCircleUnfilled.prototype=new ToolGeneric;ToolCircleUnfilled.prototype.type="ToolCircleUnfilled";ToolCircleUnfilled.prototype.execute=function(x,y){var _8d=new Circle();_8d.setDimension(100,100);this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_8d,x,y));ToolGeneric.prototype.execute.call(this,x,y);};