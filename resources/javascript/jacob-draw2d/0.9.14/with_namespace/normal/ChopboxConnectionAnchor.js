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
 * The ChopboxAnchor's location is found by calculating the intersection of a line drawn
 * from the center point of its owner's box (the parent of the connection port) to a reference 
 * point on that box. A Connection using the ChopBoxAnchor will be oriented such that they
 * point to their port owner's center.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.ChopboxConnectionAnchor=function(/*:draw2d.Figure*/ owner)
{
   draw2d.ConnectionAnchor.call(this,owner);
}

draw2d.ChopboxConnectionAnchor.prototype = new draw2d.ConnectionAnchor;
/** @private **/
draw2d.ChopboxConnectionAnchor.prototype.type="ChopboxConnectionAnchor";

/**
 * Returns the location where the Connection should be anchored in absolute coordinates. 
 * The anchor may use the given reference Point to calculate this location.
 * @param reference The reference Point in absolute coordinates
 * @return The anchor's location
 */
draw2d.ChopboxConnectionAnchor.prototype.getLocation=function(/*:draw2d.Point*/ reference)
{
   var r = new draw2d.Dimension();
   r.setBounds(this.getBox());
   r.translate(-1, -1);
   r.resize(1, 1);

   var centerX = r.x + r.w/2;
   var centerY = r.y + r.h/2;

   if (r.isEmpty() || (reference.x == centerX && reference.y == centerY))
      return new /*NAMESPACE*/Point(centerX, centerY);  //This avoids divide-by-zero

   var dx = reference.x - centerX;
   var dy = reference.y - centerY;

   //r.width, r.height, dx, and dy are guaranteed to be non-zero. 
   var scale = 0.5 / Math.max(Math.abs(dx) / r.w, Math.abs(dy) / r.h);

   dx *= scale;
   dy *= scale;
   centerX += dx;
   centerY += dy;

   return new draw2d.Point(Math.round(centerX), Math.round(centerY));
}

/**
 * Returns the bounds of this Anchor's owner.  Subclasses can override this method
 * to adjust the box. Maybe you return the box of the port parent (the parent figure)
 *
 * @return The bounds of this Anchor's owner
 */
draw2d.ChopboxConnectionAnchor.prototype.getBox=function()
{
  return this.getOwner().getParent().getBounds();
}

/**
 * Returns the bounds of this Anchor's owner.  Subclasses can override this method
 * to adjust the box. Maybe you return the box of the port parent (the parent figure)
 *
 * @return The bounds of this Anchor's owner
 */
draw2d.ChopboxConnectionAnchor.prototype.getReferencePoint=function()
{
  return this.getBox().getCenter();
}
