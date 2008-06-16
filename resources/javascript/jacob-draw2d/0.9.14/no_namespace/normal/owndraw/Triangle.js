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
Triangle=function(/*:int*/ width, /*:int*/ height)
{
  VectorFigure.call(this);
  if(width && height)
     this.setDimension(width, height);
}

Triangle.prototype = new VectorFigure;


/**
 * The paint method is the place to put your own draw calls.
 * This method will be called from the framework. Don't call them manually.
 * @private
 **/
Triangle.prototype.paint=function()
{
  // you must call the super-method to initialize the device context.
  VectorFigure.prototype.paint.call(this);

  // the coords for a simple triangle
  //
  var x = new Array(this.getWidth()/2,this.getWidth(),0);
  var y = new Array(0, this.getHeight(), this.getHeight()); 

  // set the line width
  this.graphics.setStroke(this.stroke);

  // fill the area if the user has set a background color
  //
  if(this.bgColor!=null)
  {
    this.graphics.setColor(this.bgColor.getHTMLStyle());
    this.graphics.fillPolygon(x,y);
  }

  // paint the outline if the user has set the line color (default:black)
  //
  if(this.lineColor!=null)
  {
    this.graphics.setColor(this.lineColor.getHTMLStyle());
    this.graphics.drawPolygon(x,y);
  }

  // flush the paint instructions to the device context
  this.graphics.paint();
}
