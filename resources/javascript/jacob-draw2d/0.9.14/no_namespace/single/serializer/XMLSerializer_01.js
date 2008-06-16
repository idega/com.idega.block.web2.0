XMLSerializer_01=function(){
};
XMLSerializer_01.prototype.type="XMLSerializer_01";
XMLSerializer_01.prototype.toXML=function(_32b8){
var xml="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";
xml=xml+"<form>\n";
var _32ba=_32b8.getFigures();
for(var i=0;i<_32ba.getSize();i++){
var _32bc=_32ba.get(i);
xml=xml+"<"+_32bc.type+" x=\""+_32bc.getX()+"\" y=\""+_32bc.getY()+"\" id=\""+_32bc.getId()+"\">\n";
xml=xml+this.getPropertyXML(_32bc,"   ");
if(_32bc instanceof CompartmentFigure){
xml=xml+this.getChildXML(_32bc,"   ");
}
xml=xml+"</"+_32bc.type+">\n";
}
xml=xml+"</form>\n";
return xml;
};
XMLSerializer_01.prototype.getChildXML=function(_32bd,_32be){
var xml="";
var _32c0=_32bd.getChildren();
for(var i=0;i<_32c0.getSize();i++){
var _32c2=_32c0.get(i);
xml=xml+_32be+"<"+_32c2.type+" x=\""+_32c2.getX()+"\" y=\""+_32c2.getY()+"\" id=\""+_32c2.getId()+"\">\n";
xml=xml+this.getPropertyXML(_32c2,"   "+_32be);
if(_32c2 instanceof CompartmentFigure){
xml=xml+this.getChildXML(_32c2,"   "+_32be);
}
xml=xml+_32be+"</"+_32c2.type+">\n";
}
return xml;
};
XMLSerializer_01.prototype.getPropertyXML=function(_32c3,_32c4){
var xml="";
var _32c6=_32c3.getProperties();
for(key in _32c6){
var value=_32c6[key];
if(value!=null){
xml=xml+_32c4+"<property name=\""+key+"\" value=\""+value+"\">\n";
}
}
return xml;
};
