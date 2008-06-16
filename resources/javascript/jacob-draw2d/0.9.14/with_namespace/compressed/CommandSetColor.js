/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandSetColor=function(_1ac2,color){draw2d.Command.call(this,"set color");this.figure=_1ac2;this.newColor=color;this.oldColor=_1ac2.getColor();};draw2d.CommandSetColor.prototype=new draw2d.Command;draw2d.CommandSetColor.prototype.type="CommandSetColor";draw2d.CommandSetColor.prototype.execute=function(){this.redo();};draw2d.CommandSetColor.prototype.undo=function(){this.figure.setColor(this.oldColor);};draw2d.CommandSetColor.prototype.redo=function(){this.figure.setColor(this.newColor);};