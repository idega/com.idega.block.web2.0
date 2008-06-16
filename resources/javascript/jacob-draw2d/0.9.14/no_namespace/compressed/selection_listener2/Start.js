/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Start=function(){ImageFigure.call(this,this.type+".png");this.outputPort=null;this.setDimension(50,50);};Start.prototype=new ImageFigure;Start.prototype.type="Start";Start.prototype.setWorkflow=function(_80){ImageFigure.prototype.setWorkflow.call(this,_80);if(_80!=null&&this.outputPort==null){this.outputPort1=new OutputPort();this.outputPort1.setWorkflow(_80);this.outputPort1.setMaxFanOut(4);this.outputPort1.setBackgroundColor(new Color(245,115,115));this.outputPort1.setName("output1");this.addPort(this.outputPort1,this.width,this.height/2);this.outputPort2=new OutputPort();this.outputPort2.setWorkflow(_80);this.outputPort2.setMaxFanOut(4);this.outputPort2.setBackgroundColor(new Color(245,115,115));this.outputPort2.setName("output2");this.addPort(this.outputPort2,this.width/2,0);this.outputPort3=new OutputPort();this.outputPort3.setWorkflow(_80);this.outputPort3.setMaxFanOut(4);this.outputPort3.setBackgroundColor(new Color(245,115,115));this.outputPort3.setName("output3");this.addPort(this.outputPort3,this.width/2,this.height);this.outputPort4=new OutputPort();this.outputPort4.setWorkflow(_80);this.outputPort4.setMaxFanOut(4);this.outputPort4.setBackgroundColor(new Color(245,115,115));this.outputPort4.setName("output4");this.addPort(this.outputPort4,0,this.height/2);}};