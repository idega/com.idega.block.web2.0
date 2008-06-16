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
draw2d.CommandDelete=function(/*:draw2d.Figure*/ figure)
{
   draw2d.Command.call(this,"delete figure");
   this.parent   = figure.parent; // CompartmentFigure
   this.figure   = figure;
   this.workflow = figure.workflow;
   this.connections = null;
}

draw2d.CommandDelete.prototype = new draw2d.Command;
/** @private **/
draw2d.CommandDelete.prototype.type="CommandDelete";

/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandDelete.prototype.execute=function()
{
   this.redo();
}

/**
 * Undo the command
 *
 **/
draw2d.CommandDelete.prototype.undo=function()
{
    this.workflow.addFigure(this.figure);
    if(this.figure instanceof draw2d.Connection)
       this.figure.reconnect();

    this.workflow.setCurrentSelection(this.figure);
    if(this.parent!=null)
      this.parent.addChild(this.figure);
    for (var i = 0; i < this.connections.getSize(); ++i)
    {
       this.workflow.addFigure(this.connections.get(i));
       this.connections.get(i).reconnect();
    }
}

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandDelete.prototype.redo=function()
{
    this.workflow.removeFigure(this.figure);
    this.workflow.setCurrentSelection(null);
    if(this.figure.getPorts && this.connections==null)
    {
      this.connections = new draw2d.ArrayList();
      var ports = this.figure.getPorts();
      for(var i=0; i<ports.getSize(); i++)
      {
        if(ports.get(i).getConnections)
          this.connections.addAll(ports.get(i).getConnections());
      }
    }

   if(this.connections == null)
      this.connections = new draw2d.ArrayList();


    // remove this figure from the parent CompartmentFigure
    //
    if(this.parent!=null)
      this.parent.removeChild(this.figure);


   for (var i = 0; i < this.connections.getSize(); ++i)
   {
      this.workflow.removeFigure(this.connections.get(i));
   }
}
