/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

End=function(){ImageFigure.call(this,this.type+".png");this.inputPort=null;this.setDimension(50,50);};End.prototype=new ImageFigure;End.prototype.type="End";End.prototype.setWorkflow=function(_93){ImageFigure.prototype.setWorkflow.call(this,_93);if(_93!=null&&this.inputPort==null){this.inputPort=new MyInputPort();this.inputPort.setWorkflow(_93);this.inputPort.setBackgroundColor(new Color(115,115,245));this.inputPort.setColor(null);this.addPort(this.inputPort,0,this.height/2);this.inputPort2=new MyInputPort();this.inputPort2.setWorkflow(_93);this.inputPort2.setBackgroundColor(new Color(115,115,245));this.inputPort2.setColor(null);this.addPort(this.inputPort2,this.width/2,0);this.inputPort3=new MyInputPort();this.inputPort3.setWorkflow(_93);this.inputPort3.setBackgroundColor(new Color(115,115,245));this.inputPort3.setColor(null);this.addPort(this.inputPort3,this.width,this.height/2);this.inputPort4=new MyInputPort();this.inputPort4.setWorkflow(_93);this.inputPort4.setBackgroundColor(new Color(115,115,245));this.inputPort4.setColor(null);this.addPort(this.inputPort4,this.width/2,this.height);}};