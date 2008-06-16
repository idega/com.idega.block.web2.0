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
  this.outputPort = null;
  this.setDimension(50,50);
}

draw2d.Start.prototype = new draw2d.ImageFigure;
draw2d.Start.prototype.type="Start";

draw2d.Start.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow)
{
  draw2d.ImageFigure.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null && this.outputPort==null)
  {
    this.outputPort1 = new draw2d.OutputPort();
    this.outputPort1.setWorkflow(workflow);
    this.outputPort1.setMaxFanOut(4);
    this.outputPort1.setBackgroundColor(new  draw2d.Color(245,115,115));
    this.outputPort1.setName("output1");
    this.addPort(this.outputPort1,this.width,this.height/2);

    this.outputPort2 = new draw2d.OutputPort();
    this.outputPort2.setWorkflow(workflow);
    this.outputPort2.setMaxFanOut(4);
    this.outputPort2.setBackgroundColor(new  draw2d.Color(245,115,115));
    this.outputPort2.setName("output2");
    this.addPort(this.outputPort2,this.width/2,0);

    this.outputPort3 = new draw2d.OutputPort();
    this.outputPort3.setWorkflow(workflow);
    this.outputPort3.setMaxFanOut(4);
    this.outputPort3.setBackgroundColor(new  draw2d.Color(245,115,115));
    this.outputPort3.setName("output3");
    this.addPort(this.outputPort3,this.width/2,this.height);

    this.outputPort4 = new draw2d.OutputPort();
    this.outputPort4.setWorkflow(workflow);
    this.outputPort4.setMaxFanOut(4);
    this.outputPort4.setBackgroundColor(new  draw2d.Color(245,115,115));
    this.outputPort4.setName("output4");
    this.addPort(this.outputPort4,0,this.height/2);
  }
}
