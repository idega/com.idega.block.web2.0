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
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA,
or see http://www.gnu.org/copyleft/lesser.html
*/
TableFigure=function(/*:TableModel*/ table)
{
 if(!table)
    return;
 this.table = null;
 this.header = null;
 this.leftPort = null;
 this.topPort = null;
 this.rightPort = null;
 this.bottomPort = null;

 this.tableModel = table;

 draw2d.Node.call(this);

 this.setResizeable(false);
}

TableFigure.prototype = new draw2d.Node;
TableFigure.prototype.type="TableFigure";


TableFigure.prototype.createHTMLElement=function()
{
 var item = Node.prototype.createHTMLElement.call(this);

 item.style.width="100px";
 item.style.height="100px";
 item.style.margin="0px";
 item.style.padding="0px";

 this.table = document.createElement("table");
 this.table.style.fontSize="8pt";
 this.table.style.margin="0px";
 this.table.style.padding="0px";
 this.table.cellPadding ="0";
 this.table.cellSpacing ="0";

 var row=this.table.insertRow(0);
 this.header=row.insertCell(0);
 this.header.innerHTML = "Test";
 this.header.colSpan="2";
 this.header.style.background ="transparent url(header.png) repeat-x";
 this.header.style.height ="25px";
 this.header.style.paddingLeft ="5px";
 this.header.style.paddingRight ="5px";
 item.appendChild(this.table);

 return item;
}


TableFigure.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow)
{
 draw2d.Node.prototype.setWorkflow.call(this,workflow);

 if(workflow!=null)
 {
 this.setDimension(this.getWidth(),this.getHeight());

 this.leftPort = new draw2d.Port();
 this.leftPort.setWorkflow(workflow);
 this.addPort(this.leftPort,0,this.height/2);

 this.topPort = new draw2d.Port();
 this.topPort.setWorkflow(workflow);
 this.addPort(this.topPort,this.width/2,0);

 this.rightPort = new draw2d.Port();
 this.rightPort.setWorkflow(workflow);
 this.addPort(this.rightPort,this.width,this.height/2);

 this.bottomPort = new draw2d.Port();
 this.bottomPort.setWorkflow(workflow);
 this.addPort(this.bottomPort,this.width/2,this.height);



 this.setTableName(this.tableModel.getName());
 var fields = this.tableModel.getFieldModels();
 for(var i=0; i<fields.getSize(); i++)
 {
 this.addColumn(fields.get(i).getExtendedDescriptionLabel());
 }

 }
}

/**
 * Adjust the ports if the user resize the element
 *
 **/
TableFigure.prototype.setDimension=function(/*:int*/ w, /*:int*/ h )
{
 draw2d.Node.prototype.setDimension.call(this,w, h);

 if(this.leftPort!=null)
 {
 this.leftPort.setPosition(0, this.height/2);
 this.topPort.setPosition(this.width/2,0);
 this.rightPort.setPosition(this.width,this.height/2);
 this.bottomPort.setPosition(this.width/2,this.height);
 }
}

TableFigure.prototype.setTableName=function(/*:String*/ name )
{
 this.header.innerHTML = name;
 this.setDimension(this.getWidth(),this.getHeight());
}

TableFigure.prototype.getWidth=function()
{
 if(this.table==null)
 return 10;
 if(window.getComputedStyle)
 return parseInt(getComputedStyle(this.table,'').getPropertyValue("width"));
 return (this.table.clientWidth);
}

TableFigure.prototype.getHeight=function()
{
 if(this.table==null)
 return 10;
 if(window.getComputedStyle)
 return parseInt(getComputedStyle(this.table,'').getPropertyValue("height"));
 return (this.table.clientHeight);
}



TableFigure.prototype.addColumn=function(/*:String*/ name )
{
 var x=this.table.insertRow(this.table.rows.length);
 var y=x.insertCell(0);
 y.innerHTML=name;
 y.style.backgroundColor="gray";
 y.style.whiteSpace="nowrap";
 y.style.padding="2px";
 this.setDimension(this.getWidth(),this.getHeight());
}
