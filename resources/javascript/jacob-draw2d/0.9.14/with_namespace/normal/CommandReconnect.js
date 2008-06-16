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
draw2d.CommandReconnect=function(/*:draw2d.Connection*/ con)
{
   draw2d.Command.call(this,"reconnect connection");
   this.con      = con;
   this.oldSourcePort  = con.getSource();
   this.oldTargetPort  = con.getTarget();
   this.oldRouter      = con.getRouter();
}

draw2d.CommandReconnect.prototype = new draw2d.Command;
/** @private **/
draw2d.CommandReconnect.prototype.type="CommandReconnect";

/**
 * Returns [true] if the command can be execute and the execution of the
 * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
 * return false. <br>
 * the execution of the Command doesn't modify the model.
 *
 * @type boolean
 **/
draw2d.CommandReconnect.prototype.canExecute=function()
{
  // return false if we doesn't modify the model => NOP Command
  return true;
}

draw2d.CommandReconnect.prototype.setNewPorts=function(/*:draw2d.Port*/ source, /*:draw2d.Port*/ target)
{
  this.newSourcePort = source;
  this.newTargetPort = target;
}

/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandReconnect.prototype.execute=function()
{
   this.redo();
}

/**
 * Undo the command
 *
 **/
draw2d.CommandReconnect.prototype.undo=function()
{
  this.con.setSource(this.oldSourcePort);
  this.con.setTarget(this.oldTargetPort);
  this.con.setRouter(this.oldRouter);
  if(this.con.getWorkflow().getCurrentSelection()==this.con)
     this.con.getWorkflow().showLineResizeHandles(this.con);
}

/** 
 * Redo the command after the user has undo this command
 *
 **/
draw2d.CommandReconnect.prototype.redo=function()
{
  this.con.setSource(this.newSourcePort);
  this.con.setTarget(this.newTargetPort);
  this.con.setRouter(this.oldRouter);
  if(this.con.getWorkflow().getCurrentSelection()==this.con)
     this.con.getWorkflow().showLineResizeHandles(this.con);
}
