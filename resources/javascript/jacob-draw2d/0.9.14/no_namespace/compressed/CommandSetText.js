/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CommandSetText=function(_1558,text){Command.call(this,"set text");this.figure=_1558;this.newText=text;this.oldText=_1558.getText();};CommandSetText.prototype=new Command;CommandSetText.prototype.type="CommandSetText";CommandSetText.prototype.execute=function(){this.redo();};CommandSetText.prototype.redo=function(){this.figure.setText(this.newText);};CommandSetText.prototype.undo=function(){this.figure.setText(this.oldText);};