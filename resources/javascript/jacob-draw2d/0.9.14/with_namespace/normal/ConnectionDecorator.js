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
 * @class A Connection is the line between two {@link draw2d.Port}s.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.ConnectionDecorator=function()
{
  this.color = new draw2d.Color(0,0,0);
  this.backgroundColor = new draw2d.Color(250,250,250);;
}

draw2d.ConnectionDecorator.prototype.type="ConnectionDecorator";

/**
 * Paint the decoration for a connector.
 * The Connector starts always in [0,0] and ends in [x,0]
 * 
 * <pre>
 *                |
 *                |
 *                |
 *  --------------+-----------------------------> +X
 *                |
 *                |
 *                |
 *                V -Y
 *
 * </pre>
 * See in ArrowConnectionDecorator for example implementation.
 **/
draw2d.ConnectionDecorator.prototype.paint=function(/*:draw2d.Graphics*/ g)
{
 // do nothing per default
}

draw2d.ConnectionDecorator.prototype.setColor=function(/*:draw2d.Color*/ c)
{
  this.color = c;
}

draw2d.ConnectionDecorator.prototype.setBackgroundColor=function(/*:draw2d.Color*/ c)
{
  this.backgroundColor = c;
}
