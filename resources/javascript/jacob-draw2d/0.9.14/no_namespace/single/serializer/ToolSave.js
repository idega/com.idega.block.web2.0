ToolSave=function(_3f57){
ToolGeneric.call(this,_3f57);
};
ToolSave.prototype=new Button;
ToolSave.prototype.type="ToolSave";
ToolSave.prototype.execute=function(x,y){
alert(new XMLSerializer_01().toXML(this.palette.workflow.getDocument()));
};
