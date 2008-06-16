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
SVGTriangle=function(/*:int*/ width, /*:int*/ height)
{
  Figure.call(this);
  if(width && height)
     this.setDimension(width, height);
}

SVGTriangle.prototype = new SVGFigure;


/**
 * The paint method is the place to put your own draw calls.
 * This method will be called from the framework. Don't call them manually.
 * @private
 **/
SVGTriangle.prototype.paint=function()
{
  this.context.clearRect(0, 0,this.getWidth(), this.getHeight());
  this.context.fillStyle = "rgba(200,0,0,0.3)";

// Filled triangle
  this.context.fillStyle = "rgb(0,200,0)";

  // Stroked triangle
  this.context.beginPath();
  this.context.moveTo(this.width/2,0);
  this.context.lineTo(this.width,this.height);
  this.context.lineTo(0,this.height);
  this.context.closePath();
  this.context.stroke();
}

