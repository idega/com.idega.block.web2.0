/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

AnnotationDialog=function(_1c8){this.figure=_1c8;Dialog.call(this);this.setDimension(400,100);};AnnotationDialog.prototype=new Dialog;AnnotationDialog.prototype.type="AnnotationDialog";AnnotationDialog.prototype.createHTMLElement=function(){var item=Dialog.prototype.createHTMLElement.call(this);var _1ca=document.createElement("form");_1ca.style.position="absolute";_1ca.style.left="10px";_1ca.style.top="30px";_1ca.style.width="375px";_1ca.style.font="normal 10px verdana";item.appendChild(_1ca);this.label=document.createTextNode("Text");_1ca.appendChild(this.label);this.input=document.createElement("input");this.input.style.border="1px solid gray";this.input.style.font="normal 10px verdana";this.input.type="text";var _1cb=this.figure.getText();if(_1cb){this.input.value=_1cb;}else{this.input.value="";}this.input.style.width="100%";_1ca.appendChild(this.input);this.input.focus();return item;};AnnotationDialog.prototype.onOk=function(){this.workflow.getCommandStack().execute(new CommandSetText(this.figure,this.input.value));this.workflow.removeFigure(this);};