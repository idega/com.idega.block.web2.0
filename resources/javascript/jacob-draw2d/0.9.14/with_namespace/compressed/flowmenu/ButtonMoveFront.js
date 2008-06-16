/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ButtonMoveFront=function(_21a6){draw2d.Button.call(this,_21a6,16,16);};draw2d.ButtonMoveFront.prototype=new draw2d.Button;draw2d.ButtonMoveFront.prototype.type="ButtonMoveFront";draw2d.ButtonMoveFront.prototype.execute=function(){this.palette.workflow.moveFront(this.palette.workflow.getCurrentSelection());draw2d.ToolGeneric.prototype.execute.call(this);};