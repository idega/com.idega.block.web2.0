/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

CheckBoxFigure=function(_86){if(_86){this.title=_86;}else{this.title="";}Figure.call(this);};CheckBoxFigure.prototype=new Figure;CheckBoxFigure.prototype.createHTMLElement=function(){var _87=Figure.prototype.createHTMLElement.call(this);_87.style.margin="0px";_87.style.padding="0px";this.ui_element=document.createElement("input");this.ui_element.type="checkbox";this.ui_element.style.position="absolute";this.ui_element.style.left="0px";this.ui_element.style.top="0px";this.ui_element.style.margin="0px";this.ui_element.style.padding="0px";this.ui_element.style.cursor="move";this.textNode=document.createElement("div");this.textNode.innerHTML="blabla";this.textNode.style.fontFamily="sans-serif";this.textNode.style.fontSize="8pt";this.textNode.style.position="absolute";this.textNode.style.left="20px";this.textNode.style.top="0px";_87.appendChild(this.ui_element);_87.appendChild(this.textNode);return _87;};CheckBoxFigure.prototype.setDimension=function(w,h){Figure.prototype.setDimension.call(this,w,20);};