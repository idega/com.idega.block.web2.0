/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

FieldTypeModel=function(name){this.name=name;this.parent=null;};FieldTypeModel.prototype.type="FieldTypeModel";FieldTypeModel.prototype.getName=function(){return this.name;};FieldTypeModel.prototype.setParent=function(_d9e){if(!(_d9e instanceof FieldModel)){throw "Invalid parameter type in [FieldTypeModelBoolean.prototype.setParent]";}this.parent=_d9e;};