/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

TableModel=function(name){this.name=name;this.fields=new ArrayList();};TableModel.prototype.type="TableModel";TableModel.prototype.getName=function(){return this.name;};TableModel.prototype.getFieldModels=function(){return this.fields;};TableModel.prototype.addFieldModel=function(_90f){if(!(_90f instanceof FieldModel)){throw "Invalid parameter type in [TableModel.prototype.addFieldModel]";}if(this.fields.indexOf(_90f)==-1){this.fields.add(_90f);_90f.setTableModel(this);}};