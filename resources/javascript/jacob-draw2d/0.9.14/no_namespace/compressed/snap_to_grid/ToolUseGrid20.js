/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolUseGrid20=function(_1416){ToggleButton.call(this,_1416);};ToolUseGrid20.prototype=new ToggleButton;ToolUseGrid20.prototype.type="ToolUseGrid20";ToolUseGrid20.prototype.execute=function(){if(this.isDown()){this.getToolPalette().getWorkflow().setBackgroundImage("grid_20.png",true);}else{this.getToolPalette().getWorkflow().setBackgroundImage(null,false);}this.getToolPalette().getWorkflow().setGridWidth(20,20);this.getToolPalette().getWorkflow().setSnapToGrid(this.isDown());this.getToolPalette().tool1.setActive(false);};