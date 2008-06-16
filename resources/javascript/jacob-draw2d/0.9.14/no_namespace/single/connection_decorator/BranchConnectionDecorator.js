BranchConnectionDecorator=function(){
};
BranchConnectionDecorator.prototype=new ConnectionDecorator;
BranchConnectionDecorator.prototype.type="BranchConnectionDecorator";
BranchConnectionDecorator.prototype.paint=function(g){
g.drawLine(0,-8,15,0);
g.drawLine(0,8,15,0);
g.drawLine(15,8,15,-8);
};
