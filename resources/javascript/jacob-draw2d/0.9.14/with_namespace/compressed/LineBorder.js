/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.LineBorder=function(width){draw2d.Border.call(this);this.width=1;if(width){this.width=width;}this.figure=null;};draw2d.LineBorder.prototype=new draw2d.Border;draw2d.LineBorder.prototype.type="LineBorder";draw2d.LineBorder.prototype.dispose=function(){draw2d.Border.prototype.dispose.call(this);this.figure=null;};draw2d.LineBorder.prototype.setLineWidth=function(w){this.width=w;if(this.figure!=null){this.figure.html.style.border=this.getHTMLStyle();}};draw2d.LineBorder.prototype.getHTMLStyle=function(){if(this.getColor()!=null){return this.width+"px solid "+this.getColor().getHTMLStyle();}return this.width+"px solid black";};draw2d.LineBorder.prototype.refresh=function(){this.setLineWidth(this.width);};