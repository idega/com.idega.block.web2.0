/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandResize=function(_11ec,width,_11ee){Command.call(this,"resize figure");this.figure=_11ec;this.oldWidth=width;this.oldHeight=_11ee;};CommandResize.prototype=new Command;CommandResize.prototype.type="CommandResize";CommandResize.prototype.setDimension=function(width,_11f0){this.newWidth=width;this.newHeight=_11f0;};CommandResize.prototype.canExecute=function(){return this.newWidth!=this.oldWidth||this.newHeight!=this.oldHeight;};CommandResize.prototype.execute=function(){this.redo();};CommandResize.prototype.undo=function(){this.figure.setDimension(this.oldWidth,this.oldHeight);this.figure.workflow.moveResizeHandles(this.figure);};CommandResize.prototype.redo=function(){this.figure.setDimension(this.newWidth,this.newHeight);this.figure.workflow.moveResizeHandles(this.figure);};