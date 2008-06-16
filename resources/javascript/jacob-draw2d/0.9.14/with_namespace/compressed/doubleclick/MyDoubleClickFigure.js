/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.MyDoubleClickFigure=function(){draw2d.Rectangle.call(this);this.setDimension(50,50);this.setBackgroundColor(new draw2d.Color(220,255,255));};draw2d.MyDoubleClickFigure.prototype=new draw2d.Rectangle;draw2d.MyDoubleClickFigure.prototype.type="MyDoubleClickFigure";draw2d.MyDoubleClickFigure.prototype.onDoubleClick=function(){var w=parseInt(prompt("Enter border line width",this.getLineWidth()));if(w>0){this.setLineWidth(w);}};