/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.PolygonConnectionDecorator=function(){};draw2d.PolygonConnectionDecorator.prototype=new draw2d.ConnectionDecorator;draw2d.PolygonConnectionDecorator.prototype.type="PolygonConnectionDecorator";draw2d.PolygonConnectionDecorator.prototype.paint=function(g){g.setColor(new draw2d.Color(128,255,255));g.fillPolygon([3,15,30,15,3],[0,5,0,-5,0]);g.setColor(new draw2d.Color(128,128,255));g.setStroke(1);g.drawPolygon([3,15,30,15,3],[0,5,0,-5,0]);};