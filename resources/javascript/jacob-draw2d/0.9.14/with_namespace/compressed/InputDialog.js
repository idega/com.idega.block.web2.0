/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.InputDialog=function(){draw2d.Dialog.call(this);this.setDimension(400,100);};draw2d.InputDialog.prototype=new draw2d.Dialog;draw2d.InputDialog.prototype.type="InputDialog";draw2d.InputDialog.prototype.createHTMLElement=function(){var item=draw2d.Dialog.prototype.createHTMLElement.call(this);return item;};draw2d.InputDialog.prototype.onOk=function(){this.workflow.removeFigure(this);};draw2d.InputDialog.prototype.onCancel=function(){this.workflow.removeFigure(this);};