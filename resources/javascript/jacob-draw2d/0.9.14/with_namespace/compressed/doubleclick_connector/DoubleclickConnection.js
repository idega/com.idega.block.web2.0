/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.DoubleclickConnection=function(){draw2d.Connection.call(this);this.sourcePort=null;this.targetPort=null;this.lineSegments=new Array();this.setColor(new draw2d.Color(0,0,115));this.setLineWidth(2);this.setColor(new draw2d.Color(128,255,128));this.isHighlight=false;};draw2d.DoubleclickConnection.prototype=new draw2d.Connection();draw2d.DoubleclickConnection.prototype.onDoubleClick=function(){this.isHighlight=!this.isHighlight;if(this.isHighlight){this.setLineWidth(5);this.setColor(new draw2d.Color(255,128,128));}else{this.setLineWidth(2);this.setColor(new draw2d.Color(128,255,128));}};