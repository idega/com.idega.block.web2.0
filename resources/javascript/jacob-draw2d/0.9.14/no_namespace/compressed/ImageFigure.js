/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ImageFigure=function(url){this.url=url;Node.call(this);this.setDimension(40,40);};ImageFigure.prototype=new Node;ImageFigure.prototype.type="Image";ImageFigure.prototype.createHTMLElement=function(){var item=Node.prototype.createHTMLElement.call(this);item.style.width=this.width+"px";item.style.height=this.height+"px";item.style.margin="0px";item.style.padding="0px";item.style.border="0px";if(this.url!=null){item.style.backgroundImage="url("+this.url+")";}else{item.style.backgroundImage="";}return item;};ImageFigure.prototype.setColor=function(_d4c){};ImageFigure.prototype.isResizeable=function(){return false;};ImageFigure.prototype.setImage=function(url){this.url=url;if(this.url!=null){this.html.style.backgroundImage="url("+this.url+")";}else{this.html.style.backgroundImage="";}};