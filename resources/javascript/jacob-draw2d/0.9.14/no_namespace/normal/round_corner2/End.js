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
End=function()
{
  ImageFigure.call(this,this.type+".png");
  this.inputPort = null;
  this.setDimension(50,50);
}

End.prototype = new ImageFigure;
End.prototype.type="End";

End.prototype.setWorkflow=function(/*:Workflow*/ workflow)
{
  ImageFigure.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null && this.inputPort==null)
  {
    // create a new Port element. Ports can be children of "Node" elements.
    // (Inheritance: End->Image->Node->Figure->Object)
    this.inputPort = new InputPort();
    this.inputPort.setWorkflow(workflow);
    this.inputPort.setBackgroundColor(new  Color(115,115,245));
    this.inputPort.setColor(null);
    this.inputPort.setName("input");

    // Add the port to this object at the left/middle position
    this.addPort(this.inputPort,0,this.height/2);
  }
}
