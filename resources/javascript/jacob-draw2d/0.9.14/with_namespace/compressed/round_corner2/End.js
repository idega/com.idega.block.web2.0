/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.End=function(){draw2d.ImageFigure.call(this,this.type+".png");this.inputPort=null;this.setDimension(50,50);};draw2d.End.prototype=new draw2d.ImageFigure;draw2d.End.prototype.type="End";draw2d.End.prototype.setWorkflow=function(_26bf){draw2d.ImageFigure.prototype.setWorkflow.call(this,_26bf);if(_26bf!=null&&this.inputPort==null){this.inputPort=new draw2d.InputPort();this.inputPort.setWorkflow(_26bf);this.inputPort.setBackgroundColor(new draw2d.Color(115,115,245));this.inputPort.setColor(null);this.inputPort.setName("input");this.addPort(this.inputPort,0,this.height/2);}};