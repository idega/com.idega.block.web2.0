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
draw2d.InputPort=function(/*:draw2d.Figure*/ uiRepresentation)
{
  draw2d.Port.call(this, uiRepresentation);
}

draw2d.InputPort.prototype = new draw2d.Port;
/** @private **/
draw2d.InputPort.prototype.type="InputPort";


/**
 * @private
 **/
draw2d.InputPort.prototype.onDrop = function(/*: draw2d.Port*/ port)
{
  if(port.getMaxFanOut && port.getMaxFanOut()<= port.getFanOut())
    return;

  if(this.parentNode.id == port.parentNode.id)
  {
    // same parent node -> do nothing
  }
  else if(port instanceof draw2d.OutputPort)
  {
    // "port" is an OutputPort => Create a Command which creates a connection [port ---> this]
    // This is the different to the OutputPort implementation of onDrop.
    //
    var command = new draw2d.CommandConnect(this.parentNode.workflow,port,this);
    this.parentNode.workflow.getCommandStack().execute(command);
  }
}

/**
 *
 **/
draw2d.InputPort.prototype.onDragEnter = function(/*:draw2d.Port*/ port)
{
  // User drag&drop  a normal port
  if(port instanceof draw2d.OutputPort)
  {
    draw2d.Port.prototype.onDragEnter.call(this, port);
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof draw2d.LineStartResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.InputPort)
      draw2d.Port.prototype.onDragEnter.call(this, line.getSource());
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof draw2d.LineEndResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.InputPort)
       draw2d.Port.prototype.onDragEnter.call(this, line.getTarget());
  }
}

draw2d.InputPort.prototype.onDragLeave = function(/*:draw2d.Port*/ port)
{
  if(port instanceof draw2d.OutputPort)
  {
    draw2d.Port.prototype.onDragLeave.call(this, port);
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof draw2d.LineStartResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getSource() instanceof draw2d.InputPort)
       draw2d.Port.prototype.onDragLeave.call(this, line.getSource());
  }
  else if (port instanceof draw2d.LineEndResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof draw2d.Connection && line.getTarget() instanceof draw2d.InputPort)
       draw2d.Port.prototype.onDragLeave.call(this, line.getTarget());
  }
}
