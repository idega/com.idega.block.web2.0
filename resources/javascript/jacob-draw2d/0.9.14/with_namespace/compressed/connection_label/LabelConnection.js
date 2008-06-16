/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.LabelConnection=function(){draw2d.Connection.call(this);var label=new draw2d.Label("Message");label.setBackgroundColor(new draw2d.Color(230,230,250));label.setBorder(new draw2d.LineBorder(1));this.addFigure(label,new draw2d.ManhattenMidpointLocator(this));};draw2d.LabelConnection.prototype=new draw2d.Connection;