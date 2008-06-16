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
shape.uml.Class=function(/*:String*/ className)
{
  Node.call(this);
  this.outputPort1 = null;
  this.outputPort2 = null;
  this.setDimension(50,50);
  this.setResizeable(false);

  this.setClassName(className);
}

shape.uml.Class.prototype = new  Node;
/** @private **/
shape.uml.Class.prototype.type="shape.uml.Class";

shape.uml.Class.prototype.setWorkflow=function(/*:Workflow*/ workflow)
{
  Node.prototype.setWorkflow.call(this,workflow);

  if(workflow!=null && this.portTop==null)
  {
    this.portTop = new shape.uml.InheritancePort();
    this.portTop.setWorkflow(workflow);
    this.addPort(this.portTop,0,0);

    this.portRight = new shape.uml.InheritancePort();
    this.portRight.setWorkflow(workflow);
    this.addPort(this.portRight,0,0);

    this.portBottom = new shape.uml.InheritancePort();
    this.portBottom.setWorkflow(workflow);
    this.addPort(this.portBottom,0,0);

    this.portLeft = new shape.uml.InheritancePort();
    this.portLeft.setWorkflow(workflow);
    this.addPort(this.portLeft,0,0);

    this.recalculateSize();
  }
}


shape.uml.Class.prototype.setClassName=function(/*:String*/ name)
{
  this.headerLabel.innerHTML=name;
  this.recalculateSize();
}

/**
 * Add a new attribute to the UML Class figure. An attribute is a simple
 * table row ("tr").
 *
 **/
shape.uml.Class.prototype.addAttribute=function(/*:String*/ name, /*:String*/ type, /*:String*/ defaultValue)
{
  var row = document.createElement("tr");
  this.table.appendChild(row);

  var td = document.createElement("td");
  td.style.whiteSpace="nowrap";
  row.appendChild(td);

  if(defaultValue)
    td.innerHTML=name+" : "+type+" = "+defaultValue;
  else
    td.innerHTML=name+" : "+type;
  this.recalculateSize();
}

/** 
 * Adjust the ports if the user resize the element
 *
 **/
shape.uml.Class.prototype.setDimension=function(/*:int*/ w, /*:int*/ h )
{
  Node.prototype.setDimension.call(this,w, h);

  if(this.portTop!=null)
  {
    this.portTop.setPosition(this.width/2, 0);
    this.portRight.setPosition(this.width, this.height/2);
    this.portBottom.setPosition(this.width/2, this.height);
    this.portLeft.setPosition(0, this.height/2);
  }
}


/**
 * Create the UML Class figure.
 * The figure is a simple HTML table with a "tr" for the header and
 * a "tr" for each attribute of the Class.
 *
 * @private
 **/
shape.uml.Class.prototype.createHTMLElement=function()
{
    var item = document.createElement('div');
    item.id        = this.id;
    item.style.position="absolute";
    item.style.left   = this.x+"px";
    item.style.top    = this.y+"px";
    item.style.height = this.width+"px";
    item.style.width  = this.height+"px";
    item.style.margin = "0px";
    item.style.padding= "0px";
    item.style.outline= "none";
    item.style.border="1px solid black";
    item.style.zIndex = ""+Figure.ZOrderBaseIndex;
    item.style.backgroundColor="rgb(255,255,206)";

    this.table = document.createElement("table");
    this.table.style.width="100%";
    this.table.style.height="100%";
    this.table.style.margin = "0px";
    this.table.style.padding= "0px";
    item.appendChild(this.table);

    var tableBody = document.createElement("tbody");
    this.table.appendChild(tableBody);

    var header = document.createElement("tr");
    tableBody.appendChild(header);

    this.headerLabel = document.createElement("td");
    this.headerLabel.style.align="left";
    this.headerLabel.style.verticalAlign="top";
    this.headerLabel.style.borderBottom="1px solid black";
    this.headerLabel.style.fontWeight="bold";
    this.headerLabel.style.textAlign="center";

    header.appendChild(this.headerLabel);

    this.headerLabel.innerHTML="";

    return item;
}

/**
 * Recalculate and set the real dimension of the element.
 *
 * @private
 **/
shape.uml.Class.prototype.recalculateSize=function(/*:String*/ name)
{
  this.setDimension(this.getWidth(), this.getHeight());
}


/**
 * The figures is not resizeable by the user. So - we calculate 
 * the real size of the figure. This depends on the content of the figure.
 *
 * @private
 **/
shape.uml.Class.prototype.getWidth=function()
{
   // calculation is only possible if the element a member of
   // the window.document
   //
   if(this.workflow==null)
      return 10;

   if(this.table.xgetBoundingClientRect)
     return this.table.getBoundingClientRect().right - this.table.getBoundingClientRect().left;
   else if(document.getBoxObjectFor)
     return document.getBoxObjectFor(this.table).width;
   else
     return this.table.offsetWidth;
}

/**
 * The figures is not resizeable by the user. So - we calculate 
 * the real size of the figure. This depends on the content of the figure.
 *
 * @private
 **/
shape.uml.Class.prototype.getHeight=function()
{
   // calculation is only possible if the element a member of
   // the window.document
   //
   if(this.workflow==null)
      return 10;

   if(this.table.xgetBoundingClientRect)
     return this.table.getBoundingClientRect().bottom - this.table.getBoundingClientRect().top;
   else if(document.getBoxObjectFor)
     return document.getBoxObjectFor(this.table).height;
   else
     return this.table.offsetHeight;
}
