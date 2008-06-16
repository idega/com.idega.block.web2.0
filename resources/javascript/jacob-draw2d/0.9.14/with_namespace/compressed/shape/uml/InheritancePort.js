/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.shape.uml.InheritancePort=function(){draw2d.Port.call(this,new draw2d.Rectangle());this.setBackgroundColor(new draw2d.Color(255,255,190));};draw2d.shape.uml.InheritancePort.prototype=new draw2d.Port;draw2d.shape.uml.InheritancePort.prototype.type="shape.uml.InheritancePort";draw2d.shape.uml.InheritancePort.prototype.onDrop=function(port){if(this.parentNode.id==port.parentNode.id){}else{var _1b39=new draw2d.CommandConnect(this.parentNode.workflow,this,port);_1b39.setConnection(new draw2d.shape.uml.InheritanceConnection());this.parentNode.workflow.getCommandStack().execute(_1b39);}};