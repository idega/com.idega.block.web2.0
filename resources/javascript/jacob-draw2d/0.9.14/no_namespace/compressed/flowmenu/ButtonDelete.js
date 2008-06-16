/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ButtonDelete=function(_413){Button.call(this,_413,16,16);};ButtonDelete.prototype=new Button;ButtonDelete.prototype.type="ButtonDelete";ButtonDelete.prototype.execute=function(){this.palette.workflow.getCommandStack().execute(new CommandDelete(this.palette.workflow.getCurrentSelection()));ToolGeneric.prototype.execute.call(this);};