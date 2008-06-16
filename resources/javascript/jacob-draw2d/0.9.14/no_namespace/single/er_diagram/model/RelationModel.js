RelationModel=function(_40f6,_40f7,toKey){
this.fromTable=_40f6;
this.toTable=_40f7;
this.toKey=toKey;
};
RelationModel.prototype.type="RelationModel";
RelationModel.prototype.getFromTableModel=function(){
return this.fromTable;
};
RelationModel.prototype.getToTableModel=function(){
return this.toTable;
};
