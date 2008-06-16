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
MyCompartmentFigure=function()
{
  CompartmentFigure.call(this);

  this.defaultColor =new  Color(230,230,250);
  this.setBackgroundColor(this.defaultColor);
}

MyCompartmentFigure.prototype = new CompartmentFigure;



MyCompartmentFigure.prototype.onFigureLeave = function(/*:Figure*/ figure)
{
  CompartmentFigure.prototype.onFigureLeave.call(this,figure);
  if(figure instanceof CompartmentFigure)
     figure.setBackgroundColor(figure.defaultColor);
}


MyCompartmentFigure.prototype.onFigureDrop = function(/*:Figure*/ figure)
{
  CompartmentFigure.prototype.onFigureDrop.call(this,figure);
  if(figure instanceof CompartmentFigure)
     figure.setBackgroundColor(this.getBackgroundColor().darker(0.1));
}

/**
 *
 **/
MyCompartmentFigure.prototype.setBackgroundColor= function(/*:Color*/ color)
{
  CompartmentFigure.prototype.setBackgroundColor.call(this,color);

  for(var i=0;i< this.children.getSize();i++)
  {
     var child = this.children.get(i);
     if(child instanceof CompartmentFigure)
        child.setBackgroundColor(this.getBackgroundColor().darker(0.1));
  }
}
