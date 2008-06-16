/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Dimension=function(x,y,w,h){Point.call(this,x,y);this.w=w;this.h=h;};Dimension.prototype=new Point;Dimension.prototype.type="Dimension";Dimension.prototype.translate=function(dx,dy){this.x+=dx;this.y+=dy;return this;};Dimension.prototype.resize=function(dw,dh){this.w+=dw;this.h+=dh;return this;};Dimension.prototype.setBounds=function(rect){this.x=rect.x;this.y=rect.y;this.w=rect.w;this.h=rect.h;return this;};Dimension.prototype.isEmpty=function(){return this.w<=0||this.h<=0;};Dimension.prototype.getWidth=function(){return this.w;};Dimension.prototype.getHeight=function(){return this.h;};Dimension.prototype.getRight=function(){return this.x+this.w;};Dimension.prototype.getBottom=function(){return this.y+this.h;};Dimension.prototype.getTopLeft=function(){return new Point(this.x,this.y);};Dimension.prototype.getCenter=function(){return new Point(this.x+this.w/2,this.y+this.h/2);};Dimension.prototype.getBottomRight=function(){return new Point(this.x+this.w,this.y+this.h);};Dimension.prototype.equals=function(o){return this.x==o.x&&this.y==o.y&&this.w==o.w&&this.h==o.h;};