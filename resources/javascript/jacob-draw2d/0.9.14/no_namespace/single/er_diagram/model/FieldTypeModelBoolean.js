FieldTypeModelBoolean=function(_3e55){
FieldTypeModel.call(this,FieldModel.DBTYPE_BOOLEAN);
this.defaultValue=_3e55;
};
FieldTypeModelBoolean.prototype.type="FieldTypeModelBoolean";
FieldTypeModelBoolean.prototype=new FieldTypeModel;
FieldTypeModelBoolean.prototype.getDefault=function(){
return this.defaultValue;
};
FieldTypeModelBoolean.prototype.setDefault=function(value){
var save=this.getDefault();
if(save==value){
return;
}
this.defaultValue=value;
this.parent.firePropertyChange(PROPERTY_DEFAULT,save,value);
};
