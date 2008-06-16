/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ButtonMoveBack=function(_19d2){draw2d.Button.call(this,_19d2,16,16);};draw2d.ButtonMoveBack.prototype=new draw2d.Button;draw2d.ButtonMoveBack.prototype.type="ButtonMoveBack";draw2d.ButtonMoveBack.prototype.execute=function(){this.palette.workflow.moveBack(this.palette.workflow.getCurrentSelection());draw2d.ToolGeneric.prototype.execute.call(this);};