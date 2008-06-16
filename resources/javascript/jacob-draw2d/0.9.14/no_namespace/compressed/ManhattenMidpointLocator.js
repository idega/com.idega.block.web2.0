/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ManhattenMidpointLocator=function(_ef8){ConnectionLocator.call(this,_ef8);};ManhattenMidpointLocator.prototype=new ConnectionLocator;ManhattenMidpointLocator.prototype.type="ManhattenMidpointLocator";ManhattenMidpointLocator.prototype.relocate=function(_ef9){var conn=this.getConnection();var p=new Point();var _efc=conn.getPoints();var _efd=Math.floor((_efc.getSize()-2)/2);var p1=_efc.get(_efd);var p2=_efc.get(_efd+1);p.x=(p2.x-p1.x)/2+p1.x+5;p.y=(p2.y-p1.y)/2+p1.y+5;_ef9.setPosition(p.x,p.y);};