FlowMenu=function(_39f9){
this.actionDelete=new ButtonDelete(this);
this.actionFront=new ButtonMoveFront(this);
this.actionBack=new ButtonMoveBack(this);
ToolPalette.call(this);
this.setDimension(20,60);
this.setBackgroundColor(new Color(220,255,255));
this.currentFigure=null;
this.myworkflow=_39f9;
this.added=false;
this.setDeleteable(false);
this.setCanDrag(false);
this.setResizeable(false);
this.setSelectable(false);
this.setBackgroundColor(null);
this.setColor(null);
this.scrollarea.style.borderBottom="0px";
this.actionDelete.setPosition(0,0);
this.actionFront.setPosition(0,18);
this.actionBack.setPosition(0,36);
this.addChild(this.actionDelete);
this.addChild(this.actionFront);
this.addChild(this.actionBack);
};
FlowMenu.prototype=new ToolPalette;
FlowMenu.prototype.setAlpha=function(_39fa){
Figure.prototype.setAlpha.call(this,_39fa);
};
FlowMenu.prototype.hasTitleBar=function(){
return false;
};
FlowMenu.prototype.onSelectionChanged=function(_39fb){
if(_39fb==this.currentFigure){
return;
}
if(this.added==true){
this.myworkflow.removeFigure(this);
this.added=false;
}
if(_39fb!=null&&this.added==false){
if(this.myworkflow.getEnableSmoothFigureHandling()==true){
this.setAlpha(0.01);
}
this.myworkflow.addFigure(this,100,100);
this.added=true;
}
if(this.currentFigure!=null){
this.currentFigure.detachMoveListener(this);
}
this.currentFigure=_39fb;
if(this.currentFigure!=null){
this.currentFigure.attachMoveListener(this);
this.onOtherFigureMoved(this.currentFigure);
}
};
FlowMenu.prototype.setWorkflow=function(_39fc){
Figure.prototype.setWorkflow.call(this,_39fc);
};
FlowMenu.prototype.onOtherFigureMoved=function(_39fd){
var pos=_39fd.getPosition();
this.setPosition(pos.x+_39fd.getWidth()+7,pos.y-16);
};
