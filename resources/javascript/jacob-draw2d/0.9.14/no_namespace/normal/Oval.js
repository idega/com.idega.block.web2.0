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
 * @version 0.7.8
 * @author Andreas Herz
 * @constructor
 */
Oval=function()
{
  VectorFigure.call(this);
}

Oval.prototype = new VectorFigure;
/** @private **/
Oval.prototype.type="Oval";


/**
 * @private
 **/
Oval.prototype.paint=function()
{
  // Call the super-method to init the graphics context.
  //
  VectorFigure.prototype.paint.call(this);

  this.graphics.setStroke(this.stroke);
  if(this.bgColor!=null)
  {
    this.graphics.setColor(this.bgColor.getHTMLStyle());
    this.graphics.fillOval(0, 0, this.getWidth()-1, this.getHeight()-1);
  }
  if(this.lineColor!=null)
  {
    this.graphics.setColor(this.lineColor.getHTMLStyle());
    this.graphics.drawOval(0, 0, this.getWidth()-1, this.getHeight()-1);
  }
  this.graphics.paint();
}
