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
draw2d.Rectangle=function(/*int*/ width, /*:int*/ height)
{
  /** @private **/
  this.bgColor = null;
  /** @private **/
  this.lineColor = new  draw2d.Color(0,0,0);
  /** @private **/
  this.lineStroke=1;
  draw2d.Figure.call(this);

  if(width && height)
    this.setDimension(width, height);
}
draw2d.Rectangle.prototype = new draw2d.Figure;
/** @private **/
draw2d.Rectangle.prototype.type="Rectangle";

/**
 * @private
 **/
draw2d.Rectangle.prototype.dispose=function()
{
  draw2d.Figure.prototype.dispose.call(this);
  this.bgColor=null;
  this.lineColor = null;
}

/**
 * @private
 **/
draw2d.Rectangle.prototype.createHTMLElement=function()
{
    var item = draw2d.Figure.prototype.createHTMLElement.call(this);
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
 * @param {draw2d.Color} color The new background color of the rectangle.
 **/
draw2d.Rectangle.prototype.setBackgroundColor= function(/*:draw2d.Color*/ color)
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
 * @type draw2d.Color
 **/
draw2d.Rectangle.prototype.getBackgroundColor=function()
{
  return this.bgColor;
}

/**
 * Set the line color of the rectangle. You can hand over <i>null</i> to enforce a transparent line
 *
 * @param {draw2d.Color} color The new line color of the rectangle
 **/
draw2d.Rectangle.prototype.setColor= function(/*:draw2d.Color*/ color)
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
 * @type draw2d.Color
 **/
draw2d.Rectangle.prototype.getColor=function()
{
  return this.lineColor;
}

/**
 * Returns the width of the figure.
 * @type int
 **/
draw2d.Rectangle.prototype.getWidth=function()
{
  return draw2d.Figure.prototype.getWidth.call(this)+2*this.lineStroke;
}

/**
 * @type int
 **/
draw2d.Rectangle.prototype.getHeight=function()
{
  // add the line stroke to the width
  //
  return draw2d.Figure.prototype.getHeight.call(this)+2*this.lineStroke;
}

draw2d.Rectangle.prototype.setDimension=function(/*:int*/ w ,/*:int*/ h)
{
  // reduce the dimension with the border line stroke
  // (border goes into the rectangle and not outside the element)
  //
  return draw2d.Figure.prototype.setDimension.call(this, w-2*this.lineStroke, h-2*this.lineStroke);
}

/**
 *
 **/
draw2d.Rectangle.prototype.setLineWidth=function(/*:int*/ w)
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
draw2d.Rectangle.prototype.getLineWidth=function()
{
  return this.lineStroke;
}
