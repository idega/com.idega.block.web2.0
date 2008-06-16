PolygonConnectionDecorator=function(){
};
PolygonConnectionDecorator.prototype=new ConnectionDecorator;
PolygonConnectionDecorator.prototype.paint=function(g){
g.setColor(new Color(128,255,255));
g.fillPolygon([3,15,30,15,3],[0,5,0,-5,0]);
g.setColor(new Color(128,128,255));
g.setStroke(1);
g.drawPolygon([3,15,30,15,3],[0,5,0,-5,0]);
};
