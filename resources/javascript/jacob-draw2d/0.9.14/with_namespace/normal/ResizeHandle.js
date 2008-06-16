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

/*
    1             2               3
      O-----------O-------------O
      |                         |
      |                         |
    8 O                         O 4
      |                         |
      |                         |
      O-----------O-------------O
    7             6               5

TYPE
*/

/**
 * 
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.ResizeHandle=function(/*:draw2d.Workflow*/ workflow,  /*:int*/ type)
{
  draw2d.Rectangle.call(this,5,5);
  /** @private **/
  this.type = type;
  var offset= this.getWidth();
  var offset2 = offset/2;
  switch(this.type)
  {
    case 1:
      this.setSnapToGridAnchor(new draw2d.Point(offset,offset));
      break;
    case 2:
      this.setSnapToGridAnchor(new draw2d.Point(offset2,offset));
      break;
    case 3:
      this.setSnapToGridAnchor(new draw2d.Point(0,offset));
      break;
    case 4:
      this.setSnapToGridAnchor(new draw2d.Point(0,offset2));
      break;
    case 5:
      this.setSnapToGridAnchor(new draw2d.Point(0,0));
      break;
    case 6:
      this.setSnapToGridAnchor(new draw2d.Point(offset2,0));
      break;
    case 7:
      this.setSnapToGridAnchor(new draw2d.Point(offset,0));
      break;
    case 8:
      this.setSnapToGridAnchor(new draw2d.Point(offset,offset2));
      break;
  }
  this.setBackgroundColor(new  draw2d.Color(0,255,0));
  this.setWorkflow(workflow);
  this.setZOrder(10000);
}

draw2d.ResizeHandle.prototype = new draw2d.Rectangle;
/** @private **/
draw2d.ResizeHandle.prototype.type="ResizeHandle";


draw2d.ResizeHandle.prototype.getSnapToDirection=function()
{
  switch(this.type)
  {
    case 1:
     return draw2d.SnapToHelper.NORTH_WEST;
    case 2:
     return draw2d.SnapToHelper.NORTH;
    case 3:
     return draw2d.SnapToHelper.NORTH_EAST;
    case 4:
     return draw2d.SnapToHelper.EAST;
    case 5:
     return draw2d.SnapToHelper.SOUTH_EAST;
    case 6:
     return draw2d.SnapToHelper.SOUTH;
    case 7:
     return draw2d.SnapToHelper.SOUTH_WEST;
    case 8:
     return draw2d.SnapToHelper.WEST;
  }
}

/**
 * Will be called after a drag and drop action.<br>
 * Sub classes can override this method to implement additional stuff. Don't forget to call
 * the super implementation via <code>Figure.prototype.onDragend.call(this);</code>
 * @private
 **/
draw2d.ResizeHandle.prototype.onDragend = function()
{
  // An non draggable resizeHandle doesn't create a move/resize command.
  // This happens if the selected figure has set the "nonResizeable" flag.
  //
  if(this.commandMove==null)
      return;

  var figure = this.workflow.currentSelection;

  this.commandMove.setPosition(figure.getX(), figure.getY());
  this.commandResize.setDimension(figure.getWidth(), figure.getHeight());

  this.workflow.getCommandStack().execute(this.commandResize);
  this.workflow.getCommandStack().execute(this.commandMove);

  this.commandMove   = null;
  this.commandResize = null;

  this.workflow.hideSnapToHelperLines();
}

/**
 * Set the position of the object.<br>
 * The ResizeHandle overrides the Figure.setPosition method. The base
 * class updates the resize handles during the update of the Dimension/Position. This
 * is not neccessary for the ResizeHandles. Performance issue.
 * 
 * @param {int} xPos The new x coordinate of the figure
 * @param {int} yPos The new y coordinate of the figure 
 **/
draw2d.ResizeHandle.prototype.setPosition=function(/*:int*/ xPos , /*:int*/yPos )
{
  this.x = xPos;
  this.y = yPos;

  this.html.style.left = this.x+"px";
  this.html.style.top  = this.y+"px";
}

/**
 * Will be called if the drag and drop action beginns. You can return [false] if you
 * want avoid the that the figure can be move.
 * 
 * @type boolean
 **/
draw2d.ResizeHandle.prototype.onDragstart = function(/*:int*/ x, /*:int*/ y)
{
  // This happens if the selected figure has set the "nonResizeable" flag
  // In this case the ResizeHandle can't be dragged. => no resize
  //
  if(!this.canDrag)
    return false;

  var figure = this.workflow.currentSelection;

  this.commandMove   = new draw2d.CommandMove(figure,figure.getX(), figure.getY());
  this.commandResize = new draw2d.CommandResize(figure, figure.getWidth(),figure.getHeight());

  return true;
}


/**
 *
 **/
draw2d.ResizeHandle.prototype.onDrag = function()
{
  var oldX = this.getX()
  var oldY = this.getY();
  draw2d.Rectangle.prototype.onDrag.call(this);
  var diffX = oldX-this.getX();
  var diffY = oldY-this.getY();

  var objPosX = this.workflow.currentSelection.getX();
  var objPosY = this.workflow.currentSelection.getY();
  var objWidth= this.workflow.currentSelection.getWidth();
  var objHeight= this.workflow.currentSelection.getHeight();
  switch(this.type)
  {
    case 1:
      this.workflow.currentSelection.setPosition(objPosX-diffX, objPosY-diffY);
      this.workflow.currentSelection.setDimension(objWidth+diffX, objHeight+diffY);
      break;
    case 2:
      this.workflow.currentSelection.setPosition(objPosX, objPosY-diffY);
      this.workflow.currentSelection.setDimension(objWidth, objHeight+diffY);
      break;
    case 3:
      this.workflow.currentSelection.setPosition(objPosX, objPosY-diffY);
      this.workflow.currentSelection.setDimension(objWidth-diffX, objHeight+diffY);
      break;
    case 4:
      this.workflow.currentSelection.setPosition(objPosX, objPosY);
      this.workflow.currentSelection.setDimension(objWidth-diffX, objHeight);
      break;
    case 5:
      this.workflow.currentSelection.setPosition(objPosX, objPosY);
      this.workflow.currentSelection.setDimension(objWidth-diffX, objHeight-diffY);
      break;
    case 6:
      this.workflow.currentSelection.setPosition(objPosX, objPosY);
      this.workflow.currentSelection.setDimension(objWidth, objHeight-diffY);
      break;
    case 7:
      this.workflow.currentSelection.setPosition(objPosX-diffX, objPosY);
      this.workflow.currentSelection.setDimension(objWidth+diffX, objHeight-diffY);
      break;
    case 8:
      this.workflow.currentSelection.setPosition(objPosX-diffX, objPosY);
      this.workflow.currentSelection.setDimension(objWidth+diffX, objHeight);
      break;
  }
  this.workflow.moveResizeHandles(this.workflow.getCurrentSelection());
}

draw2d.ResizeHandle.prototype.setCanDrag=function(/*:boolean*/ flag)
{
  draw2d.Rectangle.prototype.setCanDrag.call(this,flag);
  if(!flag)
  {
    this.html.style.cursor="";
    return;
  }

  switch(this.type)
  {
    case 1:
      this.html.style.cursor="nw-resize";
      break;
    case 2:
      this.html.style.cursor="s-resize";
      break;
    case 3:
      this.html.style.cursor="ne-resize";
      break;
    case 4:
      this.html.style.cursor="w-resize";
      break;
    case 5:
      this.html.style.cursor="se-resize";
      break;
    case 6:
      this.html.style.cursor="n-resize";
      break;
    case 7:
      this.html.style.cursor="sw-resize";
      break;
    case 8:
      this.html.style.cursor="e-resize";
      break;
  }
}

/**
 *
 **/
draw2d.ResizeHandle.prototype.onKeyDown=function(/*:int*/keyCode, /*:boolean*/ctrl)
{
  // don't call the parent function. The parent functions delete this object
  // and a resize handle can't be deleted.
  this.workflow.onKeyDown(keyCode,ctrl);
}


draw2d.ResizeHandle.prototype.fireMoveEvent=function()
{
  // a resizeHandle doesnÄt ifre this event.
  //Normale this set the document dirty. This is not neccessary for a ResizeHandle.
}