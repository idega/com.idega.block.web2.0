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
 * 
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.Point=function(/*:int*/ x,/*:int*/y)
{
  /** @private **/
  this.x = x;
  /** @private **/
  this.y = y;
}
draw2d.Point.prototype.type="Point";

/**
 * @type int
 **/
draw2d.Point.prototype.getX=function()
{
  return this.x;
}

/**
 * @type int
 **/
draw2d.Point.prototype.getY=function()
{
  return this.y;
}


/**
 * Calculates the relative position of the specified Point to this Point.
 * @param p The reference Point
 * @return NORTH, SOUTH, EAST, or WEST, as defined in {@link draw2d.PositionConstants}
 */
draw2d.Point.prototype.getPosition=function(/*:draw2d.Point*/ p)
{
   var dx = p.x - this.x;
   var dy = p.y - this.y;
   if (Math.abs(dx) > Math.abs(dy)) 
   {
      if (dx < 0)
            return draw2d.PositionConstants.WEST;
      return draw2d.PositionConstants.EAST;
   }
   if (dy < 0)
      return draw2d.PositionConstants.NORTH;
   return draw2d.PositionConstants.SOUTH;
}


/**
 * @type boolean
 **/
draw2d.Point.prototype.equals=function(/*:draw2d.Point*/ o)
{
  return this.x==o.x && this.y==o.y;
}


/**
 * @type float
 **/
draw2d.Point.prototype.getDistance=function(/*:draw2d.Point*/ other)
{
  return Math.sqrt((this.x-other.x)*(this.x-other.x)+(this.y-other.y)*(this.y-other.y));
}

/**
 * @type float
 **/
draw2d.Point.prototype.getTranslated=function(/*:draw2d.Point*/ other)
{
  return new draw2d.Point(this.x+other.x, this.y+other.y);
}
