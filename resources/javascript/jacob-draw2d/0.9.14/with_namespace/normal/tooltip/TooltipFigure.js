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
draw2d.TooltipFigure=function()
{
  draw2d.Node.call(this);
  this.setColor(new draw2d.Color(255,128,255));
  this.setBackgroundColor(new draw2d.Color(255,150,255));
  this.setDimension(50,50);
}

draw2d.TooltipFigure.prototype = new  draw2d.Node;
draw2d.TooltipFigure.prototype.type="TooltipFigure";


/**
 * Callback method for the mouse enter event. Usefull for mouse hover-effects.
 * or to raise a tooltip.
 **/
draw2d.TooltipFigure.prototype.onMouseEnter=function()
{
  // You can hands over ANY type of draw2d.Figure as tooltip.
  // Additional you can auto hide the tooltip with the second parameter (internal timer which removes the tooltip)
  this.getWorkflow().showTooltip(new draw2d.Tooltip("Juhu, I'm a tooltip"), true);
}

