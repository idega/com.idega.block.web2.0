GUIPalette=function(){
ToolPalette.call(this,"Tools");
this.tool1=new ToolGroup(this);
this.tool2=new ToolInputBox(this);
this.tool3=new ToolCheckBox(this);
this.tool4=new ToolSave(this);
this.tool1.setPosition(10,30);
this.tool2.setPosition(10,70);
this.tool3.setPosition(10,110);
this.tool4.setPosition(10,180);
this.addChild(this.tool1);
this.addChild(this.tool2);
this.addChild(this.tool3);
this.addChild(this.tool4);
};
GUIPalette.prototype=new ToolPalette;
GUIPalette.prototype.dispose=function(){
ToolPalette.prototype.dispose.call(this);
this.tool1.dispose();
this.tool2.dispose();
this.tool3.dispose();
this.tool4.dispose();
};
GUIPalette.prototype.addChildren=function(item){
};
