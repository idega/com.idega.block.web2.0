/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Triangle=function(_414,_415){VectorFigure.call(this);if(_414&&_415){this.setDimension(_414,_415);}};Triangle.prototype=new VectorFigure;Triangle.prototype.paint=function(){VectorFigure.prototype.paint.call(this);var x=new Array(this.getWidth()/2,this.getWidth(),0);var y=new Array(0,this.getHeight(),this.getHeight());this.graphics.setStroke(this.stroke);if(this.bgColor!=null){this.graphics.setColor(this.bgColor.getHTMLStyle());this.graphics.fillPolygon(x,y);}if(this.lineColor!=null){this.graphics.setColor(this.lineColor.getHTMLStyle());this.graphics.drawPolygon(x,y);}this.graphics.paint();};