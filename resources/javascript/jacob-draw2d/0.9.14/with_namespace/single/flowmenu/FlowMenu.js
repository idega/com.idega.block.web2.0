draw2d.FlowMenu=function(_4a0d){this.actionDelete=new draw2d.ButtonDelete(this);this.actionFront=new draw2d.ButtonMoveFront(this);this.actionBack=new draw2d.ButtonMoveBack(this);draw2d.ToolPalette.call(this);this.setDimension(20,60);this.setBackgroundColor(new draw2d.Color(220,255,255));this.currentFigure=null;this.myworkflow=_4a0d;this.added=false;this.setDeleteable(false);this.setCanDrag(false);this.setResizeable(false);this.setSelectable(false);this.setBackgroundColor(null);this.setColor(null);this.scrollarea.style.borderBottom="0px";this.actionDelete.setPosition(0,0);this.actionFront.setPosition(0,18);this.actionBack.setPosition(0,36);this.addChild(this.actionDelete);this.addChild(this.actionFront);this.addChild(this.actionBack);};draw2d.FlowMenu.prototype=new draw2d.ToolPalette;draw2d.FlowMenu.prototype.setAlpha=function(_4a0e){draw2d.Figure.prototype.setAlpha.call(this,_4a0e);};draw2d.FlowMenu.prototype.hasTitleBar=function(){return false;};draw2d.FlowMenu.prototype.onSelectionChanged=function(_4a0f){if(_4a0f==this.currentFigure){return;}if(this.added==true){this.myworkflow.removeFigure(this);this.added=false;}if(_4a0f!=null&&this.added==false){if(this.myworkflow.getEnableSmoothFigureHandling()==true){this.setAlpha(0.01);}this.myworkflow.addFigure(this,100,100);this.added=true;}if(this.currentFigure!=null){this.currentFigure.detachMoveListener(this);}this.currentFigure=_4a0f;if(this.currentFigure!=null){this.currentFigure.attachMoveListener(this);this.onOtherFigureMoved(this.currentFigure);}};draw2d.FlowMenu.prototype.setWorkflow=function(_4a10){draw2d.Figure.prototype.setWorkflow.call(this,_4a10);};draw2d.FlowMenu.prototype.onOtherFigureMoved=function(_4a11){var pos=_4a11.getPosition();this.setPosition(pos.x+_4a11.getWidth()+7,pos.y-16);};