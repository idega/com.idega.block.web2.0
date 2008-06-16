/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

shape.uml.InheritancePort=function(){Port.call(this,new Rectangle());this.setBackgroundColor(new Color(255,255,190));};shape.uml.InheritancePort.prototype=new Port;shape.uml.InheritancePort.prototype.type="shape.uml.InheritancePort";shape.uml.InheritancePort.prototype.onDrop=function(port){if(this.parentNode.id==port.parentNode.id){}else{var _13fd=new CommandConnect(this.parentNode.workflow,this,port);_13fd.setConnection(new shape.uml.InheritanceConnection());this.parentNode.workflow.getCommandStack().execute(_13fd);}};