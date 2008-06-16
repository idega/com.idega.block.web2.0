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
SnapToHelper=function(/*:Workflow*/ workflow)
{
   this.workflow = workflow;
}

/** North */
SnapToHelper.NORTH =  1;
/** South */
SnapToHelper.SOUTH =  4;
/** West */
SnapToHelper.WEST  =  8;
/** East */
SnapToHelper.EAST  = 16;

/** North-East: a bit-wise OR of {@link #NORTH} and {@link #EAST} */
SnapToHelper.NORTH_EAST = SnapToHelper.NORTH | SnapToHelper.EAST;
/** North-West: a bit-wise OR of {@link #NORTH} and {@link #WEST} */
SnapToHelper.NORTH_WEST = SnapToHelper.NORTH | SnapToHelper.WEST;
/** South-East: a bit-wise OR of {@link #SOUTH} and {@link #EAST} */
SnapToHelper.SOUTH_EAST = SnapToHelper.SOUTH | SnapToHelper.EAST;
/** South-West: a bit-wise OR of {@link #SOUTH} and {@link #WEST} */
SnapToHelper.SOUTH_WEST = SnapToHelper.SOUTH | SnapToHelper.WEST;
/** North-South: a bit-wise OR of {@link #NORTH} and {@link #SOUTH} */
SnapToHelper.NORTH_SOUTH = SnapToHelper.NORTH | SnapToHelper.SOUTH;
/** East-West: a bit-wise OR of {@link #EAST} and {@link #WEST} */
SnapToHelper.EAST_WEST = SnapToHelper.EAST | SnapToHelper.WEST;
/** North-South-East-West: a bit-wise OR of all 4 directions. */
SnapToHelper.NSEW = SnapToHelper.NORTH_SOUTH | SnapToHelper.EAST_WEST;


/**
 * Applies a snapping correction to the given result. Snapping can occur in the four
 * primary directions: NORTH, SOUTH, EAST, WEST, as defined.
 *
 * By default a Point is treated as an empty Rectangle. Only NORTH and WEST should be used
 * in general.  But SOUTH and EAST may also be used.
 */
SnapToHelper.prototype.snapPoint=function(/*:int*/ snapOrientation, /*:Point*/ inputPoint,  /*:Point*/ resultPoint)
{
   return inputPoint;
}

/**
 * Applies a snap correction to a Rectangle based on a given Rectangle.  The provided
 * inputBounds will be used as a reference for snapping. The correction is applied to
 * the result field (resultBounds).
 */
SnapToHelper.prototype.snapRectangle=function(/*:Dimension*/ inputBounds,  /*:Dimension*/ resultBounds)
{
    return inputBounds;
}

/**
 * Callback method from the framework if the workflow document has been changed.
 * @private
 **/
SnapToHelper.prototype.onSetDocumentDirty=function()
{
  // do nothing per default
}
