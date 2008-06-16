/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandSetText=function(_2754,text){draw2d.Command.call(this,"set text");this.figure=_2754;this.newText=text;this.oldText=_2754.getText();};draw2d.CommandSetText.prototype=new draw2d.Command;draw2d.CommandSetText.prototype.type="CommandSetText";draw2d.CommandSetText.prototype.execute=function(){this.redo();};draw2d.CommandSetText.prototype.redo=function(){this.figure.setText(this.newText);};draw2d.CommandSetText.prototype.undo=function(){this.figure.setText(this.oldText);};