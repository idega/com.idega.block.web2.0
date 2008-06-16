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
draw2d.ConnectionRouter=function()
{
}

draw2d.ConnectionRouter.prototype.type="ConnectionRouter";


/**
 * Returns the direction the point <i>p</i> is in relation to the given rectangle.
 * Possible values are LEFT (-1,0), RIGHT (1,0), UP (0,-1) and DOWN (0,1).
 * 
 * @param r the rectangle
 * @param p the point
 * @return the direction from <i>r</i> to <i>p</i>
 */
draw2d.ConnectionRouter.prototype.getDirection=function(/*:draw2d.Dimension*/ r, /*:draw2d.Point*/ p) 
{
    //  up     -> 0
    //  right  -> 1
    //  down   -> 2
    //  left   -> 3
   var distance = Math.abs(r.x - p.x);
   var direction = 3;

   var i=Math.abs(r.y - p.y);
   if (i <= distance) 
   {
      distance = i;
      direction = 0;
   }

   i = Math.abs(r.getBottom() - p.y);
   if (i <= distance) 
   {
      distance = i;
      direction = 2;
   }

   i = Math.abs(r.getRight() - p.x);
   if (i < distance) 
   {
      distance = i;
      direction = 1;
   }

   return direction;
}

draw2d.ConnectionRouter.prototype.getEndDirection=function(/*:draw2d.Connection*/ conn)
{
   var p = conn.getEndPoint();
   var rect = conn.getTarget().getParent().getBounds();
   return this.getDirection(rect, p);
}



draw2d.ConnectionRouter.prototype.getStartDirection=function(/*:draw2d.Connection*/ conn)
{
   var p = conn.getStartPoint();
   var rect = conn.getSource().getParent().getBounds();
   return this.getDirection(rect, p);
}


/**
 * Routes the Connection.
 * @param connection The Connection to route
 */
draw2d.ConnectionRouter.prototype.route=function(/*:draw2d.Connection*/ connection)
{
}
