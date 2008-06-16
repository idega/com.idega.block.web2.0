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
draw2d.Circle=function(/*:int*/ radius)
{
  draw2d.Oval.call(this);
  if(radius)
    this.setDimension(radius,radius);
}

draw2d.Circle.prototype = new draw2d.Oval;
/** @private **/
draw2d.Circle.prototype.type="Circle";


/**
 * It is not possible to set different values widht and height for a circle. The 
 * greater value of w and h will be used only.
 * 
 * @see draw2d.VectorFigure#setDimension
 * @param {int} w The new width of the circle.
 * @param {int} h The new height of the circle.
 **/
draw2d.Circle.prototype.setDimension=function(/*:int*/ w, /*:int*/ h)
{
  if(w>h)
     draw2d.Oval.prototype.setDimension.call(this,w,w);
  else
     draw2d.Oval.prototype.setDimension.call(this,h,h);
}

/**
 * A Circle can't streched. In this case this method returns always false. So - no resize handles at the top, 
 * bottom,left and the right are visible.<br>
 *
 * @returns Returns always false. It is not possible to strech a circle. Use {@link draw2d.Oval} instead.
 * @type boolean
 */
draw2d.Circle.prototype.isStrechable=function()
{
  return false;
}
