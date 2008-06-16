/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandAdd=function(_13f3,_13f4,x,y,_13f7){Command.call(this,"add figure");this.parent=_13f7;this.figure=_13f4;this.x=x;this.y=y;this.workflow=_13f3;};CommandAdd.prototype=new Command;CommandAdd.prototype.type="CommandAdd";CommandAdd.prototype.execute=function(){this.redo();};CommandAdd.prototype.redo=function(){if(this.x&&this.y){this.workflow.addFigure(this.figure,this.x,this.y);}else{this.workflow.addFigure(this.figure);}this.workflow.setCurrentSelection(this.figure);if(this.parent!=null){this.parent.addChild(this.figure);}};CommandAdd.prototype.undo=function(){this.workflow.removeFigure(this.figure);this.workflow.setCurrentSelection(null);if(this.parent!=null){this.parent.removeChild(this.figure);}};