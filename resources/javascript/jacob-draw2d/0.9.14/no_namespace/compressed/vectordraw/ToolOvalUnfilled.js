/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolOvalUnfilled=function(_533){ToolGeneric.call(this,_533);};ToolOvalUnfilled.prototype=new ToolGeneric;ToolOvalUnfilled.prototype.type="ToolOvalUnfilled";ToolOvalUnfilled.prototype.execute=function(x,y){var _536=new Oval();_536.setDimension(100,60);this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_536,x,y));ToolGeneric.prototype.execute.call(this,x,y);};