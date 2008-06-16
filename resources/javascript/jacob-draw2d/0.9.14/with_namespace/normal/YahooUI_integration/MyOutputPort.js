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
 * @version 0.8.2
 * @author Andreas Herz
 * @constructor
 */
draw2d.MyOutputPort=function(/*:draw2d.Figure*/ uiRepresentation)
{
  draw2d.OutputPort.call(this, uiRepresentation);
}

draw2d.MyOutputPort.prototype = new draw2d.OutputPort;
/** @private **/
draw2d.MyOutputPort.prototype.type="MyOutputPort";

/**
 * @private
 * @param {draw2d.Port} port The port on which this port has been droped
 **/
draw2d.MyOutputPort.prototype.onDrop = function(/*:draw2d.Port*/ port)
{
  if(this.getMaxFanOut()<=this.getFanOut())
    return;

  if(this.parentNode.id == port.parentNode.id)
  {
    // same parentNode -> do nothing
  }
  else
  {
    var command = new draw2d.CommandConnect(this.parentNode.workflow,this, port);

    //////////////////////////////////////////////////////////////////////
    // THIS IS THE KEY FOR MY OWN CONNECTION TYPE!!!
    //
    command.setConnection(new draw2d.ContextmenuConnection());
    //////////////////////////////////////////////////////////////////////


    this.parentNode.workflow.getCommandStack().execute(command);
  }
}
