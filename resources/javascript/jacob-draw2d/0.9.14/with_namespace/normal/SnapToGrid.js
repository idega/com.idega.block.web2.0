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
draw2d.SnapToGrid=function(/*:draw2d.Workflow*/ workflow)
{
   draw2d.SnapToHelper.call(this,workflow);
}

draw2d.SnapToGrid.prototype = new draw2d.SnapToHelper;

/**
 * Applies a snapping correction to the given result. Snapping can occur in the four
 * primary directions: NORTH, SOUTH, EAST, WEST, as defined on {@link draw2d.PositionConstants}.
 * By default a Point is treated as an empty Rectangle. Only NORTH and WEST should be used
 * in general.  But SOUTH and EAST may also be used.  Similarly, VERTICAL and HORIZONTAL
 * may be used to allow a point to snap to the "center" or "middle" as defined by the
 * concrete subclass.
 */
draw2d.SnapToGrid.prototype.snapPoint=function(/*:int*/ direction, /*:draw2d.Point*/ inputPoint, /*:draw2d.Point*/ resultPoint)
{
  resultPoint.x=this.workflow.gridWidthX*Math.floor(((inputPoint.x + this.workflow.gridWidthX/2.0) / this.workflow.gridWidthX));
  resultPoint.y=this.workflow.gridWidthY*Math.floor(((inputPoint.y + this.workflow.gridWidthY/2.0) / this.workflow.gridWidthY));
  return 0;
}

/**
 * Applies a snap correction to a Rectangle based on a given Rectangle.  The provided
 * baseRect will be used as a reference for snapping.  The types of snapping to be
 * performed are indicated by the snapOrientation parameter. The correction is applied to
 * the result field.
 * <P>
 * All coordinate information received and returned by this method should be in absolute 
 * coordinates.
 */
draw2d.SnapToGrid.prototype.snapRectangle=function(/*:draw2d.Dimension*/ inputBounds,  /*:draw2d.Dimension*/ resultBounds)
{
    resultBounds.x = inputBounds.x;
    resultBounds.y = inputBounds.y;
    resultBounds.w = inputBounds.w;
    resultBounds.h = inputBounds.h;
    return 0;
}
