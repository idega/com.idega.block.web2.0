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
draw2d.Line=function()
{
  /** @private **/
  this.lineColor = new  draw2d.Color(0,0,0);
  /** @private **/
  this.stroke=1;
  /** @private **/
  this.canvas=null;
  /** @private **/
  this.workflow=null;
  /** @private **/
  this.html=null;
  /** @private **/
  this.graphics = null;
  /** @private **/
  this.id = this.generateUId();
  /** @private **/
  this.startX = 30;
  /** @private **/
  this.startY = 30;
  /** @private **/
  this.endX   = 100;
  /** @private **/
  this.endY   = 100;
  /** @private **/
  this.alpha = 1.0;
  /** @private **/
  this.isMoving = false;
  
  // Buffer the z-order. Required if the line has not painted before
  this.zOrder = draw2d.Line.ZOrderBaseIndex;


  // Hier werden Object registriert welche informiert werden wollen wenn sich dieses
  // Object bewegt hat.
  //
  /** @private **/
  this.moveListener = new draw2d.ArrayList();
 
  this.setSelectable(true);
  this.setDeleteable(true);
}

draw2d.Line.ZOrderBaseIndex = 200;

/**
 * Set the common z-index of the window element. This method exists for
 * compatibility reason to dojo or another UI javascript library. 
 * It is now ossible to arange the draw2d elements behind/before other UI elements-
 *
 * @see #setZOrder
 * @static
 * @param {int} index The z-order for all new line objects.
 **/
draw2d.Line.setZOrderBaseIndex=function(/*:int*/ index)
{
  draw2d.Line.ZOrderBaseIndex = index;
}

/**
 * Called by the framework. Don't call them manually.
 * @private
 * @deprecated
 **/
draw2d.Line.prototype.dispose=function()
{
//  this.id = null; required for deregistration
//  this.html=null;
  this.canvas = null;
  this.workflow=null;
  if(this.graphics != null)
    this.graphics.clear();
  this.graphics =null;
}


/**
 * @return Returns the z-index of the element.
 * @type int
 **/
draw2d.Line.prototype.getZOrder=function()
{
    return this.zOrder;
}

/**
 * @param {int} index Set the new z-index of the element
 **/
draw2d.Line.prototype.setZOrder=function(/*:int*/ index)
{
    if(this.html!=null)
      this.html.style.zIndex=index;
    this.zOrder = index;
}


/**
 * Called by the framework. Don't call them manually.
 * @private
 **/
draw2d.Line.prototype.createHTMLElement=function()
{
    var item = document.createElement('div');
    item.id = this.id;
    item.style.position="absolute";
    item.style.left   = "0px";
    item.style.top    = "0px";
    item.style.height = "0px";
    item.style.width  = "0px";
    item.style.zIndex = this.zOrder;

    return item;
}


/**
 * Called by the framework. Don't call them manually.
 * @private
 **/
draw2d.Line.prototype.getHTMLElement=function()
{
  if(this.html==null)
  {
    this.html = this.createHTMLElement();
  }
  return this.html;
}

/**
 * @type Workflow
 **/
draw2d.Line.prototype.getWorkflow= function()
{
   return this.workflow;
}


/**
 * You can't drag&drop the resize handles if the line not resizeable.
 * @type boolean
 **/
draw2d.Line.prototype.isResizeable=function()
{
  return true;
}

/**
 * Called by the framework. Don't call them manually.
 * @private
 * @param {draw2d.Canvas} canvas The new canvas object for this line (paint area)
 **/
draw2d.Line.prototype.setCanvas = function(/*:draw2d.Canvas*/ canvas )
{
  this.canvas = canvas;
  if(this.graphics!=null)
    this.graphics.clear();
  this.graphics = null;
}

/**
 * Called by the framework. Don't call them manually.
 * @private
 * @param {draw2d.Workflow} canvas The new workflow canvas for this line (paint area)
 **/
draw2d.Line.prototype.setWorkflow= function(/*:draw2d.Workflow*/ workflow)
{
  this.workflow = workflow;
  if(this.graphics!=null)
    this.graphics.clear();
  this.graphics = null;
}

/**
 * Called by the framework. Don't call them manually.
 * @private
 **/
draw2d.Line.prototype.paint=function()
{
  if(this.graphics ==null)
    this.graphics = new jsGraphics(this.id);
  else
    this.graphics.clear();

  this.graphics.setStroke(this.stroke);
  this.graphics.setColor(this.lineColor.getHTMLStyle());
  this.graphics.drawLine(this.startX, this.startY, this.endX, this.endY);
  this.graphics.paint();
}
/**
 * 
 * @param {draw2d.Figure} figure The figure to monitor any movements
 **/
draw2d.Line.prototype.attachMoveListener = function(/*:draw2d.Figure*/ figure)
{
  this.moveListener.add(figure);
}

/**
 *
 * @param {draw2d.Figure} figure The figure to to remove the movement monitor
 **/
draw2d.Line.prototype.detachMoveListener = function(/*:draw2d.Figure*/ figure) 
{
  this.moveListener.remove(figure);
}

/**
 *
 * @private
 **/
draw2d.Line.prototype.fireMoveEvent=function()
{
  var size= this.moveListener.getSize();
  for(var i=0;i<size;i++)
  {
    this.moveListener.get(i).onOtherFigureMoved(this);
  }
}

/**
 * This method will be called if an figure, which has been registered befor, has been moved.
 *
 * @param {draw2d.Figure} figure The figure which has been moved
 * @private
 **/
draw2d.Line.prototype.onOtherFigureMoved=function(/*:draw2d.Figure*/ figure)
{
}

/**
 * Set the line width. This enforce a repaint of the line.
 * This method fires a <i>document dirty</i> event.
 *
 * @param {int} w The new line width of the figure.
 **/
draw2d.Line.prototype.setLineWidth=function(/*:int*/ w)
{
  this.stroke=w;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  if(this.graphics!=null)
    this.paint();
  this.setDocumentDirty();
}


/**
 * Set the color of the line.
 * This method fires a <i>document dirty</i> event.
 * @param {draw2d.Color} color The new color of the line.
 **/
draw2d.Line.prototype.setColor= function(/*:draw2d.Color*/ color)
{
  this.lineColor = color;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  if(this.graphics!=null)
    this.paint();
  this.setDocumentDirty();
}

/**
 * Return the current paint color.
 * @type draw2d.Color The paint color of the line.
 **/
draw2d.Line.prototype.getColor= function()
{
  return this.lineColor;
}

/**
 * Set the alpha blending of this figure. 
 *
 * @param {float} percent Value between 0-1.
 **/
draw2d.Line.prototype.setAlpha=function(/*:float 0-1*/ percent)
{
  if(percent==this.alpha)
     return;
  try
  {
   this.html.style.MozOpacity=percent ;
  } 
  catch(exc){}
  try
  {
   // standard. Like Apple Safari Browser
   this.html.style.opacity=percent ;
  } 
  catch(exc){}
  try
  {
   var opacityValue = Math.round(percent * 100);
   // remove the alpha filter complete if we don't want any.
   if(opacityValue>=99)
      this.html.style.filter = "";
   else
      this.html.style.filter = "alpha(opacity=" + opacityValue + ")"; 

  } catch(exc){}
  this.alpha = percent;
}

/**
 * Set the start point of the line.
 * This method fires a <i>document dirty</i> event.
 *
 * @param {int} x the x coordinate of the start point
 * @param {int} y the y coordinate of the start point
 **/
draw2d.Line.prototype.setStartPoint= function(/*:int*/ x, /*:int*/ y)
{
//  if(this.startX==x && this.startY==y)
//     return;

  this.startX = x;
  this.startY = y;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  if(this.graphics!=null)
    this.paint();
  this.setDocumentDirty();
}

/**
 * Set the end point of the line.
 * This method fires a <i>document dirty</i> event.
 *
 * @param {int} x the x coordinate of the end point
 * @param {int} y the y coordinate of the end point
 **/
draw2d.Line.prototype.setEndPoint= function(/*:int*/x, /*:int*/ y)
{
//  if(this.endX==x && this.endY==y)
//     return;

  this.endX = x;
  this.endY = y;
  // Falls das element jemals schon mal gezeichnet worden ist, dann
  // muss jetzt ein repaint erfolgen
  if(this.graphics!=null)
    this.paint();
  this.setDocumentDirty();
}

/**
 * @type int
 **/
draw2d.Line.prototype.getStartX= function()
{
  return this.startX;
}

/**
 *
 * @type int
 **/
draw2d.Line.prototype.getStartY= function()
{
  return this.startY;
}

/**
 *
 * @type draw2d.Point
 **/
draw2d.Line.prototype.getStartPoint= function()
{
  return new draw2d.Point(this.startX,this.startY);
}


/**
 *
 * @type int
 **/
draw2d.Line.prototype.getEndX= function()
{
  return this.endX;
}

/**
 *
 * @type int
 **/
draw2d.Line.prototype.getEndY= function()
{
  return this.endY;
}

/**
 *
 * @type draw2d.Point
 **/
draw2d.Line.prototype.getEndPoint= function()
{
  return new draw2d.Point(this.endX,this.endY);
}


/**
 * Return true if the user can select the line.
 * @type boolean
 **/
draw2d.Line.prototype.isSelectable=function()
{
  return this.selectable;
}


/**
 * You can change the selectable behaviour of this object. Hands over [false] and
 * the figure has no selection handles if you try to select them with the mouse.<br>
 *
 * @param {boolean} flag The selectable flag.
 **/
draw2d.Line.prototype.setSelectable=function(/*:boolean*/ flag)
{
  this.selectable=flag;
}


/**
 * Return false if you avoid that the user can delete your figure.
 * Sub class can override this method.
 * @type boolean
 **/
draw2d.Line.prototype.isDeleteable=function()
{
  return this.deleteable;
}

/**
 * Return false if you avoid that the user can delete your figure.
 * Sub class can override this method.
 * @type boolean
 **/
draw2d.Line.prototype.setDeleteable=function(/*:boolean */flag)
{
  this.deleteable = flag;
}


/**
 * Returns the length of the line.
 * 
 * @type int
 **/
draw2d.Line.prototype.getLength=function()
{
  return Math.sqrt((this.startX-this.endX)*(this.startX-this.endX)+(this.startY-this.endY)*(this.startY-this.endY));
}

/**
 * Returns the angle of the line in degree
 *
 * <pre>
 *                                 270°
 *                               |
 *                               |
 *                               |
 *                               |
 * 180° -------------------------+------------------------> +X
 *                               |                        0°
 *                               |
 *                               |
 *                               |
 *                               V +Y
 *                              90°
 * </pre>
 * @type float
 **/
draw2d.Line.prototype.getAngle=function()
{
  var length = this.getLength();
  var angle = -(180/Math.PI) *Math.asin((this.startY-this.endY)/length);

  if(angle<0)
  {
     if(this.endX<this.startX)
       angle = Math.abs(angle) + 180;
     else
       angle = 360- Math.abs(angle);
  }
  else
  {
     if(this.endX<this.startX)
       angle = 180-angle;
  }
  return angle;
}

/**
 * Callback method for the context menu interaction.
 * Don't override this method! Implement getContextMenu instead.
 *
 * @see #getContextMenu
 * @private
 * @final
 * @param {int} x The absolute x coordinate of the right mouse button click
 * @param {int} y The absolute y coordinate of the right mouse button click
 **/
draw2d.Line.prototype.onContextMenu=function(/*:int*/ x, /*:int*/y)
{
    var menu = this.getContextMenu();
    if(menu!=null)
      this.workflow.showMenu(menu,x,y);
}

/**
 * @returns null or the Menu object for this figure.
 * @type draw2d.Menu
 **/
draw2d.Line.prototype.getContextMenu=function()
{
   return null;
}


/**
 * Callback method for the double click event of user interaction.
 * Sub classes can override this method to implement their own behaviour.
 **/
draw2d.Line.prototype.onDoubleClick=function()
{
}

/**
 * This method will be called if the figure has changed any postion, color, dimension or something else.
 *
 * @private
 **/
draw2d.Line.prototype.setDocumentDirty=function()
{
  if(this.workflow!=null)
    this.workflow.setDocumentDirty();
}


/**
 * @private
 **/
draw2d.Line.prototype.generateUId=function() 
{
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 10;
  var maxTry = 10;
    nbTry = 0
    while (nbTry < 1000) 
    {
        var id = '';
        // generate string
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            id += chars.substring(rnum,rnum+1);
        }
        // check if there
        elem = document.getElementById(id);
        if (!elem) {
           return id
       }
       nbTry += 1
    }
    return null
}

/**
 * Checks if the hands over coordinate on the line.
 *
 * @param {int} px the x coordinate of the test point
 * @param {int} py the y coordinate of the test point
 * @type boolean
 **/
draw2d.Line.prototype.containsPoint= function(/*:int*/ px, /*:int*/ py)
{
  return draw2d.Line.hit(this.startX,this.startY, this.endX, this.endY, px,py);
}

/**
 * Static util function to determine is a point(px,py) on the line(x1,y1,x2,y2)
 * A simple hit test.
 *
 * @static
 * @private
 **/
draw2d.Line.hit= function(/*:int*/ X1, /*:int*/ Y1, /*:int*/ X2, /*:int*/ Y2, /*:int*/ px, /*:int*/ py)
{
  var LINECORONA = 5;
  // Adjust vectors relative to X1,Y1
  // X2,Y2 becomes relative vector from X1,Y1 to end of segment
  X2 -= X1;
  Y2 -= Y1;
  // px,py becomes relative vector from X1,Y1 to test point
  px -= X1;
  py -= Y1;
  var dotprod = px * X2 + py * Y2;
  var projlenSq;
  if (dotprod <= 0.0) {
      // px,py is on the side of X1,Y1 away from X2,Y2
      // distance to segment is length of px,py vector
      // "length of its (clipped) projection" is now 0.0
      projlenSq = 0.0;
  } else {
      // switch to backwards vectors relative to X2,Y2
      // X2,Y2 are already the negative of X1,Y1=>X2,Y2
      // to get px,py to be the negative of px,py=>X2,Y2
      // the dot product of two negated vectors is the same
      // as the dot product of the two normal vectors
      px = X2 - px;
      py = Y2 - py;
      dotprod = px * X2 + py * Y2;
      if (dotprod <= 0.0) {
          // px,py is on the side of X2,Y2 away from X1,Y1
          // distance to segment is length of (backwards) px,py vector
          // "length of its (clipped) projection" is now 0.0
          projlenSq = 0.0;
      } else {
          // px,py is between X1,Y1 and X2,Y2
          // dotprod is the length of the px,py vector
          // projected on the X2,Y2=>X1,Y1 vector times the
          // length of the X2,Y2=>X1,Y1 vector
          projlenSq = dotprod * dotprod / (X2 * X2 + Y2 * Y2);
      }
  }
    // Distance to line is now the length of the relative point
    // vector minus the length of its projection onto the line
    // (which is zero if the projection falls outside the range
    //  of the line segment).
    var lenSq = px * px + py * py - projlenSq;
    if (lenSq < 0) {
        lenSq = 0;
    }
    return Math.sqrt(lenSq)<LINECORONA;
}
