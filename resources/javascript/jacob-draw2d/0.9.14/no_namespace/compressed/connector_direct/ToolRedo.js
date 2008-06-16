/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolRedo=function(_11d8){Button.call(this,_11d8);};ToolRedo.prototype=new Button;ToolRedo.prototype.type="ToolRedo";ToolRedo.prototype.execute=function(){this.palette.workflow.getCommandStack().redo();ToolGeneric.prototype.execute.call(this);};