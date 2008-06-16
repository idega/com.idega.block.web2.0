/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolShowGrid=function(_2749){draw2d.ToggleButton.call(this,_2749);};draw2d.ToolShowGrid.prototype=new draw2d.ToggleButton;draw2d.ToolShowGrid.prototype.type="ToolShowGrid";draw2d.ToolShowGrid.prototype.execute=function(){if(this.isDown()){this.getToolPalette().getWorkflow().setBackgroundImage("grid_10.png",true);}else{this.getToolPalette().getWorkflow().setBackgroundImage(null,false);}};