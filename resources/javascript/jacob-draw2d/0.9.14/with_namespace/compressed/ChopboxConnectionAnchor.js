/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ChopboxConnectionAnchor=function(owner){draw2d.ConnectionAnchor.call(this,owner);};draw2d.ChopboxConnectionAnchor.prototype=new draw2d.ConnectionAnchor;draw2d.ChopboxConnectionAnchor.prototype.type="ChopboxConnectionAnchor";draw2d.ChopboxConnectionAnchor.prototype.getLocation=function(_2770){var r=new draw2d.Dimension();r.setBounds(this.getBox());r.translate(-1,-1);r.resize(1,1);var _2772=r.x+r.w/2;var _2773=r.y+r.h/2;if(r.isEmpty()||(_2770.x==_2772&&_2770.y==_2773)){return new Point(_2772,_2773);}var dx=_2770.x-_2772;var dy=_2770.y-_2773;var scale=0.5/Math.max(Math.abs(dx)/r.w,Math.abs(dy)/r.h);dx*=scale;dy*=scale;_2772+=dx;_2773+=dy;return new draw2d.Point(Math.round(_2772),Math.round(_2773));};draw2d.ChopboxConnectionAnchor.prototype.getBox=function(){return this.getOwner().getParent().getBounds();};draw2d.ChopboxConnectionAnchor.prototype.getReferencePoint=function(){return this.getBox().getCenter();};