/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

InputDialog=function(){Dialog.call(this);this.setDimension(400,100);};InputDialog.prototype=new Dialog;InputDialog.prototype.type="InputDialog";InputDialog.prototype.createHTMLElement=function(){var item=Dialog.prototype.createHTMLElement.call(this);return item;};InputDialog.prototype.onOk=function(){this.workflow.removeFigure(this);};InputDialog.prototype.onCancel=function(){this.workflow.removeFigure(this);};