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
draw2d.ResizeImage=function(url)
{
  this.url = url;
  draw2d.Node.call(this);
  this.outputPort1 = null;
  this.outputPort2 = null;
  this.setDimension(100,100);
  this.setColor(null);
}

draw2d.ResizeImage.prototype = new  draw2d.Node;
draw2d.ResizeImage.prototype.type="ResizeImage";

/**
 * Initial call of the framework. This is the right placce to create your HTML elements
 *
 * @private
 **/
draw2d.ResizeImage.prototype.createHTMLElement=function()
{
    var item = draw2d.Node.prototype.createHTMLElement.call(this);
    if(navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER')
    {
       // we must creeate an addition div. 
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
       this.img = document.createElement("img");
       this.img.style.position="absolute";
       this.img.style.left   = "0px";
       this.img.style.top    = "0px";
       this.img.src=this.url;

       item.appendChild(this.img);

       // Add an div above the img. Required for a propper drag&drop handling.
       // If you remove this div, the image will crap the event and the internal drag&drop handling
       // is corrupt......bug?
       //
       this.d = document.createElement("div");
       this.d.style.position = "absolute";
       this.d.style.left     = "0px";
       this.d.style.top      = "0px";
       item.appendChild(this.d);
    }

    item.style.left     = this.x+"px";
    item.style.top      = this.y+"px";

    return item;
}

/**
 * Adjust the additional layer if the user resize the figure
 *
 * @param {int} w The new width of the fiure.
 * @param {int} h The new height of the figure
 **/
draw2d.ResizeImage.prototype.setDimension=function(/*:int*/ w, /*:int*/ h )
{
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
    this.img.width= this.width;
    this.img.height=this.height;
  }

  // Adjust the Output ports to the new dimension
  //
  if(this.outputPort1!=null)
  {
    this.outputPort1.setPosition(this.width+3, this.height/3);
    this.outputPort2.setPosition(this.width+3, this.height/3*2);
  }
}

/**
 * Create the output ports of the figure. This will done if the figure has been assigned to
 * a workflow Canvas.
 *
 * @param {draw2d.Workflow} workflow The new parent workflow of this figure.
 **/
draw2d.ResizeImage.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow)
{
  draw2d.Node.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null)
  {
    this.outputPort1 = new draw2d.OutputPort();
    this.outputPort1.setMaxFanOut(1); // It is only possible to add "1" Connector to this port
    this.outputPort1.setWorkflow(workflow);
    this.outputPort1.setBackgroundColor(new  draw2d.Color(245,115,115));
    this.addPort(this.outputPort1,this.width+3,this.height/3);

    this.outputPort2 = new draw2d.OutputPort();
    this.outputPort2.setMaxFanOut(1); // It is only possible to add "1" Connector to this port
    this.outputPort2.setWorkflow(workflow);
    this.outputPort2.setBackgroundColor(new  draw2d.Color(245,115,115));
    this.addPort(this.outputPort2,this.width+3,this.height/3*2);
  }
}
