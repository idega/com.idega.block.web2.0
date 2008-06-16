/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyCompartmentFigure=function(){draw2d.CompartmentFigure.call(this);this.defaultColor=new draw2d.Color(230,230,250);this.setBackgroundColor(this.defaultColor);};draw2d.MyCompartmentFigure.prototype=new draw2d.CompartmentFigure;draw2d.MyCompartmentFigure.prototype.onFigureLeave=function(_2642){draw2d.CompartmentFigure.prototype.onFigureLeave.call(this,_2642);if(_2642 instanceof draw2d.CompartmentFigure){_2642.setBackgroundColor(_2642.defaultColor);}};draw2d.MyCompartmentFigure.prototype.onFigureDrop=function(_2643){draw2d.CompartmentFigure.prototype.onFigureDrop.call(this,_2643);if(_2643 instanceof draw2d.CompartmentFigure){_2643.setBackgroundColor(this.getBackgroundColor().darker(0.1));}};draw2d.MyCompartmentFigure.prototype.setBackgroundColor=function(color){draw2d.CompartmentFigure.prototype.setBackgroundColor.call(this,color);for(var i=0;i<this.children.getSize();i++){var child=this.children.get(i);if(child instanceof draw2d.CompartmentFigure){child.setBackgroundColor(this.getBackgroundColor().darker(0.1));}}};