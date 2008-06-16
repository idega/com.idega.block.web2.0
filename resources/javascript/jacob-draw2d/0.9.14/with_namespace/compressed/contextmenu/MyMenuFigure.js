/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyMenuFigure=function(){draw2d.Rectangle.call(this);this.setDimension(50,50);this.setBackgroundColor(new draw2d.Color(220,255,255));};draw2d.MyMenuFigure.prototype=new draw2d.Rectangle;draw2d.MyMenuFigure.prototype.getContextMenu=function(){var menu=new draw2d.Menu();var oThis=this;menu.appendMenuItem(new draw2d.MenuItem("Blue",null,function(){oThis.setBackgroundColor(new draw2d.Color(0,0,255));}));menu.appendMenuItem(new draw2d.MenuItem("Green",null,function(){oThis.setBackgroundColor(new draw2d.Color(0,255,0));}));menu.appendMenuItem(new draw2d.MenuItem("Silver",null,function(){oThis.setBackgroundColor(new draw2d.Color(128,128,128));}));menu.appendMenuItem(new draw2d.MenuItem("Black",null,function(){oThis.setBackgroundColor(new draw2d.Color(0,0,0));}));return menu;};