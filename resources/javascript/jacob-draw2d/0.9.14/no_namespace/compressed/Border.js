/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Border=function(){this.color=null;};Border.prototype.type="Border";Border.prototype.dispose=function(){this.color=null;};Border.prototype.getHTMLStyle=function(){return "";};Border.prototype.setColor=function(c){this.color=c;};Border.prototype.getColor=function(){return this.color;};Border.prototype.refresh=function(){};