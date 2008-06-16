/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

FanConnectionRouter=function(){};FanConnectionRouter.prototype=new NullConnectionRouter;FanConnectionRouter.prototype.type="FanConnectionRouter";FanConnectionRouter.prototype.route=function(conn){var _1431=conn.getStartPoint();var toPt=conn.getEndPoint();var lines=conn.getSource().getConnections();var _1434=new ArrayList();var index=0;for(var i=0;i<lines.getSize();i++){var _1437=lines.get(i);if(_1437.getTarget()==conn.getTarget()||_1437.getSource()==conn.getTarget()){_1434.add(_1437);if(conn==_1437){index=_1434.getSize();}}}if(_1434.getSize()>1){this.routeCollision(conn,index);}else{NullConnectionRouter.prototype.route.call(this,conn);}};FanConnectionRouter.prototype.routeNormal=function(conn){conn.addPoint(conn.getStartPoint());conn.addPoint(conn.getEndPoint());};FanConnectionRouter.prototype.routeCollision=function(conn,index){var start=conn.getStartPoint();var end=conn.getEndPoint();conn.addPoint(start);var _143d=10;var _143e=new Point((end.x+start.x)/2,(end.y+start.y)/2);var _143f=end.getPosition(start);var ray;if(_143f==PositionConstants.SOUTH||_143f==PositionConstants.EAST){ray=new Point(end.x-start.x,end.y-start.y);}else{ray=new Point(start.x-end.x,start.y-end.y);}var _1441=Math.sqrt(ray.x*ray.x+ray.y*ray.y);var _1442=_143d*ray.x/_1441;var _1443=_143d*ray.y/_1441;var _1444;if(index%2==0){_1444=new Point(_143e.x+(index/2)*(-1*_1443),_143e.y+(index/2)*_1442);}else{_1444=new Point(_143e.x+(index/2)*_1443,_143e.y+(index/2)*(-1*_1442));}conn.addPoint(_1444);conn.addPoint(end);};