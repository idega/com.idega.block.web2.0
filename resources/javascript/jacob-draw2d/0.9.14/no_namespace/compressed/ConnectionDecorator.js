/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ConnectionDecorator=function(){this.color=new Color(0,0,0);this.backgroundColor=new Color(250,250,250);};ConnectionDecorator.prototype.type="ConnectionDecorator";ConnectionDecorator.prototype.paint=function(g){};ConnectionDecorator.prototype.setColor=function(c){this.color=c;};ConnectionDecorator.prototype.setBackgroundColor=function(c){this.backgroundColor=c;};