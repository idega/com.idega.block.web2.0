/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ButtonMoveFront=function(_118c){Button.call(this,_118c,16,16);};ButtonMoveFront.prototype=new Button;ButtonMoveFront.prototype.type="ButtonMoveFront";ButtonMoveFront.prototype.execute=function(){this.palette.workflow.moveFront(this.palette.workflow.getCurrentSelection());ToolGeneric.prototype.execute.call(this);};