/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolUseGeometry=function(_2662){draw2d.ToggleButton.call(this,_2662);};draw2d.ToolUseGeometry.prototype=new draw2d.ToggleButton;draw2d.ToolUseGeometry.prototype.type="ToolUseGeometry";draw2d.ToolUseGeometry.prototype.execute=function(){this.getToolPalette().getWorkflow().setSnapToGeometry(this.isDown());};