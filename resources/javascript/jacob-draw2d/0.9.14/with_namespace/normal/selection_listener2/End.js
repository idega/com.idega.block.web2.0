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
  draw2d.ImageFigure.call(this,this.type+".png");
  this.inputPort = null;
  this.setDimension(50,50);
}

draw2d.End.prototype = new draw2d.ImageFigure;
draw2d.End.prototype.type="End";

draw2d.End.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow)
{
  draw2d.ImageFigure.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null && this.inputPort==null)
  {
    // create a new Port element. Ports can be children of "Node" elements.
    // (Inheritance: End->Image->Node->Figure->Object)
    this.inputPort1 = new draw2d.InputPort();
    this.inputPort1.setWorkflow(workflow);
    this.inputPort1.setBackgroundColor(new  draw2d.Color(115,115,245));
    this.inputPort1.setColor(null);
    this.inputPort1.setName("input1");
    this.addPort(this.inputPort1,0,this.height/2);


    // create a new Port element. Ports can be children of "Node" elements.
    // (Inheritance: End->Image->Node->Figure->Object)
    this.inputPort2 = new draw2d.InputPort();
    this.inputPort2.setWorkflow(workflow);
    this.inputPort2.setBackgroundColor(new  draw2d.Color(115,115,245));
    this.inputPort2.setColor(null);
    this.inputPort2.setName("input2");
    this.addPort(this.inputPort2,this.width/2,0);


    // create a new Port element. Ports can be children of "Node" elements.
    // (Inheritance: End->Image->Node->Figure->Object)
    this.inputPort3 = new draw2d.InputPort();
    this.inputPort3.setWorkflow(workflow);
    this.inputPort3.setBackgroundColor(new  draw2d.Color(115,115,245));
    this.inputPort3.setColor(null);
    this.inputPort3.setName("input3");
    this.addPort(this.inputPort3,this.width,this.height/2);

    // create a new Port element. Ports can be children of "Node" elements.
    // (Inheritance: End->Image->Node->Figure->Object)
    this.inputPort4 = new draw2d.InputPort();
    this.inputPort4.setWorkflow(workflow);
    this.inputPort4.setBackgroundColor(new  draw2d.Color(115,115,245));
    this.inputPort4.setColor(null);
    this.inputPort4.setName("input4");
    this.addPort(this.inputPort4,this.width/2,this.height);
  }
}
