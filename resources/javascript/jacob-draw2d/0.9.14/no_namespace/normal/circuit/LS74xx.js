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
LS74xx=function(/*:String*/ title)
{
  this.title = title;
  Node.call(this);
  this.out1 = null;
  this.out2 = null;
  this.out3 = null;
  this.out4 = null;
  this.out5 = null;
  this.out6 = null;
  this.out7 = null;
  this.out8 = null;
  this.in1 = null;
  this.in2 = null;
  this.in3 = null;
  this.in4 = null;
  this.in5 = null;
  this.in6 = null;
  this.in7 = null;
  this.in8 = null;
  this.setColor(new Color(255,128,255));
  this.setBackgroundColor(new Color(245,245,255));
  this.setDimension(250,50);
//  this.setResizeable(false);
}

LS74xx.prototype = new  Node;
LS74xx.prototype.type="LS74xx";

/**
 * Add a centered label and the slot to the figure
 *
 * @private
 **/
LS74xx.prototype.createHTMLElement=function()
{
  var item = CompartmentFigure.prototype.createHTMLElement.call(this);

  this.label = document.createElement("div");
  this.label.style.position="absolute";
  this.label.style.left   = "0px";
  this.label.style.top    = "5px";
  this.label.style.width = "100%";
  this.label.style.height = (this.getHeight()-10)+"px";
  this.label.style.font="normal 10px verdana";
  this.label.style.textAlign="center";
  this.textNode = document.createTextNode(this.title);
  this.label.appendChild(this.textNode);

  item.appendChild(this.label);


  this.slot = document.createElement("img");
  this.slot.src="slot.png";
  this.slot.style.position="absolute";
  this.slot.style.left   = "0px";
  this.slot.style.top    = (this.getHeight()/2-7)+"px";
  item.appendChild(this.slot);

  return item;
}


LS74xx.prototype.setWorkflow=function(/*:Workflow*/ workflow)
{
  Node.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null && this.out1==null)
  {
    var distance = this.width/8;
    var dHalf = distance/2;
    this.out1 = new OutputPort();
    this.out1.setWorkflow(workflow);
    this.addPort(this.out1,distance*1-dHalf,this.height);

    this.out2 = new OutputPort();
    this.out2.setWorkflow(workflow);
    this.addPort(this.out2,distance*2-dHalf,this.height);

    this.out3 = new OutputPort();
    this.out3.setWorkflow(workflow);
    this.addPort(this.out3,distance*3-dHalf,this.height);

    this.out4 = new OutputPort();
    this.out4.setWorkflow(workflow);
    this.addPort(this.out4,distance*4-dHalf,this.height);

    this.out5 = new OutputPort();
    this.out5.setWorkflow(workflow);
    this.addPort(this.out5,distance*5-dHalf,this.height);

    this.out6 = new OutputPort();
    this.out6.setWorkflow(workflow);
    this.addPort(this.out6,distance*6-dHalf,this.height);

    this.out7 = new OutputPort();
    this.out7.setWorkflow(workflow);
    this.addPort(this.out7,distance*7-dHalf,this.height);

    this.out8 = new OutputPort();
    this.out8.setWorkflow(workflow);
    this.addPort(this.out8,distance*8-dHalf,this.height);

    this.in1 = new InputPort();
    this.in1.setWorkflow(workflow);
    this.in1.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in1,distance*1-dHalf,0);

    this.in2 = new InputPort();
    this.in2.setWorkflow(workflow);
    this.in2.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in2,distance*2-dHalf,0);

    this.in3 = new InputPort();
    this.in3.setWorkflow(workflow);
    this.in3.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in3,distance*3-dHalf,0);

    this.in4 = new InputPort();
    this.in4.setWorkflow(workflow);
    this.in4.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in4,distance*4-dHalf,0);

    this.in5 = new InputPort();
    this.in5.setWorkflow(workflow);
    this.in5.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in5,distance*5-dHalf,0);

    this.in6 = new InputPort();
    this.in6.setWorkflow(workflow);
    this.in6.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in6,distance*6-dHalf,0);

    this.in7 = new InputPort();
    this.in7.setWorkflow(workflow);
    this.in7.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in7,distance*7-dHalf,0);

    this.in8 = new InputPort();
    this.in8.setWorkflow(workflow);
    this.in8.setBackgroundColor(new Color(255,128,128));
    this.addPort(this.in8,distance*8-dHalf,0);
  }
}

/** 
 * Adjust the ports if the user resize the element
 *
 **/
LS74xx.prototype.setDimension=function(/*:int*/ w, /*:int*/ h )
{
  Node.prototype.setDimension.call(this,w, h);

  if(this.label!=null)
  {
    this.label.style.height = (this.getHeight()-10)+"px";
    this.slot.style.top     = ((this.getHeight()/2)-7)+"px";
  }

  if(this.out1!=null)
  {

    var distance = this.width/8;
    var dHalf = distance/2;
    this.out1.setPosition(distance*1-dHalf,this.height);
    this.out2.setPosition(distance*2-dHalf,this.height);
    this.out3.setPosition(distance*3-dHalf,this.height);
    this.out4.setPosition(distance*4-dHalf,this.height);
    this.out5.setPosition(distance*5-dHalf,this.height);
    this.out6.setPosition(distance*6-dHalf,this.height);
    this.out7.setPosition(distance*7-dHalf,this.height);
    this.out8.setPosition(distance*8-dHalf,this.height);

    this.in1.setPosition(distance*1-dHalf,0);
    this.in2.setPosition(distance*2-dHalf,0);
    this.in3.setPosition(distance*3-dHalf,0);
    this.in4.setPosition(distance*4-dHalf,0);
    this.in5.setPosition(distance*5-dHalf,0);
    this.in6.setPosition(distance*6-dHalf,0);
    this.in7.setPosition(distance*7-dHalf,0);
    this.in8.setPosition(distance*8-dHalf,0);
  }
}



/**
 * Callback method for the mouse enter event. Usefull for mouse hover-effects.
 * Sub classes can override this method to implement their own behaviour.
 **/
LS74xx.prototype.onMouseEnter=function()
{
  this.setColor(new Color(255,0,255));
}


/**
 * Callback method for the mouse leave event. Usefull for mouse hover-effects.
 * 
 **/
LS74xx.prototype.onMouseLeave=function()
{
  this.setColor(new Color(255,128,255));
}



