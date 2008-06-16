/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

SVGFigure=function(_41b,_41c){this.bgColor=null;this.lineColor=new Color(0,0,0);this.stroke=1;this.context=null;Node.call(this);if(_41b&&_41c){this.setDimension(_41b,_41c);}};SVGFigure.prototype=new Node;SVGFigure.prototype.type="SVGFigure";SVGFigure.prototype.createHTMLElement=function(){var item=new MooCanvas(this.id,{width:this.getWidth(),height:this.getHeight()});item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.zIndex=""+Figure.ZOrderBaseIndex;this.context=item.getContext("2d");return item;};SVGFigure.prototype.paint=function(){this.context.clearRect(0,0,this.getWidth(),this.getHeight());this.context.fillStyle="rgba(200,0,0,0.3)";this.context.fillRect(0,0,this.getWidth(),this.getHeight());};SVGFigure.prototype.setDimension=function(w,h){Node.prototype.setDimension.call(this,w,h);this.html.width=w;this.html.height=h;if(this.context!=null){this.paint();}};SVGFigure.prototype.setBackgroundColor=function(_420){this.bgColor=_420;if(this.graphics!=null){this.paint();}};SVGFigure.prototype.getBackgroundColor=function(){return this.bgColor;};SVGFigure.prototype.setLineWidth=function(w){this.stroke=w;if(this.context!=null){this.paint();}};SVGFigure.prototype.setColor=function(_422){this.lineColor=_422;if(this.context!=null){this.paint();}};SVGFigure.prototype.getColor=function(){return this.lineColor;};