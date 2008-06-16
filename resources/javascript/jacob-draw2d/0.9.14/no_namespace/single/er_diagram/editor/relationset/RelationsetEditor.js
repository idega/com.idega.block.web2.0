RelationsetEditor=function(id,_3a03){
Workflow.call(this,id);
this.relationset=_3a03;
var _3a04=this.relationset.getTableAliasModels();
for(var i=0;i<_3a04.getSize();i++){
var _3a06=new TableAliasFigure(_3a04.get(i));
this.addFigure(_3a06);
}
};
RelationsetEditor.prototype=new Workflow;
RelationsetEditor.prototype.type="RelationsetEditor";
