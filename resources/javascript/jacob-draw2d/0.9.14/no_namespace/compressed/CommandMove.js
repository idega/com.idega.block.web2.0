/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandMove=function(_128b,x,y){Command.call(this,"move figure");this.figure=_128b;this.oldX=x;this.oldY=y;this.oldCompartment=_128b.getParent();};CommandMove.prototype=new Command;CommandMove.prototype.type="CommandMove";CommandMove.prototype.setPosition=function(x,y){this.newX=x;this.newY=y;this.newCompartment=this.figure.workflow.getBestCompartmentFigure(x,y,this.figure);};CommandMove.prototype.canExecute=function(){return this.newX!=this.oldX||this.newY!=this.oldY;};CommandMove.prototype.execute=function(){this.redo();};CommandMove.prototype.undo=function(){this.figure.setPosition(this.oldX,this.oldY);if(this.newCompartment!=null){this.newCompartment.removeChild(this.figure);}if(this.oldCompartment!=null){this.oldCompartment.addChild(this.figure);}this.figure.workflow.moveResizeHandles(this.figure);};CommandMove.prototype.redo=function(){this.figure.setPosition(this.newX,this.newY);if(this.oldCompartment!=null){this.oldCompartment.removeChild(this.figure);}if(this.newCompartment!=null){this.newCompartment.addChild(this.figure);}this.figure.workflow.moveResizeHandles(this.figure);};