/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ConnectionDecorator=function(){this.color=new draw2d.Color(0,0,0);this.backgroundColor=new draw2d.Color(250,250,250);};draw2d.ConnectionDecorator.prototype.type="ConnectionDecorator";draw2d.ConnectionDecorator.prototype.paint=function(g){};draw2d.ConnectionDecorator.prototype.setColor=function(c){this.color=c;};draw2d.ConnectionDecorator.prototype.setBackgroundColor=function(c){this.backgroundColor=c;};