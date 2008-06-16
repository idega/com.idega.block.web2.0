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
InputPort=function(/*:Figure*/ uiRepresentation)
{
  Port.call(this, uiRepresentation);
}

InputPort.prototype = new Port;
/** @private **/
InputPort.prototype.type="InputPort";


/**
 * @private
 **/
InputPort.prototype.onDrop = function(/*: Port*/ port)
{
  if(port.getMaxFanOut && port.getMaxFanOut()<= port.getFanOut())
    return;

  if(this.parentNode.id == port.parentNode.id)
  {
    // same parent node -> do nothing
  }
  else if(port instanceof OutputPort)
  {
    // "port" is an OutputPort => Create a Command which creates a connection [port ---> this]
    // This is the different to the OutputPort implementation of onDrop.
    //
    var command = new CommandConnect(this.parentNode.workflow,port,this);
    this.parentNode.workflow.getCommandStack().execute(command);
  }
}

/**
 *
 **/
InputPort.prototype.onDragEnter = function(/*:Port*/ port)
{
  // User drag&drop  a normal port
  if(port instanceof OutputPort)
  {
    Port.prototype.onDragEnter.call(this, port);
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof LineStartResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof Connection && line.getSource() instanceof InputPort)
      Port.prototype.onDragEnter.call(this, line.getSource());
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof LineEndResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof Connection && line.getTarget() instanceof InputPort)
       Port.prototype.onDragEnter.call(this, line.getTarget());
  }
}

InputPort.prototype.onDragLeave = function(/*:Port*/ port)
{
  if(port instanceof OutputPort)
  {
    Port.prototype.onDragLeave.call(this, port);
  }
  // User drag&drop a ResizeHandle. This will enforce a ConnectionReconnectCommand
  else if (port instanceof LineStartResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof Connection && line.getSource() instanceof InputPort)
       Port.prototype.onDragLeave.call(this, line.getSource());
  }
  else if (port instanceof LineEndResizeHandle)
  {
    var line = this.workflow.currentSelection;
    if(line instanceof Connection && line.getTarget() instanceof InputPort)
       Port.prototype.onDragLeave.call(this, line.getTarget());
  }
}
