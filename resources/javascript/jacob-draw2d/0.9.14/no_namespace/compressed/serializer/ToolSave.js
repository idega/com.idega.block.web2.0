/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolSave=function(_12c1){ToolGeneric.call(this,_12c1);};ToolSave.prototype=new Button;ToolSave.prototype.type="ToolSave";ToolSave.prototype.execute=function(x,y){alert(new XMLSerializer_01().toXML(this.palette.workflow.getDocument()));};