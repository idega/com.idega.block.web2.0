/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyPalette=function(){draw2d.ToolPalette.call(this,"Tools");this.tool1=new draw2d.ToolUseGrid10(this);this.tool1.setPosition(10,10);this.addChild(this.tool1);this.tool2=new draw2d.ToolUseGrid20(this);this.tool2.setPosition(50,10);this.addChild(this.tool2);this.setDimension(300,60);};draw2d.MyPalette.prototype=new draw2d.ToolPalette;draw2d.MyPalette.prototype.type="MyPalette";draw2d.MyPalette.prototype.onSetDocumentDirty=function(){};