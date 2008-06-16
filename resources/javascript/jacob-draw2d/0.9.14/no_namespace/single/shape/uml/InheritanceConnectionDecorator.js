shape.uml.InheritanceConnectionDecorator=function(){
this.setBackgroundColor(new Color(255,255,255));
};
shape.uml.InheritanceConnectionDecorator.prototype=new ConnectionDecorator;
shape.uml.InheritanceConnectionDecorator.prototype.type="shape.uml.InheritanceConnectionDecorator";
shape.uml.InheritanceConnectionDecorator.prototype.paint=function(g){
if(this.backgroundColor!=null){
g.setColor(this.backgroundColor);
g.fillPolygon([3,20,20,3],[0,8,-8,0]);
}
g.setColor(this.color);
g.setStroke(1);
g.drawPolygon([3,20,20,3],[0,8,-8,0]);
};
