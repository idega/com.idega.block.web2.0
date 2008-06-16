TableAliasModel=function(name,table){
this.table=table;
this.name=name;
};
TableAliasModel.prototype.type="TableAliasModel";
TableAliasModel.prototype.getName=function(){
return this.name;
};
TableAliasModel.prototype.getTableModel=function(){
return this.table;
};
