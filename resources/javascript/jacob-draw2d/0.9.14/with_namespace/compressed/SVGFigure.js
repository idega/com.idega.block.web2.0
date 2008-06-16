/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SVGFigure=function(width,_2c58){this.bgColor=null;this.lineColor=new draw2d.Color(0,0,0);this.stroke=1;this.context=null;draw2d.Node.call(this);if(width&&_2c58){this.setDimension(width,_2c58);}};draw2d.SVGFigure.prototype=new draw2d.Node;draw2d.SVGFigure.prototype.type="SVGFigure";draw2d.SVGFigure.prototype.createHTMLElement=function(){var item=new MooCanvas(this.id,{width:this.getWidth(),height:this.getHeight()});item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;this.context=item.getContext("2d");return item;};draw2d.SVGFigure.prototype.paint=function(){this.context.clearRect(0,0,this.getWidth(),this.getHeight());this.context.fillStyle="rgba(200,0,0,0.3)";this.context.fillRect(0,0,this.getWidth(),this.getHeight());};draw2d.SVGFigure.prototype.setDimension=function(w,h){draw2d.Node.prototype.setDimension.call(this,w,h);this.html.width=w;this.html.height=h;if(this.context!=null){this.paint();}};draw2d.SVGFigure.prototype.setBackgroundColor=function(color){this.bgColor=color;if(this.graphics!=null){this.paint();}};draw2d.SVGFigure.prototype.getBackgroundColor=function(){return this.bgColor;};draw2d.SVGFigure.prototype.setLineWidth=function(w){this.stroke=w;if(this.context!=null){this.paint();}};draw2d.SVGFigure.prototype.setColor=function(color){this.lineColor=color;if(this.context!=null){this.paint();}};draw2d.SVGFigure.prototype.getColor=function(){return this.lineColor;};