/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

shape.uml.InheritanceConnection=function(){Connection.call(this);this.setTargetDecorator(new shape.uml.InheritanceConnectionDecorator());this.setSourceAnchor(new ChopboxConnectionAnchor());this.setTargetAnchor(new ChopboxConnectionAnchor());this.setRouter(new NullConnectionRouter());};shape.uml.InheritanceConnection.prototype=new Connection();