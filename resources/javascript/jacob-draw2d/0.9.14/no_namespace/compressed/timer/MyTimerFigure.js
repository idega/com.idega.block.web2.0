/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyTimerFigure=function(_1c4){Rectangle.call(this);this.setDimension(50,50);this.setBackgroundColor(new Color(220,255,255));var _1c5=this;var func=function(){_1c5.toggle();};this.timer=window.setInterval(func,_1c4);this.highlight=false;};MyTimerFigure.prototype=new Rectangle;MyTimerFigure.prototype.type="MyTimerFigure";MyTimerFigure.prototype.dispose=function(){Rectangle.prototype.dispose.call(this);window.clearInterval(this.timer);};MyTimerFigure.prototype.toggle=function(){if(this.highlight){this.setBackgroundColor(new Color(245,115,115));}else{this.setBackgroundColor(new Color(115,245,115));}this.highlight=!this.highlight;};