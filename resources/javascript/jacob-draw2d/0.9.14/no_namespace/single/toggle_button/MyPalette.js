MyPalette=function(){
ToolPalette.call(this,"Tools");
this.tool1=new ToolShowGrid(this);
this.tool1.setPosition(10,10);
this.addChild(this.tool1);
this.setDimension(300,60);
};
MyPalette.prototype=new ToolPalette;
MyPalette.prototype.type="MyPalette";
MyPalette.prototype.onSetDocumentDirty=function(){
};
