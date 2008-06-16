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
draw2d.ManhattanConnectionRouter=function()
{
   this.MINDIST = 20;
}

draw2d.ManhattanConnectionRouter.prototype = new draw2d.ConnectionRouter;
draw2d.ManhattanConnectionRouter.prototype.type="ManhattanConnectionRouter";



/**
 * @see draw2d.ConnectionRouter#route(Connection)
 */
draw2d.ManhattanConnectionRouter.prototype.route=function(/*:draw2d.Connection*/ conn)
{
   var fromPt  = conn.getStartPoint();
   var fromDir = this.getStartDirection(conn);

   var toPt    = conn.getEndPoint();
   var toDir   = this.getEndDirection(conn);

   // draw a line between the two points.
   this._route(conn,toPt, toDir, fromPt, fromDir);
}

draw2d.ManhattanConnectionRouter.prototype._route=function(/*:draw2d.Connection*/ conn,/*:draw2d.Point*/ fromPt, /*:int*/fromDir, /*:draw2d.Point*/toPt, /*:int*/toDir)
{
   var TOL     = 0.1;
   var TOLxTOL = 0.01;

   // fromPt is an x,y to start from.  
   // fromDir is an angle that the first link must 
   //
   var UP   = 0;
   var RIGHT= 1;
   var DOWN = 2;
   var LEFT = 3;

   var xDiff = fromPt.x - toPt.x;
   var yDiff = fromPt.y - toPt.y;
   var point;
   var dir;

   if (((xDiff * xDiff) < (TOLxTOL)) && ((yDiff * yDiff) < (TOLxTOL))) 
   {
      conn.addPoint(new draw2d.Point(toPt.x, toPt.y));
      return;
   }

   if (fromDir == LEFT) 
   {
      if ((xDiff > 0) && ((yDiff * yDiff) < TOL) && (toDir == RIGHT))
      {
         point = toPt;
         dir = toDir;
      } 
      else 
      {
         if (xDiff < 0) 
         {
            point = new draw2d.Point(fromPt.x - this.MINDIST, fromPt.y);
         }
         else if (((yDiff > 0) && (toDir == DOWN)) || ((yDiff < 0) && (toDir == UP))) 
         {
            point = new draw2d.Point(toPt.x, fromPt.y);
         }
         else if (fromDir == toDir)
         {
            var pos = Math.min(fromPt.x, toPt.x) - this.MINDIST;
            point = new draw2d.Point(pos, fromPt.y);
         }
         else
         {
            point = new draw2d.Point(fromPt.x - (xDiff / 2), fromPt.y);
         }

         if (yDiff > 0) 
         {
            dir = UP;
         }
         else
         {
            dir = DOWN;
         }
      }
   }
   else if (fromDir == RIGHT) 
   {
      if ((xDiff < 0) && ((yDiff * yDiff) < TOL)&& (toDir == LEFT)) 
      {
         point = toPt;
         dir = toDir;
      } 
      else 
      {
         if (xDiff > 0) 
         {
           point = new draw2d.Point(fromPt.x + this.MINDIST, fromPt.y);
         } 
         else if (((yDiff > 0) && (toDir == DOWN)) || ((yDiff < 0) && (toDir == UP))) 
         {
            point = new draw2d.Point(toPt.x, fromPt.y);
         } 
         else if (fromDir == toDir) 
         {
            var pos = Math.max(fromPt.x, toPt.x) + this.MINDIST;
            point = new draw2d.Point(pos, fromPt.y);
         } 
         else 
         {
               point = new draw2d.Point(fromPt.x - (xDiff / 2), fromPt.y);
         }

         if (yDiff > 0) 
            dir = UP;
         else
            dir = DOWN;
      }
   } 
   else if (fromDir == DOWN) 
   {
      if (((xDiff * xDiff) < TOL) && (yDiff < 0)&& (toDir == UP)) 
      {
         point = toPt;
         dir = toDir;
      } 
      else 
      {
         if (yDiff > 0) 
         {
            point = new draw2d.Point(fromPt.x, fromPt.y + this.MINDIST);
         } 
         else if (((xDiff > 0) && (toDir == RIGHT)) || ((xDiff < 0) && (toDir == LEFT))) 
         {
           point = new draw2d.Point(fromPt.x, toPt.y);
         } 
         else if (fromDir == toDir) 
         {
            var pos = Math.max(fromPt.y, toPt.y) + this.MINDIST;
            point = new draw2d.Point(fromPt.x, pos);
         } 
         else 
         {
            point = new draw2d.Point(fromPt.x, fromPt.y - (yDiff / 2));
         }

         if (xDiff > 0) 
            dir = LEFT;
         else 
            dir = RIGHT;
      }
   } 
   else if (fromDir == UP) 
   {
      if (((xDiff * xDiff) < TOL) && (yDiff > 0) && (toDir == DOWN)) 
      {
         point = toPt;
         dir = toDir;
      } 
      else 
      {
         if (yDiff < 0) 
         {
            point = new draw2d.Point(fromPt.x, fromPt.y - this.MINDIST);
         } 
         else if (((xDiff > 0) && (toDir == RIGHT)) || ((xDiff < 0) && (toDir == LEFT))) 
         {
            point = new draw2d.Point(fromPt.x, toPt.y);
         } 
         else if (fromDir == toDir) 
         {
            var pos = Math.min(fromPt.y, toPt.y) - this.MINDIST;
            point = new draw2d.Point(fromPt.x, pos);
         } 
         else 
         {
            point = new draw2d.Point(fromPt.x, fromPt.y - (yDiff / 2));
         }

         if (xDiff > 0)
            dir = LEFT;
         else
            dir = RIGHT;
      }
   }
   this._route(conn,point, dir, toPt, toDir);
   conn.addPoint(fromPt);
}