/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Start=function(){ImageFigure.call(this,this.type+".png");this.outputPort1=null;this.outputPort2=null;this.setDimension(50,60);};Start.prototype=new ImageFigure;Start.prototype.type="Start";Start.prototype.setWorkflow=function(_13f0){ImageFigure.prototype.setWorkflow.call(this,_13f0);if(_13f0!=null&&this.outputPort==null){this.outputPort1=new OutputPort(new ImageFigure("port1.png"));this.outputPort1.setMaxFanOut(1);this.outputPort1.setWorkflow(_13f0);this.outputPort1.setDimension(10,10);this.addPort(this.outputPort1,this.width,this.height/4);this.outputPort2=new OutputPort(new ImageFigure("port2.png"));this.outputPort2.setMaxFanOut(1);this.outputPort2.setDimension(10,10);this.outputPort2.setWorkflow(_13f0);this.addPort(this.outputPort2,this.width,this.height/4*3);}};