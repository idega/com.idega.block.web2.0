FieldModel=function(name,label){
this.name=name;
this.label=label;
};
FieldModel.prototype.type="FieldModel";
FieldModel.DBTYPE_TEXT="TEXT";
FieldModel.DBTYPE_DOCUMENT="DOCUMENT";
FieldModel.DBTYPE_INTEGER="INTEGER";
FieldModel.DBTYPE_LONG="LONG";
FieldModel.DBTYPE_FLOAT="FLOAT";
FieldModel.DBTYPE_DOUBLE="DOUBLE";
FieldModel.DBTYPE_DECIMAL="DECIMAL";
FieldModel.DBTYPE_DATE="DATE";
FieldModel.DBTYPE_TIME="TIME";
FieldModel.DBTYPE_TIMESTAMP="TIMESTAMP";
FieldModel.DBTYPE_LONGTEXT="LONGTEXT";
FieldModel.DBTYPE_BINARY="BINARY";
FieldModel.DBTYPE_ENUM="ENUM";
FieldModel.DBTYPE_BOOLEAN="BOOLEAN";
FieldModel.prototype.getLabel=function(){
return this.label;
};
FieldModel.prototype.getName=function(){
return this.name;
};
FieldModel.prototype.getExtendedDescriptionLabel=function(){
if(this.getTypeName()==FieldModel.DBTYPE_TEXT){
return this.getName()+" "+this.getTypeName()+"<"+this.getLengthAsString()+">";
}
return this.getName()+" "+this.getTypeName();
};
FieldModel.prototype.getTableModel=function(){
return this.table;
};
FieldModel.prototype.getTypeName=function(){
return this.typeModel.getName();
};
FieldModel.prototype.setTableModel=function(_3a38){
if(!(_3a38 instanceof TableModel)){
throw "Invalid parameter type in [FieldModel.prototype.setTableModel]";
}
this.table=_3a38;
};
FieldModel.prototype.setTypeModel=function(_3a39){
if(!(_3a39 instanceof FieldTypeModel)){
throw "Invalid parameter type in [FieldModel.prototype.setTypeModel]";
}
this.typeModel=_3a39;
this.typeModel.setParent(this);
};
FieldModel.prototype.getTypeModel=function(){
return this.typeModel;
};
FieldModel.prototype.getLengthAsString=function(){
var _3a3a="";
if(FieldModel.DBTYPE_TEXT==this.getTypeName()){
_3a3a=Integer.toString(this.getTypeModel().getMaxLength());
if(this.getTypeModel().getFixeLength()){
_3a3a="["+_3a3a+"]";
}
}
return _3a3a;
};
