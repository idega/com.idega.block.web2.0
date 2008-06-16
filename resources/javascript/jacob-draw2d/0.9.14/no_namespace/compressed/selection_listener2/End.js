/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

End=function(){ImageFigure.call(this,this.type+".png");this.inputPort=null;this.setDimension(50,50);};End.prototype=new ImageFigure;End.prototype.type="End";End.prototype.setWorkflow=function(_11be){ImageFigure.prototype.setWorkflow.call(this,_11be);if(_11be!=null&&this.inputPort==null){this.inputPort1=new InputPort();this.inputPort1.setWorkflow(_11be);this.inputPort1.setBackgroundColor(new Color(115,115,245));this.inputPort1.setColor(null);this.inputPort1.setName("input1");this.addPort(this.inputPort1,0,this.height/2);this.inputPort2=new InputPort();this.inputPort2.setWorkflow(_11be);this.inputPort2.setBackgroundColor(new Color(115,115,245));this.inputPort2.setColor(null);this.inputPort2.setName("input2");this.addPort(this.inputPort2,this.width/2,0);this.inputPort3=new InputPort();this.inputPort3.setWorkflow(_11be);this.inputPort3.setBackgroundColor(new Color(115,115,245));this.inputPort3.setColor(null);this.inputPort3.setName("input3");this.addPort(this.inputPort3,this.width,this.height/2);this.inputPort4=new InputPort();this.inputPort4.setWorkflow(_11be);this.inputPort4.setBackgroundColor(new Color(115,115,245));this.inputPort4.setColor(null);this.inputPort4.setName("input4");this.addPort(this.inputPort4,this.width/2,this.height);}};