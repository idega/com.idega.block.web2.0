/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ArrowConnectionDecorator=function(){};ArrowConnectionDecorator.prototype=new ConnectionDecorator;ArrowConnectionDecorator.prototype.type="ArrowConnectionDecorator";ArrowConnectionDecorator.prototype.paint=function(g){if(this.backgroundColor!=null){g.setColor(this.backgroundColor);g.fillPolygon([3,20,20,3],[0,5,-5,0]);}g.setColor(this.color);g.setStroke(1);g.drawPolygon([3,20,20,3],[0,5,-5,0]);};