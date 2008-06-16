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
draw2d.CommandMoveLine=function(/*:draw2d.Line*/ line, /*:int*/ startX, /*:int*/ startY, /*:int*/endX, /*:int*/ endY)
{
   draw2d.Command.call(this,"move line");
   this.line     = line;
   this.startX1  = startX;
   this.startY1  = startY;
   this.endX1    = endX;
   this.endY1    = endY;
}

draw2d.CommandMoveLine.prototype = new draw2d.Command;
/** @private **/
draw2d.CommandMoveLine.prototype.type="CommandMoveLine";

/**
 * Returns [true] if the command can be execute and the execution of the
 * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
 * return false. <br>
 * the execution of the Command doesn't modify the model.
 *
 * @type boolean
 **/
draw2d.CommandMoveLine.prototype.canExecute=function()
{
  // return false if we doesn't modify the model => NOP Command
  return this.startX1!=this.startX2 ||
         this.startY1!=this.startY2 ||
         this.endX1!=this.endX2 ||
         this.endY1!=this.endY2;
}

/**
 * Set the points after the line move.
 * 
 **/
draw2d.CommandMoveLine.prototype.setEndPoints=function(/*:int*/ startX, /*:int*/ startY, /*:int*/endX, /*:int*/ endY)
{
   this.startX2  = startX;
   this.startY2  = startY;
   this.endX2    = endX;
   this.endY2    = endY;
}


/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandMoveLine.prototype.execute=function()
{
   this.redo();
}

/**
 * Undo the command
 *
 **/
draw2d.CommandMoveLine.prototype.undo=function()
{
  this.line.setStartPoint(this.startX1, this.startY1);
  this.line.setEndPoint(this.endX1, this.endY1);
 
  if(this.line.workflow.getCurrentSelection()==this.line)
     this.line.workflow.showLineResizeHandles(this.line);
}

/** 
 * Redo the command after the user has undo this command
 *
 **/
draw2d.CommandMoveLine.prototype.redo=function()
{
  this.line.setStartPoint(this.startX2, this.startY2);
  this.line.setEndPoint(this.endX2, this.endY2);
  if(this.line.workflow.getCurrentSelection()==this.line)
     this.line.workflow.showLineResizeHandles(this.line);
}
