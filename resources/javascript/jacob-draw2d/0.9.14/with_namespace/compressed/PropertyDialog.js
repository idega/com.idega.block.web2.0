/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.PropertyDialog=function(_2785,_2786,label){this.figure=_2785;this.propertyName=_2786;this.label=label;draw2d.Dialog.call(this);this.setDimension(400,120);};draw2d.PropertyDialog.prototype=new draw2d.Dialog;draw2d.PropertyDialog.prototype.type="PropertyDialog";draw2d.PropertyDialog.prototype.createHTMLElement=function(){var item=draw2d.Dialog.prototype.createHTMLElement.call(this);var _2789=document.createElement("form");_2789.style.position="absolute";_2789.style.left="10px";_2789.style.top="30px";_2789.style.width="375px";_2789.style.font="normal 10px verdana";item.appendChild(_2789);this.labelDiv=document.createElement("div");this.labelDiv.innerHTML=this.label;this.disableTextSelection(this.labelDiv);_2789.appendChild(this.labelDiv);this.input=document.createElement("input");this.input.style.border="1px solid gray";this.input.style.font="normal 10px verdana";this.input.type="text";var value=this.figure.getProperty(this.propertyName);if(value){this.input.value=value;}else{this.input.value="";}this.input.style.width="100%";_2789.appendChild(this.input);this.input.focus();return item;};draw2d.PropertyDialog.prototype.onOk=function(){draw2d.Dialog.prototype.onOk.call(this);this.figure.setProperty(this.propertyName,this.input.value);};