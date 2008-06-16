/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolInputBox=function(_bae){ToolGeneric.call(this,_bae);};ToolInputBox.prototype=new ToolGeneric;ToolInputBox.prototype.type="ToolInputBox";ToolInputBox.prototype.execute=function(x,y){var _bb1=new InputBoxFigure();_bb1.setDimension(100,20);this.palette.workflow.addFigure(_bb1,x,y);var _bb2=this.palette.workflow.getBestCompartmentFigure(x,y);if(_bb2){_bb2.addChild(_bb1);}ToolGeneric.prototype.execute.call(this,x,y);};