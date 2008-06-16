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
draw2d.ArrowLine=function()
{
  this.lineColor = new draw2d.Color(0,0,0);
  this.stroke=1;
  this.canvas=null;
  this.workflow=null;
  this.html=null;
  this.graphics = null;
  this.id = this.generateUId();
  this.startX = 30;
  this.startY = 30;
  this.endX   = 100;
  this.endY   = 100;
  this.zOrder = draw2d.ArrowLine.ZOrderBaseIndex;
  this.setSelectable(true);
  this.setDeleteable(true);

  this.arrowWidth  = 10;
  this.arrowLength = 20;
  this.lineWidth   = 5;
}
draw2d.ArrowLine.prototype = new draw2d.Line;

draw2d.ArrowLine.prototype.paint=function()
{
  if(this.graphics ==null)
    this.graphics = new jsGraphics(this.id);
  else
    this.graphics.clear();

  this.graphics.setStroke(this.stroke);
  this.graphics.setColor(this.lineColor.getHTMLStyle());
  var endY = this.getLength();

  // Create the x and y coords for an arrow. The arrow goes from the left to the right.
  // Start point: [0,0]
  // End point:   [length,0]
  //
  var xArray = [0,0,endY-this.arrowLength,endY-this.arrowLength,endY,endY-this.arrowLength,endY-this.arrowLength,0];
  var yArray = [-this.lineWidth,+this.lineWidth,+this.lineWidth,this.lineWidth+this.arrowWidth/2,0,-(this.lineWidth+this.arrowWidth/2),-this.lineWidth,-this.lineWidth ];

  // determine the radian of the required arrow line
  //
  var radian = this.getAngle() *Math.PI/180;
  var rotX = new Array();
  var rotY = new Array();

  // Rotate the arrow and translate them to the [this.startX, this.startY] position
  //
  for(var i= 0;i<xArray.length;i++)
  {
     rotX[i] = this.startX+xArray[i]*Math.cos(radian)-yArray[i]*Math.sin(radian);
     rotY[i] = this.startY+xArray[i]*Math.sin(radian)+yArray[i]*Math.cos(radian);
  }

  // paint the rotated arrow
  //
  this.graphics.drawPolyLine(rotX,rotY)
  this.graphics.paint();
}


