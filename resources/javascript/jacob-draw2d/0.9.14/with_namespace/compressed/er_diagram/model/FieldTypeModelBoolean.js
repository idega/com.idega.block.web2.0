/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

FieldTypeModelBoolean=function(_1dfa){FieldTypeModel.call(this,FieldModel.DBTYPE_BOOLEAN);this.defaultValue=_1dfa;};FieldTypeModelBoolean.prototype.type="FieldTypeModelBoolean";FieldTypeModelBoolean.prototype=new FieldTypeModel;FieldTypeModelBoolean.prototype.getDefault=function(){return this.defaultValue;};FieldTypeModelBoolean.prototype.setDefault=function(value){var save=this.getDefault();if(save==value){return;}this.defaultValue=value;this.parent.firePropertyChange(PROPERTY_DEFAULT,save,value);};