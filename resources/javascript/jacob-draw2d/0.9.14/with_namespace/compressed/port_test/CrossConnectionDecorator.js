/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CrossConnectionDecorator=function(){};draw2d.CrossConnectionDecorator.prototype=new draw2d.ConnectionDecorator;draw2d.CrossConnectionDecorator.prototype.paint=function(g){g.drawLine(15,8,15,-8);};