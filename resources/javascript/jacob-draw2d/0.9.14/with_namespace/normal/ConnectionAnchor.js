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
 * Provides support for a anchor. A anchor is one of the end points
 * of a {@link draw2d.Connection}.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.ConnectionAnchor=function(/*:draw2d.Port*/ owner)
{
   this.owner = owner;
}

draw2d.ConnectionAnchor.prototype.type="ConnectionAnchor";

/**
 * Returns the location where the Connection should be anchored in absolute coordinates. 
 * The anchor may use the given reference Point to calculate this location.
 * @param reference The reference Point in absolute coordinates
 * @return The anchor's location
 */
draw2d.ConnectionAnchor.prototype.getLocation=function(/*:draw2d.Point*/ reference)
{
   // return the center of the owner.
   return this.getReferencePoint();
}

/**
 * Returns the Figure that contains this ConnectionAnchor.
 * @return The Figure that contains this ConnectionAnchor
 */
draw2d.ConnectionAnchor.prototype.getOwner = function()
{
   return this.owner;
}

/**
 * Set the owner of the Anchor.
 */
draw2d.ConnectionAnchor.prototype.setOwner = function(/*:draw2d.Port*/ owner)
{
   this.owner=owner;
}

/**
 * Returns the bounds of this Anchor's owner.  Subclasses can override this method
 * to adjust the box. Maybe you return the box of the port parent (the parent figure)
 *
 * @return The bounds of this Anchor's owner
 */
draw2d.ConnectionAnchor.prototype.getBox=function()
{
  return this.getOwner().getAbsoluteBounds();
}

/**
 * Returns the reference point for this anchor in absolute coordinates. This might be used
 * by another anchor to determine its own location.
 * @return The reference Point
 */
draw2d.ConnectionAnchor.prototype.getReferencePoint = function()
{
   if (this.getOwner() == null)
     return null;
   else 
     return this.getOwner().getAbsolutePosition();
}
