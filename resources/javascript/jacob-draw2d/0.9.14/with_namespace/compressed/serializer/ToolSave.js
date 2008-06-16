/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolSave=function(_286d){draw2d.ToolGeneric.call(this,_286d);};draw2d.ToolSave.prototype=new draw2d.Button;draw2d.ToolSave.prototype.type="ToolSave";draw2d.ToolSave.prototype.execute=function(x,y){alert(new draw2d.XMLSerializer_01().toXML(this.palette.workflow.getDocument()));};