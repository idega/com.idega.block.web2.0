ContextmenuConnection=function(){
Connection.call(this);
this.sourcePort=null;
this.targetPort=null;
this.lineSegments=new Array();
this.setColor(new Color(0,0,115));
this.setLineWidth(2);
};
ContextmenuConnection.prototype=new Connection();
ContextmenuConnection.prototype.getContextMenu=function(){
var menu=new Menu();
var oThis=this;
menu.appendMenuItem(new MenuItem("Blue",null,function(){
oThis.setColor(new Color(0,0,255));
}));
menu.appendMenuItem(new MenuItem("Green",null,function(){
oThis.setColor(new Color(0,255,0));
}));
menu.appendMenuItem(new MenuItem("Silver",null,function(){
oThis.setColor(new Color(128,128,128));
}));
menu.appendMenuItem(new MenuItem("Black",null,function(){
oThis.setColor(new Color(0,0,0));
}));
return menu;
};
