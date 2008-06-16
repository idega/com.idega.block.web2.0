VectorPalette=function(){
ToolPalette.call(this,"Tools");
this.undoTool=new ToolUndo(this);
this.undoTool.setPosition(13,10);
this.undoTool.setEnabled(false);
this.addChild(this.undoTool);
this.redoTool=new ToolRedo(this);
this.redoTool.setPosition(43,10);
this.redoTool.setEnabled(false);
this.addChild(this.redoTool);
this.setDimension(170,53);
};
VectorPalette.prototype=new ToolPalette;
VectorPalette.prototype.type="VectorPalette";
VectorPalette.prototype.onSetDocumentDirty=function(){
this.undoTool.setEnabled(this.workflow.getCommandStack().canUndo());
this.redoTool.setEnabled(this.workflow.getCommandStack().canRedo());
};
