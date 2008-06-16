/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolCheckBox=function(_8){ToolGeneric.call(this,_8);};ToolCheckBox.prototype=new ToolGeneric;ToolCheckBox.prototype.type="ToolCheckBox";ToolCheckBox.prototype.execute=function(x,y){var _b=new CheckBoxFigure();_b.setDimension(100,20);this.palette.workflow.addFigure(_b,x,y);var _c=this.palette.workflow.getBestCompartmentFigure(x,y);if(_c){_c.addChild(_b);}ToolGeneric.prototype.execute.call(this,x,y);};