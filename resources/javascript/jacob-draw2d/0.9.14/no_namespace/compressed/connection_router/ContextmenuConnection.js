/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ContextmenuConnection=function(){Connection.call(this);this.sourcePort=null;this.targetPort=null;this.lineSegments=new Array();this.setColor(new Color(128,128,255));this.setLineWidth(1);};ContextmenuConnection.prototype=new Connection();ContextmenuConnection.prototype.getContextMenu=function(){var menu=new Menu();var oThis=this;menu.appendMenuItem(new MenuItem("NULL Router",null,function(){oThis.setRouter(null);}));menu.appendMenuItem(new MenuItem("Manhatten Router",null,function(){oThis.setRouter(new ManhattanConnectionRouter());}));menu.appendMenuItem(new MenuItem("Bezier Router",null,function(){oThis.setRouter(new BezierConnectionRouter());}));menu.appendMenuItem(new MenuItem("Fan Router",null,function(){oThis.setRouter(new FanConnectionRouter());}));return menu;};