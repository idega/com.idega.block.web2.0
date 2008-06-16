/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

End=function(){Oval.call(this);this.inputPort=null;this.setDimension(50,50);this.setColor(new Color(128,128,255));this.setLineWidth(2);};End.prototype=new Oval;End.prototype.type="End";End.prototype.setWorkflow=function(_140d){Oval.prototype.setWorkflow.call(this,_140d);if(this.workflow!=null&&this.inputPort==null){this.inputPort=new InputPort();this.inputPort.setWorkflow(_140d);this.inputPort.setBackgroundColor(new Color(115,115,245));this.addPort(this.inputPort,0,this.height/2);}};End.prototype.setDimension=function(w,h){Oval.prototype.setDimension.call(this,w,h);if(this.inputPort!=null){this.inputPort.setPosition(0,this.height/2);}};