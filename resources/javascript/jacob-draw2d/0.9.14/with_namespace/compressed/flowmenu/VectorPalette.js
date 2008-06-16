/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.VectorPalette=function(){draw2d.ToolPalette.call(this,"Tools");this.undoTool=new draw2d.ToolUndo(this);this.undoTool.setPosition(13,10);this.undoTool.setEnabled(false);this.addChild(this.undoTool);this.redoTool=new draw2d.ToolRedo(this);this.redoTool.setPosition(43,10);this.redoTool.setEnabled(false);this.addChild(this.redoTool);this.setDimension(170,53);};draw2d.VectorPalette.prototype=new draw2d.ToolPalette;draw2d.VectorPalette.prototype.type="VectorPalette";draw2d.VectorPalette.prototype.onSetDocumentDirty=function(){this.undoTool.setEnabled(this.workflow.getCommandStack().canUndo());this.redoTool.setEnabled(this.workflow.getCommandStack().canRedo());};