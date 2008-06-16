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
draw2d.Graphics=function(/*:jsGraphics*/ jsGraphics, /*:float*/ rotation, /*:draw2d.Point*/translation)
{
   this.jsGraphics = jsGraphics;
   this.xt= translation.x;
   this.yt= translation.y;
   this.radian = rotation*Math.PI/180;
   this.sinRadian = Math.sin(this.radian);
   this.cosRadian = Math.cos(this.radian);
}

draw2d.Graphics.prototype.setStroke=function(/*:int*/ x)
{
   this.jsGraphics.setStroke(x);
}

draw2d.Graphics.prototype.drawLine=function(/*:int*/ x1, /*:int*/ y1, /*:int*/ x2, /*:int*/ y2)
{
   var _x1 = this.xt+x1*this.cosRadian-y1*this.sinRadian;
   var _y1 = this.yt+x1*this.sinRadian+y1*this.cosRadian;
   var _x2 = this.xt+x2*this.cosRadian-y2*this.sinRadian;
   var _y2 = this.yt+x2*this.sinRadian+y2*this.cosRadian;

   this.jsGraphics.drawLine(_x1,_y1,_x2,_y2);
}

draw2d.Graphics.prototype.fillRect=function(/*:int*/ x, /*:int*/ y, /*:int*/ w, /*:int*/ h)
{
   /*
        x1/y1              x2/y2
             +-----------+
             |           | 
             |           | 
             +-----------+

        x4/y4             x3/y3
   */
   var x1 = this.xt+x*this.cosRadian-y*this.sinRadian;
   var y1 = this.yt+x*this.sinRadian+y*this.cosRadian;
   var x2 = this.xt+(x+w)*this.cosRadian-y*this.sinRadian;
   var y2 = this.yt+(x+w)*this.sinRadian+y*this.cosRadian;
   var x3 = this.xt+(x+w)*this.cosRadian-(y+h)*this.sinRadian;
   var y3 = this.yt+(x+w)*this.sinRadian+(y+h)*this.cosRadian;
   var x4 = this.xt+x*this.cosRadian-(y+h)*this.sinRadian;
   var y4 = this.yt+x*this.sinRadian+(y+h)*this.cosRadian;

   this.jsGraphics.fillPolygon([x1,x2,x3,x4], [y1,y2,y3,y4]);
}


draw2d.Graphics.prototype.fillPolygon=function(/*:int[]*/ xArray, /*:int[]*/ yArray)
{
  var rotX = new Array();
  var rotY = new Array();

  // Rotate the points and translate them to the [this.startX, this.startY] position
  //
  for(var i= 0;i<xArray.length;i++)
  {
     rotX[i] = this.xt+xArray[i]*this.cosRadian-yArray[i]*this.sinRadian;
     rotY[i] = this.yt+xArray[i]*this.sinRadian+yArray[i]*this.cosRadian;
  }

   this.jsGraphics.fillPolygon(rotX, rotY);
}

draw2d.Graphics.prototype.setColor=function(/*:draw2d.Color*/ color)
{
  this.jsGraphics.setColor(color.getHTMLStyle());
}



draw2d.Graphics.prototype.drawPolygon=function(/*:int[]*/ xArray, /*:int[]*/ yArray)
{
  var rotX = new Array();
  var rotY = new Array();

  // Rotate the points and translate them to the [this.startX, this.startY] position
  //
  for(var i= 0;i<xArray.length;i++)
  {
     rotX[i] = this.xt+xArray[i]*this.cosRadian-yArray[i]*this.sinRadian;
     rotY[i] = this.yt+xArray[i]*this.sinRadian+yArray[i]*this.cosRadian;
  }

   this.jsGraphics.drawPolygon(rotX, rotY);
}


