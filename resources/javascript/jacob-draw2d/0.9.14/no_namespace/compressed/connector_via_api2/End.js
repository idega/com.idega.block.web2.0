/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

End=function(){ImageFigure.call(this,this.type+".png");this.inputPort=null;this.setDimension(50,50);return this;};End.prototype=new ImageFigure;End.prototype.type="End";End.prototype.setWorkflow=function(_8e){ImageFigure.prototype.setWorkflow.call(this,_8e);if(_8e!=null&&this.inputPort==null){this.inputPort=new InputPort();this.inputPort.setWorkflow(_8e);this.inputPort.setBackgroundColor(new Color(115,115,245));this.inputPort.setColor(null);this.inputPort.setName("input");this.addPort(this.inputPort,0,this.height/2);}};