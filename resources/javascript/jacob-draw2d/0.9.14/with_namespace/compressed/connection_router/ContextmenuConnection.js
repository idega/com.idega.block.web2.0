/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ContextmenuConnection=function(){draw2d.Connection.call(this);this.sourcePort=null;this.targetPort=null;this.lineSegments=new Array();this.setColor(new draw2d.Color(128,128,255));this.setLineWidth(1);};draw2d.ContextmenuConnection.prototype=new draw2d.Connection();draw2d.ContextmenuConnection.prototype.getContextMenu=function(){var menu=new draw2d.Menu();var oThis=this;menu.appendMenuItem(new draw2d.MenuItem("NULL Router",null,function(){oThis.setRouter(null);}));menu.appendMenuItem(new draw2d.MenuItem("Manhatten Router",null,function(){oThis.setRouter(new draw2d.ManhattanConnectionRouter());}));menu.appendMenuItem(new draw2d.MenuItem("Bezier Router",null,function(){oThis.setRouter(new draw2d.BezierConnectionRouter());}));menu.appendMenuItem(new draw2d.MenuItem("Fan Router",null,function(){oThis.setRouter(new draw2d.FanConnectionRouter());}));return menu;};