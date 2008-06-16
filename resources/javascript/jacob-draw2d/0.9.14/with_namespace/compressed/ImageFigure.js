/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ImageFigure=function(url){this.url=url;draw2d.Node.call(this);this.setDimension(40,40);};draw2d.ImageFigure.prototype=new draw2d.Node;draw2d.ImageFigure.prototype.type="Image";draw2d.ImageFigure.prototype.createHTMLElement=function(){var item=draw2d.Node.prototype.createHTMLElement.call(this);item.style.width=this.width+"px";item.style.height=this.height+"px";item.style.margin="0px";item.style.padding="0px";item.style.border="0px";if(this.url!=null){item.style.backgroundImage="url("+this.url+")";}else{item.style.backgroundImage="";}return item;};draw2d.ImageFigure.prototype.setColor=function(color){};draw2d.ImageFigure.prototype.isResizeable=function(){return false;};draw2d.ImageFigure.prototype.setImage=function(url){this.url=url;if(this.url!=null){this.html.style.backgroundImage="url("+this.url+")";}else{this.html.style.backgroundImage="";}};