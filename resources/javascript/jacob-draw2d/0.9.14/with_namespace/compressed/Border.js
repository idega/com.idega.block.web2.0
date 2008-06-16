/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Border=function(){this.color=null;};draw2d.Border.prototype.type="Border";draw2d.Border.prototype.dispose=function(){this.color=null;};draw2d.Border.prototype.getHTMLStyle=function(){return "";};draw2d.Border.prototype.setColor=function(c){this.color=c;};draw2d.Border.prototype.getColor=function(){return this.color;};draw2d.Border.prototype.refresh=function(){};