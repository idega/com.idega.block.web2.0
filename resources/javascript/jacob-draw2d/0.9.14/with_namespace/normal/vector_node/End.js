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
draw2d.End=function()
{
  draw2d.Oval.call(this);
  this.inputPort = null;
  this.setDimension(50,50);
  this.setColor(new  draw2d.Color(128,128,255));
  this.setLineWidth(2);
}

draw2d.End.prototype = new draw2d.Oval;
draw2d.End.prototype.type="End";

draw2d.End.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow)
{
  draw2d.Oval.prototype.setWorkflow.call(this,workflow);

  if(this.workflow!=null && this.inputPort==null)
  {
    // create a new Port element. Ports can be children of "Node" elements.
    // (Inheritance: End->Image->Node->Figure->Object)
    this.inputPort = new draw2d.InputPort();

    // set the paintarea/canvas for this port figure
    this.inputPort.setWorkflow(workflow);

    // set background color of the port
    this.inputPort.setBackgroundColor(new  draw2d.Color(115,115,245));

    // Add the port to this object at the left/middle position
    this.addPort(this.inputPort,0,this.height/2);
  }
}


/**
 *
 * Adjust the port to the new dimension of the object
 **/
draw2d.End.prototype.setDimension=function(/*:int*/ w, /*:int*/ h )
{
  draw2d.Oval.prototype.setDimension.call(this,w, h);
  if(this.inputPort!=null)
    this.inputPort.setPosition(0, this.height/2);
}

