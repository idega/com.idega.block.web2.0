shape.uml.InheritanceConnection=function(){
Connection.call(this);
this.setTargetDecorator(new shape.uml.InheritanceConnectionDecorator());
this.setSourceAnchor(new ChopboxConnectionAnchor());
this.setTargetAnchor(new ChopboxConnectionAnchor());
this.setRouter(new NullConnectionRouter());
};
shape.uml.InheritanceConnection.prototype=new Connection();
