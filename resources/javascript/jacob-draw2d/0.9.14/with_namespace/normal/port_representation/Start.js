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
draw2d.Start=function()
{
  draw2d.ImageFigure.call(this,this.type+".png");
  this.outputPort1 = null;
  this.outputPort2 = null;
  this.setDimension(50,60);
}

draw2d.Start.prototype = new draw2d.ImageFigure;
/** @private **/
draw2d.Start.prototype.type="Start";

draw2d.Start.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow)
{
  draw2d.ImageFigure.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null && this.outputPort==null)
  {
    this.outputPort1 = new draw2d.OutputPort(new draw2d.ImageFigure("port1.png"));
    this.outputPort1.setMaxFanOut(1); // It is only possible to add "1" Connector to this port
    this.outputPort1.setWorkflow(workflow);
    this.outputPort1.setDimension(10,10);
    this.addPort(this.outputPort1,this.width,this.height/4);


    this.outputPort2 = new draw2d.OutputPort(new draw2d.ImageFigure("port2.png"));
    this.outputPort2.setMaxFanOut(1); // It is only possible to add "1" Connector to this port
    this.outputPort2.setDimension(10,10);
    this.outputPort2.setWorkflow(workflow);
    this.addPort(this.outputPort2,this.width,this.height/4*3);
  }
}
