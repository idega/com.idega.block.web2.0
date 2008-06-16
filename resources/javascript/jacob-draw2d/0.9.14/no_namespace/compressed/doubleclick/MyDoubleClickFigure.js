/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MyDoubleClickFigure=function(){Rectangle.call(this);this.setDimension(50,50);this.setBackgroundColor(new Color(220,255,255));};MyDoubleClickFigure.prototype=new Rectangle;MyDoubleClickFigure.prototype.type="MyDoubleClickFigure";MyDoubleClickFigure.prototype.onDoubleClick=function(){var w=parseInt(prompt("Enter border line width",this.getLineWidth()));if(w>0){this.setLineWidth(w);}};