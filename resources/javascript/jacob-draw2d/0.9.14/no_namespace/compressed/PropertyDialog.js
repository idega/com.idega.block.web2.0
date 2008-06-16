/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

PropertyDialog=function(_12ba,_12bb,label){this.figure=_12ba;this.propertyName=_12bb;this.label=label;Dialog.call(this);this.setDimension(400,120);};PropertyDialog.prototype=new Dialog;PropertyDialog.prototype.type="PropertyDialog";PropertyDialog.prototype.createHTMLElement=function(){var item=Dialog.prototype.createHTMLElement.call(this);var _12be=document.createElement("form");_12be.style.position="absolute";_12be.style.left="10px";_12be.style.top="30px";_12be.style.width="375px";_12be.style.font="normal 10px verdana";item.appendChild(_12be);this.labelDiv=document.createElement("div");this.labelDiv.innerHTML=this.label;this.disableTextSelection(this.labelDiv);_12be.appendChild(this.labelDiv);this.input=document.createElement("input");this.input.style.border="1px solid gray";this.input.style.font="normal 10px verdana";this.input.type="text";var value=this.figure.getProperty(this.propertyName);if(value){this.input.value=value;}else{this.input.value="";}this.input.style.width="100%";_12be.appendChild(this.input);this.input.focus();return item;};PropertyDialog.prototype.onOk=function(){Dialog.prototype.onOk.call(this);this.figure.setProperty(this.propertyName,this.input.value);};