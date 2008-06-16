/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SVGTriangle=function(width,_1add){draw2d.Figure.call(this);if(width&&_1add){this.setDimension(width,_1add);}};draw2d.SVGTriangle.prototype=new draw2d.SVGFigure;draw2d.SVGTriangle.prototype.paint=function(){this.context.clearRect(0,0,this.getWidth(),this.getHeight());this.context.fillStyle="rgba(200,0,0,0.3)";this.context.fillStyle="rgb(0,200,0)";this.context.beginPath();this.context.moveTo(this.width/2,0);this.context.lineTo(this.width,this.height);this.context.lineTo(0,this.height);this.context.closePath();this.context.stroke();};