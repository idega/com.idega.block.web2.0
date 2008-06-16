RelationsetModel=function(){
this.relations=new ArrayList();
this.nonPersistentTableAliases=new ArrayList();
};
RelationModel.prototype.type="RelationModel";
RelationsetModel.prototype.getRelationModels=function(){
return this.relations;
};
RelationsetModel.prototype.getTableAliasModels=function(){
return this.nonPersistentTableAliases;
};
RelationsetModel.prototype.addRelationModel=function(_385e){
this.relations.add(_385e);
if(this.nonPersistentTableAliases.indexOf(_385e.getToTableModel())<=0){
this.nonPersistentTableAliases.add(_385e.getToTableModel());
}
if(this.nonPersistentTableAliases.indexOf(_385e.getFromTableModel())<=0){
this.nonPersistentTableAliases.add(_385e.getFromTableModel());
}
};
RelationsetModel.prototype.getPosition=function(_385f){
return new Point(100,100);
};
