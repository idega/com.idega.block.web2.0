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
FieldModel=function(/*:String*/ name, /*:String*/ label)
{
   this.name  = name;
   this.label = label;
}

FieldModel.prototype.type="FieldModel";

FieldModel.DBTYPE_TEXT      = "TEXT";
FieldModel.DBTYPE_DOCUMENT  = "DOCUMENT";
FieldModel.DBTYPE_INTEGER   = "INTEGER";
FieldModel.DBTYPE_LONG      = "LONG";
FieldModel.DBTYPE_FLOAT     = "FLOAT";
FieldModel.DBTYPE_DOUBLE    = "DOUBLE";
FieldModel.DBTYPE_DECIMAL   = "DECIMAL";
FieldModel.DBTYPE_DATE      = "DATE";
FieldModel.DBTYPE_TIME      = "TIME";
FieldModel.DBTYPE_TIMESTAMP = "TIMESTAMP";
FieldModel.DBTYPE_LONGTEXT  = "LONGTEXT";
FieldModel.DBTYPE_BINARY    = "BINARY";
FieldModel.DBTYPE_ENUM      = "ENUM";
FieldModel.DBTYPE_BOOLEAN   = "BOOLEAN";



FieldModel.prototype.getLabel=function()
{
  return this.label;
}

FieldModel.prototype.getName=function()
{
  return this.name;
}

FieldModel.prototype.getExtendedDescriptionLabel=function()
{
   if(this.getTypeName()== FieldModel.DBTYPE_TEXT)
     return this.getName()+" "+this.getTypeName()+"<"+this.getLengthAsString()+">";
   return this.getName()+" "+this.getTypeName();
}

FieldModel.prototype.getTableModel=function()
{
  return this.table;
}


FieldModel.prototype.getTypeName=function()
{
  return this.typeModel.getName();
}


FieldModel.prototype.setTableModel=function(/*:TableModel*/ tableModel)
{
  if(!(tableModel instanceof TableModel))
    throw "Invalid parameter type in [FieldModel.prototype.setTableModel]";

  this.table = tableModel;
}


FieldModel.prototype.setTypeModel=function(/*:FieldTypeModel*/ typeModel)
{
  if(!(typeModel instanceof FieldTypeModel))
    throw "Invalid parameter type in [FieldModel.prototype.setTypeModel]";

  this.typeModel = typeModel;
  this.typeModel.setParent(this);
}

FieldModel.prototype.getTypeModel=function()
{
  return this.typeModel;
}

FieldModel.prototype.getLengthAsString=function()
{
  var length = "";
  if (FieldModel.DBTYPE_TEXT == this.getTypeName())
  {
    length = Integer.toString(this.getTypeModel().getMaxLength());
    if(this.getTypeModel().getFixeLength())
      length = "["+length+"]";
  }
  return length;
}
