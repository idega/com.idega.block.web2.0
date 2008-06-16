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
draw2d.Dimension=function(/*:int*/ x, /*:int*/y, /*:int*/ w, /*:int*/ h)
{
  draw2d.Point.call(this,x,y);

  /** @private **/
  this.w = w;
  /** @private **/
  this.h = h;
}

draw2d.Dimension.prototype = new draw2d.Point;
draw2d.Dimension.prototype.type="Dimension";


/**
 * Moves this Rectangle horizontally by dx and vertically by dy, then returns 
 * this Rectangle for convenience.
 *
 * @param {int} dx  Shift along X axis
 * @param {int} dy  Shift along Y axis
 * @type  draw2d.Dimension
 **/
draw2d.Dimension.prototype.translate=function(/*:int*/ dx, /*:int*/ dy)
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
 * @type  draw2d.Dimension
 **/
draw2d.Dimension.prototype.resize=function(/*:int*/ dw, /*:int*/ dh)
{
  this.w +=dw;
  this.h +=dh;
  return this;
}

/**
 * Sets the parameters of this Rectangle from the Rectangle passed in and
 * returns this for convenience.
 * 
 * @param {draw2d.Dimension} Rectangle providing the bounding values
 * @type  draw2d.Dimension
 */
draw2d.Dimension.prototype.setBounds=function(/*:draw2d.Dimension*/ rect)
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
draw2d.Dimension.prototype.isEmpty=function()
{
  return this.w <= 0 || this.h <= 0;
}

/**
 * @type int
 **/
draw2d.Dimension.prototype.getWidth=function()
{
  return this.w;
}

/**
 * @type int
 **/
draw2d.Dimension.prototype.getHeight=function()
{
  return this.h;
}

/**
 * @type int
 **/
draw2d.Dimension.prototype.getRight=function()
{
  return this.x+this.w;
}

/**
 * @type int
 **/
draw2d.Dimension.prototype.getBottom=function()
{
  return this.y+this.h;
}

/**
 * @type draw2d.Point
 **/
draw2d.Dimension.prototype.getTopLeft=function()
{
  return new draw2d.Point(this.x,this.y);
}

/**
 * @type draw2d.Point
 **/
draw2d.Dimension.prototype.getCenter=function()
{
  return new draw2d.Point(this.x+this.w/2,this.y+this.h/2);
}


/**
 * @type draw2d.Point
 **/
draw2d.Dimension.prototype.getBottomRight=function()
{
  return new draw2d.Point(this.x+this.w,this.y+this.h);
}


/**
 * @type draw2d.Point
 **/
draw2d.Dimension.prototype.equals=function(/*:draw2d.Dimension*/ o)
{
  return this.x==o.x && this.y==o.y && this.w==o.w && this.h==o.h;
}
