/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ManhattenMidpointLocator=function(_1663){draw2d.ConnectionLocator.call(this,_1663);};draw2d.ManhattenMidpointLocator.prototype=new draw2d.ConnectionLocator;draw2d.ManhattenMidpointLocator.prototype.type="ManhattenMidpointLocator";draw2d.ManhattenMidpointLocator.prototype.relocate=function(_1664){var conn=this.getConnection();var p=new draw2d.Point();var _1667=conn.getPoints();var index=Math.floor((_1667.getSize()-2)/2);var p1=_1667.get(index);var p2=_1667.get(index+1);p.x=(p2.x-p1.x)/2+p1.x+5;p.y=(p2.y-p1.y)/2+p1.y+5;_1664.setPosition(p.x,p.y);};