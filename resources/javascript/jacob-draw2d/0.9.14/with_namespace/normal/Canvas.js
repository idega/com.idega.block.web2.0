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
draw2d.Canvas=function(/*:String*/ canvasId)
{
  if(canvasId)
   this.construct(canvasId);
  this.enableSmoothFigureHandling = false;
   /** @private */
   this.canvasLines       = new draw2d.ArrayList();
}


/** @private **/
draw2d.Canvas.prototype.type="Canvas";

/**
 * @private
 **/
draw2d.Canvas.prototype.construct=function(/*:String*/ canvasId)
{
  this.canvasId = canvasId;
  this.html = document.getElementById(this.canvasId);
  this.scrollArea = document.body.parentNode;
}

/**
 * Setting the view for the canvas. A view is the part which has the scrolbar for the 
 * Canvas. See in the examples <b>viewport</b> or more information and usage.
 *
 **/
draw2d.Canvas.prototype.setViewPort= function( /*:String*/ divId)
{
  this.scrollArea = document.getElementById(divId);
}

/**
 * @param {draw2d.Figure} figure The figure object to add to the canvas
 * @param {int} xPos The x coordinate for the figure
 * @param {int} yPos The y coordinate for the figure
 **/
draw2d.Canvas.prototype.addFigure= function( /*:draw2d.Figure*/figure,/*:int*/ xPos,/*:int*/ yPos, /*:boolean*/ avoidPaint)
{
   if(this.enableSmoothFigureHandling==true)
   {
      if(figure.timer<=0)
         figure.setAlpha(0.001);
      var oFigure = figure;
      var slowShow = function()
      {
         if(oFigure.alpha<1.0)
            oFigure.setAlpha(Math.min(1.0,oFigure.alpha+0.05));
         else
         {
            window.clearInterval(oFigure.timer);
            oFigure.timer = -1;
         }
      };
      if(oFigure.timer>0)
         window.clearInterval(oFigure.timer);
      oFigure.timer = window.setInterval(slowShow,30);
   }

   figure.setCanvas(this);
   if(xPos && yPos)
     figure.setPosition(xPos,yPos);

   if(figure instanceof draw2d.Line)
   {
      this.canvasLines.add(figure);
      this.html.appendChild(figure.getHTMLElement());
   }
   else
   {
      // lines are always on top. Determine the first line and add the HTML of the none Line element before.
      var obj = this.canvasLines.getFirstElement();
      if(obj==null)
      	this.html.appendChild(figure.getHTMLElement());
      else
      	this.html.insertBefore(figure.getHTMLElement(),obj.getHTMLElement());
   }
   if(!avoidPaint)
      figure.paint();
}

/**
 * @param {draw2d.Figure} figure The figure which should be remove from the canvas
 **/
draw2d.Canvas.prototype.removeFigure=function(/*:draw2d.Figure*/ figure)
{
   if(this.enableSmoothFigureHandling==true)
   {
      var oThis = this;
      var oFigure = figure;
      var slowShow = function()
      {
         if(oFigure.alpha>0.0)
            oFigure.setAlpha(Math.max(0.0,oFigure.alpha-0.05));
         else
         {
            window.clearInterval(oFigure.timer);
            oFigure.timer =-1;
            oThis.html.removeChild(oFigure.html);
            oFigure.setCanvas(null);
         }
      };
      if(oFigure.timer>0)
         window.clearInterval(oFigure.timer);
      oFigure.timer = window.setInterval(slowShow,20);
   }
   else
   {
      this.html.removeChild(figure.html);
      figure.setCanvas(null);
   }
   if(figure instanceof draw2d.Line)
      this.canvasLines.remove(figure);
}

/**
 * Returns the flag if the Canvas has enabled the smooth figure handling during add, remove, selection,
 * drag&drop.
 *
 * @type boolean
 **/
draw2d.Canvas.prototype.getEnableSmoothFigureHandling=function()
{
    return this.enableSmoothFigureHandling;
}

/**
 * Set the flag for the smooth figure handling during add, remove, selection,
 * drag&drop.
 *
 * @param {boolean} flag The smooth figure handling flag.
 **/
draw2d.Canvas.prototype.setEnableSmoothFigureHandling=function(/*:boolean*/ flag)
{
    this.enableSmoothFigureHandling=flag;
}


/**
 * @type int
 **/
draw2d.Canvas.prototype.getWidth=function()
{
  return parseInt(this.html.style.width);
}


/**
 * @type int
 **/
draw2d.Canvas.prototype.getHeight=function()
{
  return parseInt(this.html.style.height);
}


/**
 * Set the background image of the Canvas. The URL can be absolute, like http://www.any.com/myimg.png or relative.
 * 
 * Set the background image of the canvas
 * @param {String} imageUrl The url of the background image.
 * 
 **/
draw2d.Canvas.prototype.setBackgroundImage=function(/*:String */ imageUrl, /*:boolean*/ repeat)
{
   if(imageUrl!=null)
   {
      if(repeat)
         this.html.style.background="transparent url("+imageUrl+") ";
      else
         this.html.style.background="transparent url("+imageUrl+") no-repeat";
   }
   else
   {
      this.html.style.background="transparent";
   }
}

/**
 * @returns The Y coordinate in relation the Canvas.
 * @type int
 **/
draw2d.Canvas.prototype.getY=function()
{
  return this.y;
}

/**
 * @returns The X coordinate in relation to the canvas
 * @type int
 **/
draw2d.Canvas.prototype.getX=function()
{
  return this.x;
}


/**
 * @returns The Y coordinate in relation the Canvas.
 * @type int
 **/
draw2d.Canvas.prototype.getAbsoluteY=function()
{
  var el = this.html;
  var ot=el.offsetTop;
  while((el=el.offsetParent) != null)
  {
     ot += el.offsetTop;
  }
  return ot;
}

/**
 * @returns The X coordinate in relation to the canvas
 * @type int
 **/
draw2d.Canvas.prototype.getAbsoluteX=function()
{
    var el = this.html;
    var ol=el.offsetLeft;
    while((el=el.offsetParent) != null)
    {
        ol += el.offsetLeft;
    }
    return ol;
}



/**
 * @returns The Y coordinate in relation the Canvas.
 * @type int
 **/
draw2d.Canvas.prototype.getScrollLeft=function()
{
  return this.scrollArea.scrollLeft;
}

/**
 * @returns The X coordinate in relation to the canvas
 * @type int
 **/
draw2d.Canvas.prototype.getScrollTop=function()
{
  return this.scrollArea.scrollTop;
}


