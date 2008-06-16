/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ChopboxConnectionAnchor=function(_bbd){ConnectionAnchor.call(this,_bbd);};ChopboxConnectionAnchor.prototype=new ConnectionAnchor;ChopboxConnectionAnchor.prototype.type="ChopboxConnectionAnchor";ChopboxConnectionAnchor.prototype.getLocation=function(_bbe){var r=new Dimension();r.setBounds(this.getBox());r.translate(-1,-1);r.resize(1,1);var _bc0=r.x+r.w/2;var _bc1=r.y+r.h/2;if(r.isEmpty()||(_bbe.x==_bc0&&_bbe.y==_bc1)){return new Point(_bc0,_bc1);}var dx=_bbe.x-_bc0;var dy=_bbe.y-_bc1;var _bc4=0.5/Math.max(Math.abs(dx)/r.w,Math.abs(dy)/r.h);dx*=_bc4;dy*=_bc4;_bc0+=dx;_bc1+=dy;return new Point(Math.round(_bc0),Math.round(_bc1));};ChopboxConnectionAnchor.prototype.getBox=function(){return this.getOwner().getParent().getBounds();};ChopboxConnectionAnchor.prototype.getReferencePoint=function(){return this.getBox().getCenter();};