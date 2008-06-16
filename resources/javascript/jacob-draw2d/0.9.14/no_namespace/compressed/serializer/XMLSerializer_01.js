/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

XMLSerializer_01=function(){};XMLSerializer_01.prototype.type="XMLSerializer_01";XMLSerializer_01.prototype.toXML=function(_622){var xml="<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n";xml=xml+"<form>\n";var _624=_622.getFigures();for(var i=0;i<_624.getSize();i++){var _626=_624.get(i);xml=xml+"<"+_626.type+" x=\""+_626.getX()+"\" y=\""+_626.getY()+"\" id=\""+_626.getId()+"\">\n";xml=xml+this.getPropertyXML(_626,"   ");if(_626 instanceof CompartmentFigure){xml=xml+this.getChildXML(_626,"   ");}xml=xml+"</"+_626.type+">\n";}xml=xml+"</form>\n";return xml;};XMLSerializer_01.prototype.getChildXML=function(_627,_628){var xml="";var _62a=_627.getChildren();for(var i=0;i<_62a.getSize();i++){var _62c=_62a.get(i);xml=xml+_628+"<"+_62c.type+" x=\""+_62c.getX()+"\" y=\""+_62c.getY()+"\" id=\""+_62c.getId()+"\">\n";xml=xml+this.getPropertyXML(_62c,"   "+_628);if(_62c instanceof CompartmentFigure){xml=xml+this.getChildXML(_62c,"   "+_628);}xml=xml+_628+"</"+_62c.type+">\n";}return xml;};XMLSerializer_01.prototype.getPropertyXML=function(_62d,_62e){var xml="";var _630=_62d.getProperties();for(key in _630){var _631=_630[key];if(_631!=null){xml=xml+_62e+"<property name=\""+key+"\" value=\""+_631+"\">\n";}}return xml;};