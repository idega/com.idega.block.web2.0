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
 * @class A Node is the base class for all figures which can have {@link Port}s. A {@link Port} is the 
 * anchor for a {@link Connection} line.<br><br><b>Hint:</b> A {@link Port} is a green dot which can be draged and droped over another port.<br>
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
Node=function()
{
  /** @private **/
  this.bgColor = null;
  /** @private **/
  this.lineColor = new  Color(128,128,255);
  /** @private **/
  this.lineStroke=1;
  /** @private*/
  this.ports = new ArrayList();
  Figure.call(this);
}

Node.prototype = new Figure;
/** @private **/
Node.prototype.type="Node";


/**
 * @private
 **/
Node.prototype.dispose=function()
{
  for(var i=0;i<this.ports.getSize();i++)
  {
     this.ports.get(i).dispose();
  }
  this.ports = null;
  Figure.prototype.dispose.call(this);
}

/**
 * @private
 **/
Node.prototype.createHTMLElement=function()
{
    var item =Figure.prototype.createHTMLElement.call(this);
    item.style.width="auto";
    item.style.height="auto";
    item.style.margin="0px";
    item.style.padding="0px";
    if(this.lineColor!=null)
      item.style.border= this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
    item.style.fontSize="1px";
    if(this.bgColor!=null)
      item.style.backgroundColor=this.bgColor.getHTMLStyle();
    return item;
}

/**
 * @private
 **/
Node.prototype.paint=function()
{
  Figure.prototype.paint.call(this);

  for(var i=0;i<this.ports.getSize();i++)
  {
     this.ports.get(i).paint();
  }
}

/**
 * Return all ports of the node.
 *
 * @type  ArrayList
 **/
Node.prototype.getPorts=function()
{
  return this.ports;
/*
  var result = new Array();
  for(var i=0;i<this.ports.getSize();i++)
  {
     result.push(this.ports.get(i));
  }
  return result;
*/
}

/**
 * Return the port with the corresponding name.
 * @see Port#getName
 * @see Port#setName
 *
 * @param {String} portName The name of the port to return.
 * @return Returns the port with the hands over name or null.
 * @type Port
 **/
Node.prototype.getPort= function(/*:String*/ portName)
{
  if(this.ports==null)
    return null;
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port.getName() == portName)
      return port;
  }
}

/**
 *
 * @param {Port} port The new port to add.
 * @param {int}  x The x position.
 * @param {int}  y The y position.
 **/
Node.prototype.addPort=function(/*:Port*/ port, /*:int*/ x, /*:int*/y)
{
  this.ports.add(port);
  port.setOrigin(x,y);
  port.setPosition(x,y);
  port.setParent(this);
  // You can't delete a port with the [DEL] key if a port is a child of a node
  //
  port.setDeleteable(false);
  this.html.appendChild(port.getHTMLElement());
  if(this.workflow!=null)
  {
    this.workflow.registerPort(port);
  }
  // first initial paint
//  port.paint();
}

/**
 * @param {Port} port The port to remove.
 *
 **/
Node.prototype.removePort=function(/*:Port*/ port)
{
  if(this.ports!=null)
    this.ports.removeElementAt(this.ports.indexOf(port));
  try
  {
    this.html.removeChild(port.getHTMLElement());
  }
  catch(exc)
  {
    // es kann sein, dass es noch nicht eingehängt wurde
  }
  if(this.workflow!=null)
    this.workflow.unregisterPort(port);
}

/**
 * @private
 **/
Node.prototype.setWorkflow= function(/*:Workflow*/ workflow)
{
  var oldWorkflow = this.workflow;
  Figure.prototype.setWorkflow.call(this,workflow);

  if(oldWorkflow!=null)
  {
      for(var i=0;i<this.ports.getSize();i++)
      {
         oldWorkflow.unregisterPort(this.ports.get(i));
      }
  }

  if(this.workflow!=null)
  {
      for(var i=0;i<this.ports.getSize();i++)
      {
         this.workflow.registerPort(this.ports.get(i));
      }
  }
}

/**
 * Set the background color of the node.
 *
 * @param {Color} color
 **/
Node.prototype.setBackgroundColor= function(/*:Color*/ color)
{
  this.bgColor = color;
  if(this.bgColor!=null)
    this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
  else
    this.html.style.backgroundColor="transparent";
}

/**
 * Get the background color of the node.
 *
 * @type Color
 **/
Node.prototype.getBackgroundColor= function()
{
  return this.bgColor;
}

/**
 * @see Figure#setBorder
 * @deprecated
 **/
Node.prototype.setColor= function(/*:Color*/ color)
{
  this.lineColor = color;
  if(this.lineColor!=null)
     this.html.style.border= this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
  else
     this.html.style.border= "0px";
}


/**
 * @deprecated
 **/
Node.prototype.setLineWidth=function(/*:int*/ w)
{
  this.lineStroke=w;
  if(this.lineColor!=null)
     this.html.style.border= this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
  else
     this.html.style.border= "0px";
}
