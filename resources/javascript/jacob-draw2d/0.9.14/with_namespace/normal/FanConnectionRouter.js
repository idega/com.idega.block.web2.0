/* This notice must be untouched at all times.

Open-jACOB Draw2D
The latest version is available at
http://www.openjacob.org

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/

/**
 * @class Routes a {@link draw2d.Connection}, possibly using a constraint.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.FanConnectionRouter=function()
{
}

draw2d.FanConnectionRouter.prototype = new draw2d.NullConnectionRouter;
draw2d.FanConnectionRouter.prototype.type="FanConnectionRouter";



/**
 * @see draw2d.ConnectionRouter#route(Connection)
 */
draw2d.FanConnectionRouter.prototype.route=function(/*:draw2d.Connection*/ conn)
{
   var fromPt  = conn.getStartPoint();
   var toPt    = conn.getEndPoint();

   var lines = conn.getSource().getConnections();
   var connections = new draw2d.ArrayList();
   var index=0;
   for(var i=0;i<lines.getSize();i++)
   {
      var figure = lines.get(i);
      if(figure.getTarget()==conn.getTarget() || figure.getSource()==conn.getTarget() )
      {
         connections.add(figure);
         if(conn==figure)
           index=connections.getSize();
      }
   }
   if(connections.getSize()>1)
     this.routeCollision(conn,index);
   else
     draw2d.NullConnectionRouter.prototype.route.call(this,conn);
}

draw2d.FanConnectionRouter.prototype.routeNormal=function(/*:draw2d.Connection*/ conn)
{
   conn.addPoint(conn.getStartPoint());
   conn.addPoint(conn.getEndPoint());
}

draw2d.FanConnectionRouter.prototype.routeCollision=function(/*:draw2d.Connection*/ conn, /*:int*/ index)
{
   var start = conn.getStartPoint();
   var end = conn.getEndPoint();

   conn.addPoint(start);

   var separation = 10;


   var midPoint = new draw2d.Point((end.x + start.x) / 2, (end.y + start.y) / 2);
   var position = end.getPosition(start);
   var ray;
   if (position ==draw2d.PositionConstants.SOUTH || position == draw2d.PositionConstants.EAST)
      ray = new draw2d.Point( end.x - start.x, end.y - start.y);
   else
      ray = new draw2d.Point( start.x - end.x, start.y - end.y);

   var length = Math.sqrt(ray.x*ray.x+ray.y*ray.y);

   var xSeparation = separation * ray.x / length;
   var ySeparation = separation * ray.y / length;

   var bendPoint;

   if (index % 2 == 0)
      bendPoint = new draw2d.Point( midPoint.x + (index / 2) * (-1 * ySeparation), midPoint.y + (index / 2) * xSeparation);
   else
      bendPoint = new draw2d.Point(midPoint.x + (index / 2) * ySeparation, midPoint.y + (index / 2) * (-1 * xSeparation));

   conn.addPoint(bendPoint);

   conn.addPoint(end);
}