/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.GUIPalette=function(){draw2d.ToolPalette.call(this,"Tools");this.tool1=new draw2d.ToolGroup(this);this.tool2=new draw2d.ToolInputBox(this);this.tool3=new draw2d.ToolCheckBox(this);this.tool4=new draw2d.ToolSave(this);this.tool1.setPosition(10,30);this.tool2.setPosition(10,70);this.tool3.setPosition(10,110);this.tool4.setPosition(10,180);this.addChild(this.tool1);this.addChild(this.tool2);this.addChild(this.tool3);this.addChild(this.tool4);};draw2d.GUIPalette.prototype=new draw2d.ToolPalette;draw2d.GUIPalette.prototype.dispose=function(){draw2d.ToolPalette.prototype.dispose.call(this);this.tool1.dispose();this.tool2.dispose();this.tool3.dispose();this.tool4.dispose();};draw2d.GUIPalette.prototype.addChildren=function(item){};