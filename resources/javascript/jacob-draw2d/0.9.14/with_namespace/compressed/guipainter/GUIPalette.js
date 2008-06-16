/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.GUIPalette=function(){draw2d.ToolPalette.call(this,"Tools");this.tool1=new draw2d.ToolGroup(this);this.tool2=new draw2d.ToolInputBox(this);this.tool3=new draw2d.ToolCheckBox(this);this.tool4=new draw2d.ToolFormButton(this);this.tool1.setPosition(10,30);this.tool2.setPosition(10,80);this.tool3.setPosition(40,80);this.tool4.setPosition(10,130);this.addChild(this.tool1);this.addChild(this.tool2);this.addChild(this.tool3);this.addChild(this.tool4);this.undoTool=new draw2d.ToolUndo(this);this.undoTool.setPosition(10,200);this.undoTool.setEnabled(false);this.addChild(this.undoTool);this.redoTool=new draw2d.ToolRedo(this);this.redoTool.setPosition(40,200);this.redoTool.setEnabled(false);this.addChild(this.redoTool);};draw2d.GUIPalette.prototype=new draw2d.ToolPalette;draw2d.GUIPalette.prototype.onSetDocumentDirty=function(){this.undoTool.setEnabled(this.workflow.getCommandStack().canUndo());this.redoTool.setEnabled(this.workflow.getCommandStack().canRedo());};