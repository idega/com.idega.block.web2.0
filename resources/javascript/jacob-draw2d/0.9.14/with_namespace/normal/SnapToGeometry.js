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
draw2d.SnapToGeometry=function(/*:draw2d.Workflow*/ workflow)
{
   draw2d.SnapToHelper.call(this,workflow);
}
draw2d.SnapToGeometry.prototype = new draw2d.SnapToHelper;

draw2d.SnapToGeometry.THRESHOLD = 5.0;

/**
 * Applies a snapping correction to the given result. Snapping can occur in the four
 * primary directions: NORTH, SOUTH, EAST, WEST, as defined.
 *
 * By default a Point is treated as an empty Rectangle. Only NORTH and WEST should be used
 * in general.  But SOUTH and EAST may also be used.
 */
draw2d.SnapToGeometry.prototype.snapPoint=function(/*:int*/ snapOrientation, /*:draw2d.Point*/ inputPoint,  /*:draw2d.Point*/ resultPoint)
{
   if(this.rows==null || this.cols==null)
     this.populateRowsAndCols();

   if ((snapOrientation & draw2d.SnapToHelper.EAST) != 0) 
   {
      var rightCorrection = this.getCorrectionFor(this.cols, inputPoint.getX() - 1, 1);
      if (rightCorrection != draw2d.SnapToGeometry.THRESHOLD) 
      {
         snapOrientation &= ~draw2d.SnapToHelper.EAST;
         resultPoint.x += rightCorrection;
      }
   }

   if ((snapOrientation & draw2d.SnapToHelper.WEST) != 0) 
   {
      var leftCorrection = this.getCorrectionFor(this.cols, inputPoint.getX(), -1);
      if (leftCorrection != draw2d.SnapToGeometry.THRESHOLD) 
      {
         snapOrientation &= ~draw2d.SnapToHelper.WEST;
         resultPoint.x += leftCorrection;
      }
   }

   if ((snapOrientation & draw2d.SnapToHelper.SOUTH) != 0) 
   {
      var bottomCorrection = this.getCorrectionFor(this.rows,  inputPoint.getY() - 1, 1);
      if (bottomCorrection != draw2d.SnapToGeometry.THRESHOLD) 
      {
         snapOrientation &= ~draw2d.SnapToHelper.SOUTH;
         resultPoint.y += bottomCorrection;
      }
   }

   if ((snapOrientation & draw2d.SnapToHelper.NORTH) != 0) 
   {
      var topCorrection = this.getCorrectionFor(this.rows, inputPoint.getY(), -1);
      if (topCorrection != draw2d.SnapToGeometry.THRESHOLD) 
      {
         snapOrientation &= ~draw2d.SnapToHelper.NORTH;
         resultPoint.y += topCorrection;
      }
   }

  return snapOrientation;
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
draw2d.SnapToGeometry.prototype.snapRectangle=function( /*:draw2d.Dimension*/ inputBounds,  /*:draw2d.Dimension*/ resultBounds)
{
    var topLeftResult     = inputBounds.getTopLeft();
    var bottomRightResult = inputBounds.getBottomRight();

    var snapDirectionsTopLeft = this.snapPoint(draw2d.SnapToHelper.NORTH_WEST, inputBounds.getTopLeft(), topLeftResult);
    resultBounds.x = topLeftResult.x;
    resultBounds.y = topLeftResult.y

    var snapDirectionsBottomRight = this.snapPoint(draw2d.SnapToHelper.SOUTH_EAST, inputBounds.getBottomRight(), bottomRightResult);
    // the first test (topLeft) has not modified the point. so we can modify them with the bottomRight adjustment
    //
    if(snapDirectionsTopLeft & draw2d.SnapToHelper.WEST)
      resultBounds.x = bottomRightResult.x-inputBounds.getWidth();

    // the first test (topLeft) has not modified the point. so we can modify them with the bottomRight adjustment
    //
    if(snapDirectionsTopLeft & draw2d.SnapToHelper.NORTH)
       resultBounds.y = bottomRightResult.y-inputBounds.getHeight();


    return snapDirectionsTopLeft |snapDirectionsBottomRight;
}


/**
 * Updates the cached row and column Entries using the provided parts.
 * @since 3.0
 * @param parts a List of EditParts
 */
draw2d.SnapToGeometry.prototype.populateRowsAndCols=function()
{
   this.rows = new Array();
   this.cols = new Array();
   var figures = this.workflow.getDocument().getFigures();
   var index =0;
   for (var i = 0; i < figures.getSize();i++ )
   {
      var figure = figures.get(i);
      if(figure != this.workflow.getCurrentSelection())
      {
         var bounds = figure.getBounds();
         this.cols[index * 3] = new draw2d.SnapToGeometryEntry(-1, bounds.getX());
         this.rows[index * 3] = new draw2d.SnapToGeometryEntry(-1, bounds.getY());
         this.cols[index * 3 + 1] = new draw2d.SnapToGeometryEntry(0, bounds.x + (bounds.getWidth() - 1) / 2);
         this.rows[index * 3 + 1] = new draw2d.SnapToGeometryEntry(0, bounds.y + (bounds.getHeight() - 1) / 2);
         this.cols[index * 3 + 2] = new draw2d.SnapToGeometryEntry(1, bounds.getRight() - 1);
         this.rows[index * 3 + 2] = new draw2d.SnapToGeometryEntry(1, bounds.getBottom() - 1);
         index++;
     }
   }
}

draw2d.SnapToGeometry.prototype.getCorrectionFor=function(/*:Array*/ entries, /*:double*/ value, /*:int*/ side) 
{
   var resultMag = draw2d.SnapToGeometry.THRESHOLD;
   var result = draw2d.SnapToGeometry.THRESHOLD;

   for (var i = 0; i < entries.length; i++) 
   {
      var entry = entries[i];
      var magnitude;

      if (entry.type == -1 && side != 0) 
      {
         magnitude = Math.abs(value - entry.location);
         if (magnitude < resultMag)
         {
               resultMag = magnitude;
               result = entry.location - value;
         }
      }
      else if (entry.type == 0 && side == 0) 
      {
         magnitude = Math.abs(value - entry.location);
         if (magnitude < resultMag)
         {
            resultMag = magnitude;
            result = entry.location - value;
         }
      }
      else if (entry.type == 1 && side != 0) 
      {
         magnitude = Math.abs(value - entry.location);
         if (magnitude < resultMag)
         {
            resultMag = magnitude;
            result = entry.location - value;
         }
      }
   }
   return result;
}

draw2d.SnapToGeometry.prototype.onSetDocumentDirty=function()
{
  this.rows=null;
  this.cols=null;
}
