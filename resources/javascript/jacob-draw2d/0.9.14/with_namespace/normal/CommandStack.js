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
draw2d.CommandStack=function()
{
   /** @private **/
   this.undostack = new Array();
   /** @private **/
   this.redostack = new Array();
   /** @private **/
   this.maxundo = 50;
   /** @private **/
   this.eventListeners = new draw2d.ArrayList();
}

/** Constant indicating notification prior to executing a command (value is 1).*/
draw2d.CommandStack.PRE_EXECUTE=1;
/** Constant indicating notification prior to redoing a command (value is 2).*/
draw2d.CommandStack.PRE_REDO=2;
/** Constant indicating notification prior to undoing a command (value is 4).*/
draw2d.CommandStack.PRE_UNDO=4;
/**  Constant indicating notification after a command has been executed (value is 8).*/
draw2d.CommandStack.POST_EXECUTE=8;
/** Constant indicating notification after a command has been redone (value is 16).*/
draw2d.CommandStack.POST_REDO=16;
/** Constant indicating notification after a command has been undone (value is 32).*/
draw2d.CommandStack.POST_UNDO=32;

draw2d.CommandStack.POST_MASK = draw2d.CommandStack.POST_EXECUTE | draw2d.CommandStack.POST_UNDO | draw2d.CommandStack.POST_REDO;
draw2d.CommandStack.PRE_MASK = draw2d.CommandStack.PRE_EXECUTE | draw2d.CommandStack.PRE_UNDO | draw2d.CommandStack.PRE_REDO;


/** @private **/
draw2d.CommandStack.prototype.type="CommandStack";

/**
 * Set the maximal undo stack size. Entries will be remove if the max. stack 
 * size has been reached.
 *
 * @param {int} count The maximal undo stack size.
 * 
 **/
draw2d.CommandStack.prototype.setUndoLimit=function(/*:int*/ count)
{
  this.maxundo = count;
}

/**
 * Remove the undo / redo history. This is usefull if the user has been save the 
 * document.
 *
 * 
 **/
draw2d.CommandStack.prototype.markSaveLocation=function()
{
   this.undostack = new Array();
   this.redostack = new Array();
}

/**
 * Executes the specified Command if possible. Prior to executing the command, a
 * draw2d.CommandStackEvent for {@link #PRE_EXECUTE} will be fired to event listeners. 
 * Similarly, after attempting to execute the command, an event for {@link #POST_EXECUTE}
 * will be fired.
 *
 * @param {draw2d.Command} command The command to execute.
 * 
 **/
draw2d.CommandStack.prototype.execute=function(/*:draw2d.Command*/ command)
{
   // return if the command can't execute or it doesn't change the model
   // => Empty command
   if(command.canExecute()==false)
      return;

   this.notifyListeners(command, draw2d.CommandStack.PRE_EXECUTE);

   this.undostack.push(command);
   command.execute();

   // cleanup the redo stack if the user execute a new command.
   // I think this will create a "clean" behaviour of the unde/redo mechanism.
   //
   this.redostack = new Array();

   // monitor the max. undo stack size
   //
   if(this.undostack.length > this.maxundo)
   {
      this.undostack = this.undostack.slice(this.undostack.length-this.maxundo);
   }
   this.notifyListeners(command, draw2d.CommandStack.POST_EXECUTE);
}

/**
 * Undo the command
 *
 **/
draw2d.CommandStack.prototype.undo=function()
{
   var command = this.undostack.pop();
   if(command)
   {
      this.notifyListeners(command, draw2d.CommandStack.PRE_UNDO);
      this.redostack.push(command);
      command.undo();
      this.notifyListeners(command, draw2d.CommandStack.POST_UNDO);
   }
}

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandStack.prototype.redo=function()
{
   var command = this.redostack.pop();

   if(command)
   {
      this.notifyListeners(command, draw2d.CommandStack.PRE_REDO);
      this.undostack.push(command);
      command.redo();
      this.notifyListeners(command, draw2d.CommandStack.POST_REDO);
   }
}

/**
 * @type boolean
 * @returns <code>true</code> if it is appropriate to call {@link #redo()}.
 */
draw2d.CommandStack.prototype.canRedo=function()
{
   return this.redostack.length>0;
}

/**
 * @type boolean
 * @returns <code>true</code> if {@link #undo()} can be called
 **/ 
draw2d.CommandStack.prototype.canUndo=function()
{
   return this.undostack.length>0;
}

/**
 * Adds a listener to the command stack, which will be notified whenever a command has been processed on the stack.
 * @param {draw2d.CommandStackListener} listener the listener to add.
 */
draw2d.CommandStack.prototype.addCommandStackEventListener=function(/*:draw2d.CommandStackEventListener*/ listener)
{
   this.eventListeners.add(listener);
}

/**
 * Removes a listener from the command stack.
 * @param {draw2d.CommandStackListener} listener the listener to remove.
 */
draw2d.CommandStack.prototype.removeCommandStackEventListener=function(/*:draw2d.CommandStackEventListener*/ listener)
{
   this.eventListeners.remove(listener);
}

/**
 * Notifies command stack event listeners that the command stack has changed to the
 * specified state.
 * 
 * @param {draw2d.Command} command the command
 * @param {int} state the current stack state
 *
 **/
draw2d.CommandStack.prototype.notifyListeners=function(/*:draw2d.Command*/ command, /*:int*/ state)
{
  var event = new draw2d.CommandStackEvent(command, state);
  var size = this.eventListeners.getSize();
  for (var i = 0; i < size; i++)
     this.eventListeners.get(i).stackChanged(event);
}
