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
draw2d.Task=function()
{
  //draw2d.ImageFigure.call(this,this.type+".png");
  draw2d.Node.call(this);
  this.inputPort = null;
  this.outputPort = null;
  this.label = null;
  this.setDimension(50,50);
  this.setColor(null);
    
  return this;
}

draw2d.Task.prototype = new draw2d.Node;
draw2d.Task.prototype.type="task-node";
  
draw2d.Task.prototype.createHTMLElement=function(){
    var item = draw2d.Node.prototype.createHTMLElement.call(this);
    this.url = this.type+".png";
  
    if(navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER')
    {
       // we must create an addition div. 
       // REASON: AlphaImageLoader clip all children. In this case no ports are visible.
       //         The ports of a node are DOM children of "this.html". Additional effort. :-(
       //
       this.d = document.createElement("div");
       this.d.style.position = "absolute";
       this.d.style.left     = "0px";
       this.d.style.top      = "0px";
       this.d.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader (src='"+ this.url+"', sizingMethod='scale')";
       item.appendChild(this.d);
    }
    else
    {
       this.d = document.createElement("div");
       this.d.style.position = "absolute";
       this.d.style.left     = "0px";
       this.d.style.top      = "0px";
     //  this.d.style.width = "auto";
     //  this.d.style.height = "auto";
       this.d.style.background = "url("+this.url+") no-repeat";
       this.d.style.font="bold 12px verdana";
       item.appendChild(this.d);
    }

    item.style.left     = this.x+"px";
    item.style.top      = this.y+"px";


  	this.textNode = document.createTextNode("My Label");
  	this.d.appendChild(this.textNode);    
	this.disableTextSelection(item);
  
////////////////////////////////
    return item;
}

draw2d.Task.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow){
 // draw2d.ImageFigure.prototype.setWorkflow.call(this,workflow);
  draw2d.Node.prototype.setWorkflow.call(this,workflow);
  
 // if(workflow!=null && this.inputPort==null){
  
  if(workflow!=null){
  	
    //DEFINE INPUT PORT
    // create a new Port element. Ports can be children of "Node" elements.
    // (Inheritance: End->Image->Node->Figure->Object)
    this.inputPort = new draw2d.InputPort();

    // set the paintarea/canvas for this port figure
    this.inputPort.setWorkflow(workflow);

    // set background color of the port
    this.inputPort.setBackgroundColor(new  draw2d.Color(115,115,245));
    this.inputPort.setColor(null);

    ////////////////////////////////////////////////////////////////////
    // INPORTANT: Now you can use the function "End.getPort("input")"!!!
    //            See in index.html for the usage!!!!
    //            This is the main differenct to the "connector_via_api1" demo.
    //
    this.inputPort.setName("input");
    ////////////////////////////////////////////////////////////////////
    // Add the port to this object at the top middle position
    this.addPort(this.inputPort,this.width/2,0);
    
    
    //DEFINE OUTPUT PORT
    this.outputPort = new draw2d.OutputPort();
    this.outputPort.setMaxFanOut(10); // It is possible to add "10" Connector to this port
    this.outputPort.setWorkflow(workflow);
    this.outputPort.setBackgroundColor(new  draw2d.Color(245,115,115));

    ////////////////////////////////////////////////////////////////////
    // INPORTANT: Now you can use the function "End.getPort("output")"!!!
    //            See in index.html for the usage!!!!
    //            This is the main differenct to the "connector_via_api1" demo.
    //
    this.outputPort.setName("output");
    ////////////////////////////////////////////////////////////////////

    this.addPort(this.outputPort,this.width/2,this.height);
  }
}  

/**
 * Adjust the additional layer if the user resize the figure
 *
 * @param {int} w The new width of the fiure.
 * @param {int} h The new height of the figure
 **/
draw2d.Task.prototype.setDimension=function(/*:int*/ w, /*:int*/ h ){
  draw2d.Node.prototype.setDimension.call(this,w, h);

  // Adjust the different layer/div/img object of the figure
  //
  if(this.d!=null)
  {
    this.d.style.width  = this.width+"px";
    this.d.style.height = this.height+"px";
  }

  if(this.img!=null)
  {
    this.img.width = this.width;
    this.img.height =this.height;
  }

  // Adjust the Output/Input ports to the new dimension
  //
  if(this.outputPort!=null){
    this.outputPort.setPosition(this.width/2,this.height);
  }
  
  if(this.inputPort!=null){
    this.inputPort.setPosition(this.width/2,0);
  }
}







