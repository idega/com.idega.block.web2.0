/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Start=function(){draw2d.ImageFigure.call(this,this.type+".png");this.outputPort=null;this.setDimension(50,50);return this;};draw2d.Start.prototype=new draw2d.ImageFigure;draw2d.Start.prototype.type="Start";draw2d.Start.prototype.setWorkflow=function(_1d92){draw2d.ImageFigure.prototype.setWorkflow.call(this,_1d92);if(_1d92!=null&&this.outputPort==null){this.outputPort=new draw2d.OutputPort();this.outputPort.setMaxFanOut(5);this.outputPort.setWorkflow(_1d92);this.outputPort.setBackgroundColor(new draw2d.Color(245,115,115));this.addPort(this.outputPort,this.width,this.height/2);}};