/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ButtonFigure=function(title){if(title){this.title=title;}else{this.title="Button ";}draw2d.Figure.call(this);};draw2d.ButtonFigure.prototype=new draw2d.Figure;draw2d.ButtonFigure.prototype.type="ButtonFigure";draw2d.ButtonFigure.prototype.createHTMLElement=function(){var item=document.createElement("input");item.id=this.id;item.type="button";item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.height=this.width+"px";item.style.width=this.height+"px";item.style.margin="0px";item.style.padding="0px";item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;item.value=this.title;return item;};