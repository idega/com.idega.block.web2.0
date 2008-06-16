/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.End=function(){draw2d.Oval.call(this);this.inputPort=null;this.setDimension(50,50);this.setColor(new draw2d.Color(128,128,255));this.setLineWidth(2);};draw2d.End.prototype=new draw2d.Oval;draw2d.End.prototype.type="End";draw2d.End.prototype.setWorkflow=function(_191d){draw2d.Oval.prototype.setWorkflow.call(this,_191d);if(this.workflow!=null&&this.inputPort==null){this.inputPort=new draw2d.InputPort();this.inputPort.setWorkflow(_191d);this.inputPort.setBackgroundColor(new draw2d.Color(115,115,245));this.addPort(this.inputPort,0,this.height/2);}};draw2d.End.prototype.setDimension=function(w,h){draw2d.Oval.prototype.setDimension.call(this,w,h);if(this.inputPort!=null){this.inputPort.setPosition(0,this.height/2);}};