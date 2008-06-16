/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Dimension=function(x,y,w,h){draw2d.Point.call(this,x,y);this.w=w;this.h=h;};draw2d.Dimension.prototype=new draw2d.Point;draw2d.Dimension.prototype.type="Dimension";draw2d.Dimension.prototype.translate=function(dx,dy){this.x+=dx;this.y+=dy;return this;};draw2d.Dimension.prototype.resize=function(dw,dh){this.w+=dw;this.h+=dh;return this;};draw2d.Dimension.prototype.setBounds=function(rect){this.x=rect.x;this.y=rect.y;this.w=rect.w;this.h=rect.h;return this;};draw2d.Dimension.prototype.isEmpty=function(){return this.w<=0||this.h<=0;};draw2d.Dimension.prototype.getWidth=function(){return this.w;};draw2d.Dimension.prototype.getHeight=function(){return this.h;};draw2d.Dimension.prototype.getRight=function(){return this.x+this.w;};draw2d.Dimension.prototype.getBottom=function(){return this.y+this.h;};draw2d.Dimension.prototype.getTopLeft=function(){return new draw2d.Point(this.x,this.y);};draw2d.Dimension.prototype.getCenter=function(){return new draw2d.Point(this.x+this.w/2,this.y+this.h/2);};draw2d.Dimension.prototype.getBottomRight=function(){return new draw2d.Point(this.x+this.w,this.y+this.h);};draw2d.Dimension.prototype.equals=function(o){return this.x==o.x&&this.y==o.y&&this.w==o.w&&this.h==o.h;};