/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

VectorPalette=function(){ToolPalette.call(this,"Tools");this.tool1=new ToolLine(this);this.tool2=new ToolRectangle(this);this.tool3=new ToolRectangleUnfilled(this);this.tool4=new ToolOval(this);this.tool5=new ToolOvalUnfilled(this);this.tool6=new ToolCircle(this);this.tool7=new ToolCircleUnfilled(this);this.tool1.setPosition(10,30);this.tool2.setPosition(10,60);this.tool3.setPosition(40,60);this.tool4.setPosition(10,90);this.tool5.setPosition(40,90);this.tool6.setPosition(10,120);this.tool7.setPosition(40,120);this.addChild(this.tool1);this.addChild(this.tool2);this.addChild(this.tool3);this.addChild(this.tool4);this.addChild(this.tool5);this.addChild(this.tool6);this.addChild(this.tool7);this.undoTool=new ToolUndo(this);this.undoTool.setPosition(10,170);this.undoTool.setEnabled(false);this.addChild(this.undoTool);this.redoTool=new ToolRedo(this);this.redoTool.setPosition(40,170);this.redoTool.setEnabled(false);this.addChild(this.redoTool);};VectorPalette.prototype=new ToolPalette;VectorPalette.prototype.type="VectorPalette";VectorPalette.prototype.onSetDocumentDirty=function(){this.undoTool.setEnabled(this.workflow.getCommandStack().canUndo());this.redoTool.setEnabled(this.workflow.getCommandStack().canRedo());};