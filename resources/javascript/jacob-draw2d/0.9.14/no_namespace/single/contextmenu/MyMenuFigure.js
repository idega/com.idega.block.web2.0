MyMenuFigure=function(){
Rectangle.call(this);
this.setDimension(50,50);
this.setBackgroundColor(new Color(220,255,255));
};
MyMenuFigure.prototype=new Rectangle;
MyMenuFigure.prototype.getContextMenu=function(){
var menu=new Menu();
var oThis=this;
menu.appendMenuItem(new MenuItem("Blue",null,function(){
oThis.setBackgroundColor(new Color(0,0,255));
}));
menu.appendMenuItem(new MenuItem("Green",null,function(){
oThis.setBackgroundColor(new Color(0,255,0));
}));
menu.appendMenuItem(new MenuItem("Silver",null,function(){
oThis.setBackgroundColor(new Color(128,128,128));
}));
menu.appendMenuItem(new MenuItem("Black",null,function(){
oThis.setBackgroundColor(new Color(0,0,0));
}));
return menu;
};
