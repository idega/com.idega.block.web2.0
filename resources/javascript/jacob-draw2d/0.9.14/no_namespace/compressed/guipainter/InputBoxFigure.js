/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

InputBoxFigure=function(_4){if(_4){this.title=_4;}else{this.title="";}Figure.call(this);};InputBoxFigure.prototype=new Figure;InputBoxFigure.prototype.createHTMLElement=function(){var _5=Figure.prototype.createHTMLElement.call(this);_5.style.margin="0px";_5.style.padding="0px";this.ui_element=document.createElement("div");this.ui_element.style.position="absolute";this.ui_element.style.left="0px";this.ui_element.style.top="0px";this.ui_element.style.cursor="move";this.ui_element.style.borderStyle="inset";_5.appendChild(this.ui_element);return _5;};InputBoxFigure.prototype.setDimension=function(w,h){Figure.prototype.setDimension.call(this,w,20);if(this.ui_element!=null){this.ui_element.style.width=(this.getWidth()-4)+"px";this.ui_element.style.height=(this.getHeight()-4)+"px";}};InputBoxFigure.prototype.getMinWidth=function(){return 50;};