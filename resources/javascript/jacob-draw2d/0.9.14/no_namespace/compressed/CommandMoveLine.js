/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandMoveLine=function(line,_906,_907,endX,endY){Command.call(this,"move line");this.line=line;this.startX1=_906;this.startY1=_907;this.endX1=endX;this.endY1=endY;};CommandMoveLine.prototype=new Command;CommandMoveLine.prototype.type="CommandMoveLine";CommandMoveLine.prototype.canExecute=function(){return this.startX1!=this.startX2||this.startY1!=this.startY2||this.endX1!=this.endX2||this.endY1!=this.endY2;};CommandMoveLine.prototype.setEndPoints=function(_90a,_90b,endX,endY){this.startX2=_90a;this.startY2=_90b;this.endX2=endX;this.endY2=endY;};CommandMoveLine.prototype.execute=function(){this.redo();};CommandMoveLine.prototype.undo=function(){this.line.setStartPoint(this.startX1,this.startY1);this.line.setEndPoint(this.endX1,this.endY1);if(this.line.workflow.getCurrentSelection()==this.line){this.line.workflow.showLineResizeHandles(this.line);}};CommandMoveLine.prototype.redo=function(){this.line.setStartPoint(this.startX2,this.startY2);this.line.setEndPoint(this.endX2,this.endY2);if(this.line.workflow.getCurrentSelection()==this.line){this.line.workflow.showLineResizeHandles(this.line);}};