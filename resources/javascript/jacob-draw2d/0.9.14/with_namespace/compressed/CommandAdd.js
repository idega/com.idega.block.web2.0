/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandAdd=function(_26c3,_26c4,x,y,_26c7){draw2d.Command.call(this,"add figure");this.parent=_26c7;this.figure=_26c4;this.x=x;this.y=y;this.workflow=_26c3;};draw2d.CommandAdd.prototype=new draw2d.Command;draw2d.CommandAdd.prototype.type="CommandAdd";draw2d.CommandAdd.prototype.execute=function(){this.redo();};draw2d.CommandAdd.prototype.redo=function(){if(this.x&&this.y){this.workflow.addFigure(this.figure,this.x,this.y);}else{this.workflow.addFigure(this.figure);}this.workflow.setCurrentSelection(this.figure);if(this.parent!=null){this.parent.addChild(this.figure);}};draw2d.CommandAdd.prototype.undo=function(){this.workflow.removeFigure(this.figure);this.workflow.setCurrentSelection(null);if(this.parent!=null){this.parent.removeChild(this.figure);}};