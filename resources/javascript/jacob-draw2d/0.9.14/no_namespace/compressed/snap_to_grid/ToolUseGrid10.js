/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolUseGrid10=function(_18c){ToggleButton.call(this,_18c);};ToolUseGrid10.prototype=new ToggleButton;ToolUseGrid10.prototype.type="ToolUseGrid10";ToolUseGrid10.prototype.execute=function(){if(this.isDown()){this.getToolPalette().getWorkflow().setBackgroundImage("grid_10.png",true);}else{this.getToolPalette().getWorkflow().setBackgroundImage(null,false);}this.getToolPalette().getWorkflow().setGridWidth(10,10);this.getToolPalette().getWorkflow().setSnapToGrid(this.isDown());this.getToolPalette().tool2.setActive(false);};