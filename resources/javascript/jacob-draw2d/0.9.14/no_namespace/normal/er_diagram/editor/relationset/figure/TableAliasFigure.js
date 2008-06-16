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
TableAliasFigure=function(/*:TableAliasModel*/ alias)
{
 TableFigure.call(this,alias.getTableModel());
 this.alias = alias;
}

TableAliasFigure.prototype = new TableFigure;
TableAliasFigure.prototype.type="TableAliasFigure";


TableAliasFigure.prototype.createHTMLElement=function()
{
 var item = TableFigure.prototype.createHTMLElement.call(this);

 var row=this.table.insertRow(1);
 this.based=row.insertCell(0);
 this.based.innerHTML = "Test";
 this.based.colSpan="2";
 this.based.style.background ="transparent url(header.png) repeat-x";
 this.based.style.height ="25px";
 this.based.style.paddingLeft ="5px";
 this.based.style.paddingRight ="5px";
 this.based.style.whiteSpace ="nowrap";
 this.based.style.fontStyle ="italic";
 this.based.style.color ="rgb(100,100,100)";

 return item;
}


TableAliasFigure.prototype.setTableName=function(/*:String*/ name )
{
 this.header.innerHTML = this.alias.getName();
 this.based.innerHTML = "based on &lt;"+name+"&gt;";
 this.setDimension(this.getWidth(),this.getHeight());
}

