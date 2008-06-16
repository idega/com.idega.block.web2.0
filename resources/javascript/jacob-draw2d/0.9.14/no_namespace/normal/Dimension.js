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
Dimension=function(/*:int*/ x, /*:int*/y, /*:int*/ w, /*:int*/ h)
{
  Point.call(this,x,y);

  /** @private **/
  this.w = w;
  /** @private **/
  this.h = h;
}

Dimension.prototype = new Point;
Dimension.prototype.type="Dimension";


/**
 * Moves this Rectangle horizontally by dx and vertically by dy, then returns 
 * this Rectangle for convenience.
 *
 * @param {int} dx  Shift along X axis
 * @param {int} dy  Shift along Y axis
 * @type  Dimension
 **/
Dimension.prototype.translate=function(/*:int*/ dx, /*:int*/ dy)
{
  this.x +=dx;
  this.y +=dy;
  return this;
}

/**
 * Resizes this Rectangle by the values supplied as input and returns this for 
 * convenience. This Rectangle's width will become this.width + dw. This 
 * Rectangle's height will become this.height + dh.
 *
 * @param {int} dw  Amount by which width is to be resized
 * @param {int} dh  Amount by which height is to be resized
 * @type  Dimension
 **/
Dimension.prototype.resize=function(/*:int*/ dw, /*:int*/ dh)
{
  this.w +=dw;
  this.h +=dh;
  return this;
}

/**
 * Sets the parameters of this Rectangle from the Rectangle passed in and
 * returns this for convenience.
 * 
 * @param {Dimension} Rectangle providing the bounding values
 * @type  Dimension
 */
Dimension.prototype.setBounds=function(/*:Dimension*/ rect)
{
   this.x = rect.x;
   this.y = rect.y;
   this.w = rect.w;
   this.h = rect.h;
   return this;
}

/**
 * Returns <code>true</code> if this Rectangle's width or height is less than or
 * equal to 0.
 * 
 * @type  boolean
 */
Dimension.prototype.isEmpty=function()
{
  return this.w <= 0 || this.h <= 0;
}

/**
 * @type int
 **/
Dimension.prototype.getWidth=function()
{
  return this.w;
}

/**
 * @type int
 **/
Dimension.prototype.getHeight=function()
{
  return this.h;
}

/**
 * @type int
 **/
Dimension.prototype.getRight=function()
{
  return this.x+this.w;
}

/**
 * @type int
 **/
Dimension.prototype.getBottom=function()
{
  return this.y+this.h;
}

/**
 * @type Point
 **/
Dimension.prototype.getTopLeft=function()
{
  return new Point(this.x,this.y);
}

/**
 * @type Point
 **/
Dimension.prototype.getCenter=function()
{
  return new Point(this.x+this.w/2,this.y+this.h/2);
}


/**
 * @type Point
 **/
Dimension.prototype.getBottomRight=function()
{
  return new Point(this.x+this.w,this.y+this.h);
}


/**
 * @type Point
 **/
Dimension.prototype.equals=function(/*:Dimension*/ o)
{
  return this.x==o.x && this.y==o.y && this.w==o.w && this.h==o.h;
}
