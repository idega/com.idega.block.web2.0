/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandSetBackgroundColor=function(_83,_84){Command.call(this,"set background color");this.figure=_83;this.newColor=_84;this.oldColor=_83.getBackgroundColor();};CommandSetBackgroundColor.prototype=new Command;CommandSetBackgroundColor.prototype.type="CommandSetBackgroundColor";CommandSetBackgroundColor.prototype.execute=function(){this.redo();};CommandSetBackgroundColor.prototype.undo=function(){this.figure.setBackgroundColor(this.oldColor);};CommandSetBackgroundColor.prototype.redo=function(){this.figure.setBackgroundColor(this.newColor);};