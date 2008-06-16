/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Tooltip=function(msg){draw2d.Annotation.call(this,msg);this.setCanDrag(false);this.setFontSize(8);this.setSelectable(false);this.setDeleteable(false);this.setBorder(new draw2d.LineBorder(1));};draw2d.Tooltip.prototype=new draw2d.Annotation;draw2d.Tooltip.prototype.type="Tooltip";draw2d.Tooltip.prototype.createHTMLElement=function(){var item=draw2d.Annotation.prototype.createHTMLElement.call(this);item.style.margin="3px";item.style.padding="3px";item.style.paddingLeft="25px";item.style.background="rgb(255,255,128) url(asterisk.png) no-repeat 3px 1px";item.style.zIndex=(draw2d.Figure.ZOrderIndex+1);return item;};