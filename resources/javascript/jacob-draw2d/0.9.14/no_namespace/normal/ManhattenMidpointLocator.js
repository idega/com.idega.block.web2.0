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
 * @class Controls the location of an Figure.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
ManhattenMidpointLocator=function(/*:Connection*/ connection)
{
  ConnectionLocator.call(this,connection);
}

ManhattenMidpointLocator.prototype = new  ConnectionLocator;
/** @private **/
ManhattenMidpointLocator.prototype.type="ManhattenMidpointLocator";


/**
 * Relocates the given IFigure
 *
 * @param {Figure} target - The figure to relocate
 **/
ManhattenMidpointLocator.prototype.relocate=function(/*:Figure*/ target)
{
   var conn = this.getConnection();
   var p = new Point();
   var points = conn.getPoints();
   var index = Math.floor((points.getSize() -2) / 2);
   var p1 = points.get(index);
   var p2 = points.get(index + 1);

   p.x = (p2.x - p1.x) / 2 + p1.x +5;
   p.y = (p2.y - p1.y) / 2 + p1.y +5;

   target.setPosition(p.x,p.y);
}
