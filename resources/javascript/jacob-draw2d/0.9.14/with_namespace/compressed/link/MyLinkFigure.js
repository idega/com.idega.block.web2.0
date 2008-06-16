/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyLinkFigure=function(){draw2d.Rectangle.call(this);this.setDimension(50,50);this.setBackgroundColor(new draw2d.Color(220,255,255));};draw2d.MyLinkFigure.prototype=new draw2d.Rectangle;draw2d.MyLinkFigure.prototype.type="MyLinkFigure";draw2d.MyLinkFigure.prototype.createHTMLElement=function(){var item=draw2d.Rectangle.prototype.createHTMLElement.call(this);this.time=document.createElement("a");this.time.href="#";this.time.style.position="absolute";this.time.style.left="5px";this.time.style.top="5px";this.time.style.backgroundColor="rgb(255,255,128)";this.time.style.fontSize="9pt";this.time.style.padding="8px";this.time.style.border="1px solid rgb(255,128,255)";this.time.style.textAlign="left";this.time.style.fontSize="9px";this.time.style.whiteSpace="nowrap";this.time.innerHTML="click";var oThis=this;var tmp=function(){oThis.requestDay();};this.time.onclick=tmp;this.disableTextSelection(this.time);item.appendChild(this.time);return item;};draw2d.MyLinkFigure.prototype.requestDay=function(){var obj=new draw2d.Circle(200);this.getWorkflow().addFigure(obj,this.getX(),this.getY());};draw2d.MyLinkFigure.prototype.toggle=function(){if(this.highlight){this.setBackgroundColor(new draw2d.Color(245,115,115));}else{this.setBackgroundColor(new draw2d.Color(115,245,115));}this.highlight=!this.highlight;};