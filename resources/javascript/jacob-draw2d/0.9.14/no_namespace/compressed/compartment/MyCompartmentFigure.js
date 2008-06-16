/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyCompartmentFigure=function(){CompartmentFigure.call(this);this.defaultColor=new Color(230,230,250);this.setBackgroundColor(this.defaultColor);};MyCompartmentFigure.prototype=new CompartmentFigure;MyCompartmentFigure.prototype.onFigureLeave=function(_514){CompartmentFigure.prototype.onFigureLeave.call(this,_514);if(_514 instanceof CompartmentFigure){_514.setBackgroundColor(_514.defaultColor);}};MyCompartmentFigure.prototype.onFigureDrop=function(_515){CompartmentFigure.prototype.onFigureDrop.call(this,_515);if(_515 instanceof CompartmentFigure){_515.setBackgroundColor(this.getBackgroundColor().darker(0.1));}};MyCompartmentFigure.prototype.setBackgroundColor=function(_516){CompartmentFigure.prototype.setBackgroundColor.call(this,_516);for(var i=0;i<this.children.getSize();i++){var _518=this.children.get(i);if(_518 instanceof CompartmentFigure){_518.setBackgroundColor(this.getBackgroundColor().darker(0.1));}}};