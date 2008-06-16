/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ConnectionAnchor=function(owner){this.owner=owner;};ConnectionAnchor.prototype.type="ConnectionAnchor";ConnectionAnchor.prototype.getLocation=function(_142c){return this.getReferencePoint();};ConnectionAnchor.prototype.getOwner=function(){return this.owner;};ConnectionAnchor.prototype.setOwner=function(owner){this.owner=owner;};ConnectionAnchor.prototype.getBox=function(){return this.getOwner().getAbsoluteBounds();};ConnectionAnchor.prototype.getReferencePoint=function(){if(this.getOwner()==null){return null;}else{return this.getOwner().getAbsolutePosition();}};