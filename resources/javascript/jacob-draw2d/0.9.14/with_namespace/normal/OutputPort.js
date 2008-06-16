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
draw2d.OutputPort=function(/*:draw2d.Figure*/ uiRepresentation)
{
  draw2d.Port.call(this, uiRepresentation);

  /** @private **/
  this.maxFanOut = 100; // the maximimum connections which goes out of this port
}

draw2d.OutputPort.prototype = new draw2d.Port;
/** @private **/
draw2d.OutputPort.prototype.type="OutputPort";


/**
 * @private
 **/
draw2d.OutputPort.prototype.onDrop = function(/*:draw2d.Port*/ port)
{
  if(this.getMaxFanOut()<=this.getFanOut())
    return;

  if(this.parentNode.id == port.parentNode.id)
  {
    // same parentNode -> do nothing
  }
  else if(port instanceof draw2d.InputPort)
  {
    // "port" is an InputPort => Create a Command which creates a connection [this ---> port]
    // This is the different to the InputPort implementation of onDrop.
    //
    var command = new draw2d.CommandConnect(this.parentNode.workflow,this, port);
    this.parentNode.workflow.getCommandStack().execute(command);
  }
}

/**
 *
 **/
draw2d.OutputPort.prototype.onDragEnter = function(/*:draw2d.Port*/ port)
{
  if(this.getMaxFanOut()<=this.getFanOut())
    return;

  if(port instanceof draw2d.InputPort)
  {
    draw2d.Port.prototype.onDragEnter.call(this, port);
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof draw2d.LineStartResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.OutputPort)
      draw2d.Port.prototype.onDragEnter.call(this, line.getSource());
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof draw2d.LineEndResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.OutputPort)
       draw2d.Port.prototype.onDragEnter.call(this, line.getTarget());
  }
}

draw2d.OutputPort.prototype.onDragLeave = function(/*:draw2d.Port*/ port)
{
  if(port instanceof draw2d.InputPort)
  {
    draw2d.Port.prototype.onDragLeave.call(this, port);
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof draw2d.LineStartResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.OutputPort)
       draw2d.Port.prototype.onDragLeave.call(this, line.getSource());
  }
  else if (port instanceof draw2d.LineEndResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.OutputPort)
       draw2d.Port.prototype.onDragLeave.call(this, line.getTarget());
  }
}

/**
 * @private
 **/
draw2d.OutputPort.prototype.onDragstart = function(/*:int*/ x, /*:int*/ y)
{
  if(this.maxFanOut==-1)
    return true;

  if(this.getMaxFanOut()<=this.getFanOut())
    return false;

  return true;
}



draw2d.OutputPort.prototype.setMaxFanOut = function(/*:int*/ count)
{
  this.maxFanOut = count;
}

draw2d.OutputPort.prototype.getMaxFanOut = function()
{
  return this.maxFanOut;
}

/**
 * @type int
 **/
draw2d.OutputPort.prototype.getFanOut = function()
{
  if(this.getParent().workflow==null)
    return 0;

  var count =0;
  var lines = this.getParent().workflow.getLines();
  var size=lines.getSize();
  for(var i=0;i< size;i++)
  {
    var line = lines.get(i);
    if(line instanceof draw2d.Connection)
    {
      if(line.getSource()==this)
        count++;
      else if(line.getTarget()==this)
        count++;
    }
  }
  return count;
}