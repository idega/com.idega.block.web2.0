/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

End=function(){Node.call(this);this.inputPort1=null;this.inputPort2=null;this.setDimension(50,50);};End.prototype=new Node;End.prototype.type="End";End.prototype.setWorkflow=function(_61f){Node.prototype.setWorkflow.call(this,_61f);if(_61f!=null){this.inputPort1=new InputPort();this.inputPort1.setWorkflow(_61f);this.inputPort1.setBackgroundColor(new Color(115,115,245));this.addPort(this.inputPort1,0,this.height/3);this.inputPort2=new InputPort();this.inputPort2.setWorkflow(_61f);this.inputPort2.setBackgroundColor(new Color(115,115,245));this.addPort(this.inputPort2,0,this.height/3*2);}};End.prototype.setDimension=function(w,h){Node.prototype.setDimension.call(this,w,h);if(this.inputPort1!=null){this.inputPort1.setPosition(0,this.height/3);this.inputPort2.setPosition(0,this.height/3*2);}};