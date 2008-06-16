/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ArrowLine=function(){this.lineColor=new Color(0,0,0);this.stroke=1;this.canvas=null;this.workflow=null;this.html=null;this.graphics=null;this.id=this.generateUId();this.startX=30;this.startY=30;this.endX=100;this.endY=100;this.zOrder=Line.ZOrderBaseIndex;this.setSelectable(true);this.setDeleteable(true);this.arrowWidth=8;this.arrowLength=20;this.lineWidth=2;};ArrowLine.prototype=new Line;ArrowLine.prototype.type="ArrowLine";ArrowLine.prototype.paint=function(){if(this.graphics==null){this.graphics=new jsGraphics(this.id);}else{this.graphics.clear();}this.graphics.setStroke(this.stroke);this.graphics.setColor(this.lineColor.getHTMLStyle());var endY=this.getLength();var _8ab=[0,0,endY-this.arrowLength,endY-this.arrowLength,endY,endY-this.arrowLength,endY-this.arrowLength,0];var _8ac=[-this.lineWidth,+this.lineWidth,+this.lineWidth,this.lineWidth+this.arrowWidth/2,0,-(this.lineWidth+this.arrowWidth/2),-this.lineWidth,-this.lineWidth];var _8ad=this.getAngle()*Math.PI/180;var rotX=new Array();var rotY=new Array();for(var i=0;i<_8ab.length;i++){rotX[i]=this.startX+_8ab[i]*Math.cos(_8ad)-_8ac[i]*Math.sin(_8ad);rotY[i]=this.startY+_8ab[i]*Math.sin(_8ad)+_8ac[i]*Math.cos(_8ad);}this.graphics.drawPolyLine(rotX,rotY);this.graphics.paint();};