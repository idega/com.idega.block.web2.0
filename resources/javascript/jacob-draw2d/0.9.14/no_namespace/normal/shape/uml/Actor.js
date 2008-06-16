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
shape.uml.Actor=function(/*:String*/ name)
{
  VectorFigure.call(this);
  this.setName(name);
  this.setDimension(50,90);
}

shape.uml.Actor.prototype = new VectorFigure;
/** @private **/
shape.uml.Actor.prototype.type="shape.uml.Actor";



/**
 * Set the name of the Actor
 *
 **/
shape.uml.Actor.prototype.setName=function(/*:String*/ name)
{
  this.label.innerHTML=name;
}


/**
 *
 * @private
 **/
shape.uml.Actor.prototype.setWorkflow=function(/*:Workflow*/ workflow)
{
  VectorFigure.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null && this.portRight==null)
  {
    this.portRight = new Port();
    this.portRight.setWorkflow(workflow);
    this.addPort(this.portRight,this.width, this.height/2);

    this.portLeft = new Port();
    this.portLeft.setWorkflow(workflow);
    this.addPort(this.portLeft,0, this.height/2);
  }
}

/**
 *
 * @private
 **/
shape.uml.Actor.prototype.createHTMLElement=function()
{
    var item = Figure.prototype.createHTMLElement.call(this);

    this.label = document.createElement("div");
    this.label.style.width="100%";
    this.label.style.height="20px";
    this.label.style.position="absolute";
    this.label.style.textAlign="center";
    this.label.style.top="0px";
    this.label.style.left="0px";
    this.label.style.fontSize="8pt";
// don't add them here. The Vector figure removes all children before repaint
//
//    item.appendChild(this.label);

    return item;
}

/** 
 * Adjust the ports if the user resize the element
 *
 **/
shape.uml.Actor.prototype.setDimension=function(/*:int*/ w, /*:int*/ h )
{
  VectorFigure.prototype.setDimension.call(this,w, h);

  if(this.portRight!=null)
  {
    this.portRight.setPosition(this.width, this.height/2);
    this.portLeft.setPosition(0, this.height/2);
  }
}

/**
 * The paint method is the place to put your own draw calls.
 * This method will be called from the framework. Don't call them manually.
 * @private
 **/
shape.uml.Actor.prototype.paint=function()
{
  // you must call the super-method to initialize the device context.
  VectorFigure.prototype.paint.call(this);

  var widthHalf = this.getWidth()/2;
  var widthQuarter = this.getWidth()/4;
  var heightHalf = this.getHeight()/2;
  var labelHeight = parseInt(this.label.style.height);

  // draw the head size = 20% of the width of the figure
  var headWidth  = this.getWidth()*0.2;
  var headHeight = this.getHeight()*0.1;
  this.graphics.drawOval(widthHalf-headWidth/2,0,headWidth,headHeight);

  // draw the body stick
  this.graphics.drawLine(widthHalf,headHeight, widthHalf, heightHalf);

  // draw the arms
  this.graphics.drawLine(widthQuarter,headHeight*2, this.getWidth()-widthQuarter, headHeight*2);

  // draw the legs
  this.graphics.drawLine(widthHalf,heightHalf, widthQuarter, this.getHeight()-labelHeight);
  this.graphics.drawLine(widthHalf,heightHalf, this.getWidth()-widthQuarter, this.getHeight()-labelHeight);

  // flush the paint instructions to the device context
  this.graphics.paint();

  // place the label
  this.label.style.top=(this.getHeight()-labelHeight)+"px";
  this.html.appendChild(this.label);
}
