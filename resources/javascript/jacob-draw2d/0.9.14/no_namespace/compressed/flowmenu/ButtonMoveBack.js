/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ButtonMoveBack=function(_13fb){Button.call(this,_13fb,16,16);};ButtonMoveBack.prototype=new Button;ButtonMoveBack.prototype.type="ButtonMoveBack";ButtonMoveBack.prototype.execute=function(){this.palette.workflow.moveBack(this.palette.workflow.getCurrentSelection());ToolGeneric.prototype.execute.call(this);};