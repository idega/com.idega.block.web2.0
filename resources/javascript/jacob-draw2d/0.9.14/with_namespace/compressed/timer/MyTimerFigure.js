/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyTimerFigure=function(delay){draw2d.Rectangle.call(this);this.setDimension(50,50);this.setBackgroundColor(new draw2d.Color(220,255,255));var oThis=this;var func=function(){oThis.toggle();};this.timer=window.setInterval(func,delay);this.highlight=false;};draw2d.MyTimerFigure.prototype=new draw2d.Rectangle;draw2d.MyTimerFigure.prototype.type="MyTimerFigure";draw2d.MyTimerFigure.prototype.dispose=function(){draw2d.Rectangle.prototype.dispose.call(this);window.clearInterval(this.timer);};draw2d.MyTimerFigure.prototype.toggle=function(){if(this.highlight){this.setBackgroundColor(new draw2d.Color(245,115,115));}else{this.setBackgroundColor(new draw2d.Color(115,245,115));}this.highlight=!this.highlight;};