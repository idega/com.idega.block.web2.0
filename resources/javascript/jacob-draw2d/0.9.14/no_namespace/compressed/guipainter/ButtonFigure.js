/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ButtonFigure=function(_bca){if(_bca){this.title=_bca;}else{this.title="Button ";}Figure.call(this);};ButtonFigure.prototype=new Figure;ButtonFigure.prototype.type="ButtonFigure";ButtonFigure.prototype.createHTMLElement=function(){var item=document.createElement("input");item.id=this.id;item.type="button";item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.height=this.width+"px";item.style.width=this.height+"px";item.style.margin="0px";item.style.padding="0px";item.style.zIndex=""+Figure.ZOrderBaseIndex;item.value=this.title;return item;};