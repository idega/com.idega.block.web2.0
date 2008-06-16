FieldTypeModel=function(name){
this.name=name;
this.parent=null;
};
FieldTypeModel.prototype.type="FieldTypeModel";
FieldTypeModel.prototype.getName=function(){
return this.name;
};
FieldTypeModel.prototype.setParent=function(_3a34){
if(!(_3a34 instanceof FieldModel)){
throw "Invalid parameter type in [FieldTypeModelBoolean.prototype.setParent]";
}
this.parent=_3a34;
};
