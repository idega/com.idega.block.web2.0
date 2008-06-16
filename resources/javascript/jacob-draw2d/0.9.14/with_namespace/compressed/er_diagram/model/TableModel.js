/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

TableModel=function(name){this.name=name;this.fields=new draw2d.ArrayList();};TableModel.prototype.type="TableModel";TableModel.prototype.getName=function(){return this.name;};TableModel.prototype.getFieldModels=function(){return this.fields;};TableModel.prototype.addFieldModel=function(field){if(!(field instanceof FieldModel)){throw "Invalid parameter type in [TableModel.prototype.addFieldModel]";}if(this.fields.indexOf(field)==-1){this.fields.add(field);field.setTableModel(this);}};