/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

LineBorder=function(width){Border.call(this);this.width=1;if(width){this.width=width;}this.figure=null;};LineBorder.prototype=new Border;LineBorder.prototype.type="LineBorder";LineBorder.prototype.dispose=function(){Border.prototype.dispose.call(this);this.figure=null;};LineBorder.prototype.setLineWidth=function(w){this.width=w;if(this.figure!=null){this.figure.html.style.border=this.getHTMLStyle();}};LineBorder.prototype.getHTMLStyle=function(){if(this.getColor()!=null){return this.width+"px solid "+this.getColor().getHTMLStyle();}return this.width+"px solid black";};LineBorder.prototype.refresh=function(){this.setLineWidth(this.width);};