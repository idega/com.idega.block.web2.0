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
Rectangle=function(/*int*/ width, /*:int*/ height)
{
  /** @private **/
  this.bgColor = null;
  /** @private **/
  this.lineColor = new  Color(0,0,0);
  /** @private **/
  this.lineStroke=1;
  Figure.call(this);

  if(width && height)
    this.setDimension(width, height);
}
Rectangle.prototype = new Figure;
/** @private **/
Rectangle.prototype.type="Rectangle";

/**
 * @private
 **/
Rectangle.prototype.dispose=function()
{
  Figure.prototype.dispose.call(this);
  this.bgColor=null;
  this.lineColor = null;
}

/**
 * @private
 **/
Rectangle.prototype.createHTMLElement=function()
{
    var item = Figure.prototype.createHTMLElement.call(this);
    item.style.width="auto";
    item.style.height="auto";
    item.style.margin="0px";
    item.style.padding="0px";
    item.style.border= this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
    item.style.fontSize="1px";
    item.style.lineHeight="1px";
    item.innerHTML="&nbsp";
    if(this.bgColor!=null)
      item.style.backgroundColor=this.bgColor.getHTMLStyle();

    return item;
}


/**
 *
 * @param {Color} color The new background color of the rectangle.
 **/
Rectangle.prototype.setBackgroundColor= function(/*:Color*/ color)
{
  this.bgColor = color;
  if(this.bgColor!=null)
    this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
  else
    this.html.style.backgroundColor="transparent";
}

/**
 * The background color of the rectangle.
 *
 * @type Color
 **/
Rectangle.prototype.getBackgroundColor=function()
{
  return this.bgColor;
}

/**
 * Set the line color of the rectangle. You can hand over <i>null</i> to enforce a transparent line
 *
 * @param {Color} color The new line color of the rectangle
 **/
Rectangle.prototype.setColor= function(/*:Color*/ color)
{
  this.lineColor = color;
  if(this.lineColor!=null)
  {
    this.html.style.border= this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
  }
  else
  {
    this.html.style.border= this.lineStroke+"0px";
  }
}

/**
 *
 * @type Color
 **/
Rectangle.prototype.getColor=function()
{
  return this.lineColor;
}

/**
 * Returns the width of the figure.
 * @type int
 **/
Rectangle.prototype.getWidth=function()
{
  return Figure.prototype.getWidth.call(this)+2*this.lineStroke;
}

/**
 * @type int
 **/
Rectangle.prototype.getHeight=function()
{
  // add the line stroke to the width
  //
  return Figure.prototype.getHeight.call(this)+2*this.lineStroke;
}

Rectangle.prototype.setDimension=function(/*:int*/ w ,/*:int*/ h)
{
  // reduce the dimension with the border line stroke
  // (border goes into the rectangle and not outside the element)
  //
  return Figure.prototype.setDimension.call(this, w-2*this.lineStroke, h-2*this.lineStroke);
}

/**
 *
 **/
Rectangle.prototype.setLineWidth=function(/*:int*/ w)
{
  var diff =  w-this.lineStroke;
  this.setDimension(this.getWidth()-2*diff, this.getHeight()-2*diff);
  this.lineStroke=w;
  var c = "transparent";
  if(this.lineColor!=null)
    c=this.lineColor.getHTMLStyle();
  this.html.style.border= this.lineStroke+"px solid "+c;
}

/**
 * @type int
 **/
Rectangle.prototype.getLineWidth=function()
{
  return this.lineStroke;
}
