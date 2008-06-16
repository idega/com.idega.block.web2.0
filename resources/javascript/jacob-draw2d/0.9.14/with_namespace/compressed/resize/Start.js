/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Start=function(){draw2d.Node.call(this);this.outputPort1=null;this.outputPort2=null;this.setDimension(50,50);};draw2d.Start.prototype=new draw2d.Node;draw2d.Start.prototype.type="Start";draw2d.Start.prototype.setWorkflow=function(_1920){draw2d.Node.prototype.setWorkflow.call(this,_1920);if(_1920!=null){this.outputPort1=new draw2d.OutputPort();this.outputPort1.setMaxFanOut(1);this.outputPort1.setWorkflow(_1920);this.outputPort1.setBackgroundColor(new draw2d.Color(245,115,115));this.addPort(this.outputPort1,this.width,this.height/3);this.outputPort2=new draw2d.OutputPort();this.outputPort2.setMaxFanOut(1);this.outputPort2.setWorkflow(_1920);this.outputPort2.setBackgroundColor(new draw2d.Color(245,115,115));this.addPort(this.outputPort2,this.width,this.height/3*2);}};draw2d.Start.prototype.setDimension=function(w,h){draw2d.Node.prototype.setDimension.call(this,w,h);if(this.outputPort1!=null){this.outputPort1.setPosition(this.width,this.height/3);this.outputPort2.setPosition(this.width,this.height/3*2);}};