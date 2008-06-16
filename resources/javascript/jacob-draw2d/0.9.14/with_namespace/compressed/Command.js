/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Command=function(label){this.label=label;};draw2d.Command.prototype.type="Command";draw2d.Command.prototype.getLabel=function(){};draw2d.Command.prototype.canExecute=function(){return true;};draw2d.Command.prototype.execute=function(){};draw2d.Command.prototype.undo=function(){};draw2d.Command.prototype.redo=function(){};