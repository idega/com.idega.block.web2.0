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
draw2d.Window=function(/*:String*/ title)
{
  /** @private **/
  this.title =title;
  /** @private **/
  this.titlebar=null;

  draw2d.Figure.call(this);

  // It is not possible to delete a window with the [DEL] key
  //
  this.setDeleteable(false);

  // A window ignores the grid or geometry snapper
  this.setCanSnapToHelper(false);

  // A window object should have the biggest z-order index.
  this.setZOrder(draw2d.Window.ZOrderIndex);
}

draw2d.Window.prototype = new draw2d.Figure;

/** @private **/
draw2d.Window.prototype.type="Window";


/** @private **/
draw2d.Window.ZOrderIndex=50000;


/**
 * Set the common z-index of the window element. This method exists for
 * compatibility reason to dojo or another UI javascript library. 
 * It is now ossible to arange the draw2d elements behind/before other UI elements-
 *
 * @see #setZOrder
 * @static
 * @param {int} index The z-order for all new window objects.
 **/
draw2d.Window.setZOrderBaseIndex=function(/*:int*/ index)
{
  draw2d.Window.ZOrderBaseIndex = index;
}

/**
 * Return true if the origin of the Object is the window and not
 * the document. This is usefull if you want implement a window or a
 * dialog element. The element doesn't move if the user scroll the document.
 *
 * @returns Returns [true] if the origin of the object the window.
 * @type boolean
 **/
draw2d.Window.prototype.hasFixedPosition=function()
{
  return true;
}

/**
 * Return true if the window has a title bar
 *
 * @returns Returns [true] if the window has a title bar
 * @type boolean
 **/
draw2d.Window.prototype.hasTitleBar=function()
{
  return true;
}

/**
 * @private
 **/
draw2d.Window.prototype.createHTMLElement=function()
{
  var item = draw2d.Figure.prototype.createHTMLElement.call(this);
  item.style.margin="0px";
  item.style.padding="0px";
  item.style.border= "1px solid black";
  item.style.backgroundImage="url(window_bg.png)";
  item.style.zIndex=draw2d.Window.ZOrderBaseIndex;
  item.style.cursor=null;

  if(this.hasTitleBar())
  {
   this.titlebar = document.createElement("div");
   this.titlebar.style.position="absolute";
   this.titlebar.style.left   = "0px";
   this.titlebar.style.top    = "0px";
   this.titlebar.style.width = this.getWidth()+"px";
   this.titlebar.style.height = "15px";
   this.titlebar.style.margin = "0px";
   this.titlebar.style.padding= "0px";
   this.titlebar.style.font="normal 10px verdana";
   this.titlebar.style.backgroundColor="blue";
   this.titlebar.style.borderBottom="2px solid gray";
   this.titlebar.style.whiteSpace="nowrap";
   this.titlebar.style.textAlign="center";
   this.titlebar.style.backgroundImage="url(window_toolbar.png)";
   this.textNode = document.createTextNode(this.title);
   this.titlebar.appendChild(this.textNode);

//   this.disableTextSelection(this.titlebar);

   item.appendChild(this.titlebar);
  }
  return item;
}

/** 
 * @private
 **/
draw2d.Window.prototype.setDocumentDirty=function( /*:draw2d.Figure*/ figure)
{
  // a window can't invalidate a document.
  // Reason: Movement of a Dialog or Window is not relay a document modification.
}

draw2d.Window.prototype.onDragend = function()
{
  // do nothing
}

/**
 * Will be called if the object are move via drag and drop.
 * Don't override this method if you want avoid the drag and drob of your window.
 * Use the setCanDrag(false) method instead.<br>
 *
 * @param {int} x x position of the mouse in the window
 * @param {int} y y position of the mouse in the window
 * @returns Returns [true] if the window can be draged. False in the other case
 * @type boolean
 **/
draw2d.Window.prototype.onDragstart = function(/*:int*/ x, /*:int*/ y)
{
  // no titlebar => no drag drop
  // Reson: The titlebar is the DragDrop handle.
  //
  if(this.titlebar==null)
    return false;

  // Return only true if the user klicks into the tilebar.
  // (Titlebar is the DragDrop handle for a window)
  //
  if(this.canDrag==true && x<parseInt(this.titlebar.style.width) && y<parseInt(this.titlebar.style.height))
    return true;

  // add additional checks for the bottom/right resize handle
  // TODO

  return false;
}

/**
 * @private
 * @type boolean
 **/
draw2d.Window.prototype.isSelectable=function()
{
  return false;
}

/**
 * Switch on/off the drag drop behaviour of this object
 * @param {boolean} flag The flag which handles the drag drop behaviour of this window.
 *
 **/
draw2d.Window.prototype.setCanDrag=function(/*:boolean*/flag)
{
  draw2d.Figure.prototype.setCanDrag.call(this,flag);
  this.html.style.cursor="";
  if(this.titlebar==null)
    return;

  if(flag)
    this.titlebar.style.cursor="move";
  else
    this.titlebar.style.cursor="";
}


/**
 * Will be called from the framework if the figure/window has been added to a Workflow 
 * instance.
 *
 * @private
 **/
draw2d.Window.prototype.setWorkflow= function( /*:draw2d.Workflow*/ workflow)
{
  var oldWorkflow = this.workflow;
  draw2d.Figure.prototype.setWorkflow.call(this,workflow);
  if(oldWorkflow!=null)
    oldWorkflow.removeSelectionListener(this);
  if(this.workflow!=null)
    this.workflow.addSelectionListener(this);
}

/**
 * Set the new dimension of the window.
 *
 * @param {int} w new width of the window. 
 * @param {int} h new height of the window. 
 **/
draw2d.Window.prototype.setDimension=function(/*:int*/ w, /*:int*/ h)
{
  draw2d.Figure.prototype.setDimension.call(this,w,h);

  if(this.titlebar!=null)
    this.titlebar.style.width=this.getWidth()+"px";
}

/**
 * Set the new title / header of this dialog.
 *
 * @param {String} title The new title of the window
 **/
draw2d.Window.prototype.setTitle= function(/*:String*/ title)
{
  this.title = title;
}

/**
 * @type int
 **/
draw2d.Window.prototype.getMinWidth=function()
{
  return 50;
}

/**
 * @type int
 **/
draw2d.Window.prototype.getMinHeight=function()
{
  return 50;
}

/**
 *
 **/
draw2d.Window.prototype.isResizeable=function()
{
  return false;
}


/**
 * Avoid the alpha blending during the drag and drop of an window. This will only cost 
 * performance and I think this is importand.
 * @private
 **/
draw2d.Window.prototype.setAlpha=function(percent /*:int 0-1*/)
{
  // sieht nicht gut aus bei einem Fenster und kostet nur Resourcen
}

/**
 * Set the background color of the window.
 * @param {draw2d.Color} color The new background color of the object.
 *
 **/
draw2d.Window.prototype.setBackgroundColor= function(/*:draw2d.Color*/ color)
{
  this.bgColor = color;
  if(this.bgColor!=null)
    this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
  else
  {
    this.html.style.backgroundColor="transparent";
    this.html.style.backgroundImage="";
  }
}

/**
  * @param {draw2d.Color} color The new border color of the window.
  *
 **/
draw2d.Window.prototype.setColor= function(/*:draw2d.Color*/ color)
{
  this.lineColor = color;
  if(this.lineColor!=null)
   this.html.style.border= this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
  else
   this.html.style.border= "0px";
}


/**
 * mmmh, make this sense? 
 * Line width has beend mapped to the border width. 
 * TODO: Implement a propper setBorder() method for the window.
 *
 * @param {int} w The new border width of the window.
 **/
draw2d.Window.prototype.setLineWidth=function(/*:int*/ w)
{
  this.lineStroke=w;
  this.html.style.border= this.lineStroke+"px solid black";
}

/**
 * Call back method of the framework if the selected object has been changed.
 *
 * @param {draw2d.Figure} figure the object which has been selected.
 **/
draw2d.Window.prototype.onSelectionChanged=function(/*:draw2d.Figure*/ figure)
{
}

