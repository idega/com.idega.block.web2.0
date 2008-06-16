TableModel=function(name){
this.name=name;
this.fields=new ArrayList();
};
TableModel.prototype.type="TableModel";
TableModel.prototype.getName=function(){
return this.name;
};
TableModel.prototype.getFieldModels=function(){
return this.fields;
};
TableModel.prototype.addFieldModel=function(field){
if(!(field instanceof FieldModel)){
throw "Invalid parameter type in [TableModel.prototype.addFieldModel]";
}
if(this.fields.indexOf(field)==-1){
this.fields.add(field);
field.setTableModel(this);
}
};
