/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToolCheckBox=function(_86e){ToolGeneric.call(this,_86e);};ToolCheckBox.prototype=new ToolGeneric;ToolCheckBox.prototype.type="ToolCheckBox";ToolCheckBox.prototype.execute=function(x,y){var _871=new CheckBoxFigure();_871.setDimension(100,20);var _872=this.palette.workflow.getBestCompartmentFigure(x,y);this.palette.workflow.getCommandStack().execute(new CommandAdd(this.palette.workflow,_871,x,y,_872));ToolGeneric.prototype.execute.call(this,x,y);};