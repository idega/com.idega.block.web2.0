/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.shape.uml.InheritanceConnection=function(){draw2d.Connection.call(this);this.setTargetDecorator(new draw2d.shape.uml.InheritanceConnectionDecorator());this.setSourceAnchor(new draw2d.ChopboxConnectionAnchor());this.setTargetAnchor(new draw2d.ChopboxConnectionAnchor());this.setRouter(new draw2d.NullConnectionRouter());};draw2d.shape.uml.InheritanceConnection.prototype=new draw2d.Connection();