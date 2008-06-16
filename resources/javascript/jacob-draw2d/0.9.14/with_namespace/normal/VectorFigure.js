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
draw2d.VectorFigure=function()
{
  /** @private **/
  this.bgColor = null;
  /** @private **/
  this.lineColor = new  draw2d.Color(0,0,0);
  /** @private **/
  this.stroke=1;
  /** @private **/
  this.graphics = null;
  draw2d.Node.call(this);
}

draw2d.VectorFigure.prototype = new  draw2d.Node;
/** @private **/
draw2d.VectorFigure.prototype.type="VectorFigure";

/**
 * @private
 * @deprecated
 **/
draw2d.VectorFigure.prototype.dispose=function()
{
  draw2d.Node.prototype.dispose.call(this);
  this.bgColor=null;
  this.lineColor = null;
  if(this.graphics!=null)
    this.graphics.clear();
  this.graphics = null;
}


/**
 * @private
 **/
draw2d.VectorFigure.prototype.createHTMLElement=function()
{
    var item = draw2d.Node.prototype.createHTMLElement.call(this);
    item.style.border= "0px";
    item.style.backgroundColor="transparent";
    return item;
}

/**
 * @private
 **/
draw2d.VectorFigure.prototype.setWorkflow= function(/*:draw2d.Workflow*/ workflow)
{
  draw2d.Node.prototype.setWorkflow.call(this,workflow);
  if(this.workflow==null)
  {
// Not neccessary. The workflow/canvas removes the DOM element from the HTML
    this.graphics.clear();
    this.graphics=null;
  }
}

/**
 * Don't forget to call this method if you inherit from VectorFigure.
 *
 * @private
 **/
draw2d.VectorFigure.prototype.paint=function()
{
  if(this.graphics==null)
    this.graphics = new jsGraphics(this.id);
  else
    this.graphics.clear();
  draw2d.Node.prototype.paint.call(this);
  for(var i=0;i<this.ports.getSize();i++)
  {
     this.getHTMLElement().appendChild(this.ports.get(i).getHTMLElement());
  }
}

/**
 * @param {int} w The new width of the figure
 * @param {int} h The new height of the figure
 **/
draw2d.VectorFigure.prototype.setDimension=function(/*:int*/ w,/*:int*/ h)
{
  draw2d.Node.prototype.setDimension.call(this,w,h);
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  // Falls this.graphics noch null ist, kann man sich dies sparen
  //
  if(this.graphics!=null)
    this.paint();
}

/**
 * Set the new background color of the figure. It is possible to hands over
 * <code>null</code> to set the background transparent.
 *
 * @param {draw2d.Color} color The new background color of the figure
 **/
draw2d.VectorFigure.prototype.setBackgroundColor= function(/*:draw2d.Color*/ color)
{
  this.bgColor = color;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  // Falls this.graphics noch null ist, kann man sich dies sparen
  //
  if(this.graphics!=null)
    this.paint();
}

draw2d.VectorFigure.prototype.getBackgroundColor=function()
{
  return this.bgColor;
}

/**
 * @param {int} w The new line width of the figure
 **/
draw2d.VectorFigure.prototype.setLineWidth=function(/*:int*/ w )
{
  this.stroke=w;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  // Falls this.graphics noch null ist, kann man sich dies sparen
  //
  if(this.graphics!=null)
    this.paint();
}

/**
 * @param {draw2d.Color} color The new line / border color of the figure.
 **/
draw2d.VectorFigure.prototype.setColor= function( /*:draw2d.Color*/ color)
{
  this.lineColor = color;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  // Falls this.graphics noch null ist, kann man sich dies sparen
  //
  if(this.graphics!=null)
    this.paint();
}

draw2d.VectorFigure.prototype.getColor=function()
{
  return this.lineColor;
}
