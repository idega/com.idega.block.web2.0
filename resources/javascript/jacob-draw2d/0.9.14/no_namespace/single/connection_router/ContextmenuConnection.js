ContextmenuConnection=function(){
Connection.call(this);
this.sourcePort=null;
this.targetPort=null;
this.lineSegments=new Array();
this.setColor(new Color(128,128,255));
this.setLineWidth(1);
};
ContextmenuConnection.prototype=new Connection();
ContextmenuConnection.prototype.getContextMenu=function(){
var menu=new Menu();
var oThis=this;
menu.appendMenuItem(new MenuItem("NULL Router",null,function(){
oThis.setRouter(null);
}));
menu.appendMenuItem(new MenuItem("Manhatten Router",null,function(){
oThis.setRouter(new ManhattanConnectionRouter());
}));
menu.appendMenuItem(new MenuItem("Bezier Router",null,function(){
oThis.setRouter(new BezierConnectionRouter());
}));
menu.appendMenuItem(new MenuItem("Fan Router",null,function(){
oThis.setRouter(new FanConnectionRouter());
}));
return menu;
};
