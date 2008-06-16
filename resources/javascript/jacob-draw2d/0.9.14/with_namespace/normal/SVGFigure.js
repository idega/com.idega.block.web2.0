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
draw2d.SVGFigure=function(/*:int*/ width, /*:int*/ height)
{
  /** @private **/
  this.bgColor = null;
  /** @private **/
  this.lineColor = new  draw2d.Color(0,0,0);
  /** @private **/
  this.stroke=1;
  /** @private **/
  this.context = null;
  draw2d.Node.call(this);
  if(width && height)
     this.setDimension(width, height);
}

draw2d.SVGFigure.prototype = new  draw2d.Node;
/** @private **/
draw2d.SVGFigure.prototype.type="SVGFigure";


/**
 * @private
 **/
draw2d.SVGFigure.prototype.createHTMLElement=function()
{
    var item = new MooCanvas(this.id, {width: this.getWidth(),height:this.getHeight()});
    item.style.position="absolute";
    item.style.left   = this.x+"px";
    item.style.top    = this.y+"px";
    item.style.zIndex = ""+draw2d.Figure.ZOrderBaseIndex;

    this.context = item.getContext("2d");

    return item;
}


/**
 * Don't forget to call this method if you inherit from VectorFigure.
 *
 * @private
 **/
draw2d.SVGFigure.prototype.paint=function()
{
  this.context.clearRect(0, 0,this.getWidth(), this.getHeight());
  this.context.fillStyle = "rgba(200,0,0,0.3)";
  this.context.fillRect (0, 0,this.getWidth(), this.getHeight());

/*
// Filled triangle
  this.context.fillStyle = "rgb(0,200,0)";

  // Stroked triangle
  this.context.beginPath();
  this.context.moveTo(this.width,this.height);
  this.context.lineTo(this.width,this.height/2);
  this.context.lineTo(0,this.height/2);
  this.context.closePath();
  this.context.stroke();
*/
}

/**
 * @param {int} w The new width of the figure
 * @param {int} h The new height of the figure
 **/
draw2d.SVGFigure.prototype.setDimension=function(/*:int*/ w,/*:int*/ h)
{
  draw2d.Node.prototype.setDimension.call(this,w,h);
  this.html.width=w;
  this.html.height=h;
  if(this.context !=null)
    this.paint();
}

/**
 * Set the new background color of the figure. It is possible to hands over
 * <code>null</code> to set the background transparent.
 *
 * @param {draw2d.Color} color The new background color of the figure
 **/
draw2d.SVGFigure.prototype.setBackgroundColor= function(/*:draw2d.Color*/ color)
{
  this.bgColor = color;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  // Falls this.graphics noch null ist, kann man sich dies sparen
  //
  if(this.graphics!=null)
    this.paint();
}

draw2d.SVGFigure.prototype.getBackgroundColor=function()
{
  return this.bgColor;
}

/**
 * @param {int} w The new line width of the figure
 **/
draw2d.SVGFigure.prototype.setLineWidth=function(/*:int*/ w )
{
  this.stroke=w;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  // Falls this.graphics noch null ist, kann man sich dies sparen
  //
  if(this.context!=null)
    this.paint();
}

/**
 * @param {draw2d.Color} color The new line / border color of the figure.
 **/
draw2d.SVGFigure.prototype.setColor= function( /*:draw2d.Color*/ color)
{
  this.lineColor = color;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  // Falls this.graphics noch null ist, kann man sich dies sparen
  //
  if(this.context!=null)
    this.paint();
}

draw2d.SVGFigure.prototype.getColor=function()
{
  return this.lineColor;
}
