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
draw2d.ArrowConnectionDecorator=function()
{
}

draw2d.ArrowConnectionDecorator.prototype = new draw2d.ConnectionDecorator;
draw2d.ArrowConnectionDecorator.prototype.type="ArrowConnectionDecorator";

/**
 * Draw a filled arrow decoration.
 * It's not your work to rotate the arrow. The Draw2D do this for you.
 * <pre>
 *                        ---+ [15,5]
 *                 -------   |
 * [3,0]   --------          |
 *     +---                  |==========================
 *         --------          |
 *                 -------   |
 *                        ---+ [15,-5]
 *</pre>
 **/
draw2d.ArrowConnectionDecorator.prototype.paint=function(/*:draw2d.Graphics*/ g)
{
  // draw the background
  //
  if(this.backgroundColor!=null)
  {
     g.setColor(this.backgroundColor);
     g.fillPolygon([3,20,20,3],[0,5,-5,0]);
  }

  // draw the border
  g.setColor(this.color);
  g.setStroke(1);
  g.drawPolygon([3,20,20,3],[0,5,-5,0]);
}
