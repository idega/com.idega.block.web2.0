/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ConnectionRouter=function(){};ConnectionRouter.prototype.type="ConnectionRouter";ConnectionRouter.prototype.getDirection=function(r,p){var _12f2=Math.abs(r.x-p.x);var _12f3=3;var i=Math.abs(r.y-p.y);if(i<=_12f2){_12f2=i;_12f3=0;}i=Math.abs(r.getBottom()-p.y);if(i<=_12f2){_12f2=i;_12f3=2;}i=Math.abs(r.getRight()-p.x);if(i<_12f2){_12f2=i;_12f3=1;}return _12f3;};ConnectionRouter.prototype.getEndDirection=function(conn){var p=conn.getEndPoint();var rect=conn.getTarget().getParent().getBounds();return this.getDirection(rect,p);};ConnectionRouter.prototype.getStartDirection=function(conn){var p=conn.getStartPoint();var rect=conn.getSource().getParent().getBounds();return this.getDirection(rect,p);};ConnectionRouter.prototype.route=function(_12fb){};