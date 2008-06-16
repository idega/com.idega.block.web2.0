/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Oval=function(){draw2d.VectorFigure.call(this);};draw2d.Oval.prototype=new draw2d.VectorFigure;draw2d.Oval.prototype.type="Oval";draw2d.Oval.prototype.paint=function(){draw2d.VectorFigure.prototype.paint.call(this);this.graphics.setStroke(this.stroke);if(this.bgColor!=null){this.graphics.setColor(this.bgColor.getHTMLStyle());this.graphics.fillOval(0,0,this.getWidth()-1,this.getHeight()-1);}if(this.lineColor!=null){this.graphics.setColor(this.lineColor.getHTMLStyle());this.graphics.drawOval(0,0,this.getWidth()-1,this.getHeight()-1);}this.graphics.paint();};