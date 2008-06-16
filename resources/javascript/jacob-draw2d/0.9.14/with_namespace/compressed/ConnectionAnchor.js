/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ConnectionAnchor=function(owner){this.owner=owner;};draw2d.ConnectionAnchor.prototype.type="ConnectionAnchor";draw2d.ConnectionAnchor.prototype.getLocation=function(_2ac6){return this.getReferencePoint();};draw2d.ConnectionAnchor.prototype.getOwner=function(){return this.owner;};draw2d.ConnectionAnchor.prototype.setOwner=function(owner){this.owner=owner;};draw2d.ConnectionAnchor.prototype.getBox=function(){return this.getOwner().getAbsoluteBounds();};draw2d.ConnectionAnchor.prototype.getReferencePoint=function(){if(this.getOwner()==null){return null;}else{return this.getOwner().getAbsolutePosition();}};