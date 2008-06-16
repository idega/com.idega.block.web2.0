/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.XMLSerializer_01=function(){};draw2d.XMLSerializer_01.prototype.type="XMLSerializer_01";draw2d.XMLSerializer_01.prototype.toXML=function(_2350){var xml="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";xml=xml+"<form>\n";var _2352=_2350.getFigures();for(var i=0;i<_2352.getSize();i++){var _2354=_2352.get(i);xml=xml+"<"+_2354.type+" x=\""+_2354.getX()+"\" y=\""+_2354.getY()+"\" id=\""+_2354.getId()+"\">\n";xml=xml+this.getPropertyXML(_2354,"   ");if(_2354 instanceof draw2d.CompartmentFigure){xml=xml+this.getChildXML(_2354,"   ");}xml=xml+"</"+_2354.type+">\n";}xml=xml+"</form>\n";return xml;};draw2d.XMLSerializer_01.prototype.getChildXML=function(_2355,_2356){var xml="";var _2358=_2355.getChildren();for(var i=0;i<_2358.getSize();i++){var _235a=_2358.get(i);xml=xml+_2356+"<"+_235a.type+" x=\""+_235a.getX()+"\" y=\""+_235a.getY()+"\" id=\""+_235a.getId()+"\">\n";xml=xml+this.getPropertyXML(_235a,"   "+_2356);if(_235a instanceof draw2d.CompartmentFigure){xml=xml+this.getChildXML(_235a,"   "+_2356);}xml=xml+_2356+"</"+_235a.type+">\n";}return xml;};draw2d.XMLSerializer_01.prototype.getPropertyXML=function(_235b,_235c){var xml="";var _235e=_235b.getProperties();for(key in _235e){var value=_235e[key];if(value!=null){xml=xml+_235c+"<property name=\""+key+"\" value=\""+value+"\">\n";}}return xml;};