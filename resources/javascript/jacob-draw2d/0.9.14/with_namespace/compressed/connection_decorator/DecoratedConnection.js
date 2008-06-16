/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.DecoratedConnection=function(){draw2d.Connection.call(this);this.setTargetDecorator(new draw2d.ArrowConnectionDecorator());this.setRouter(new draw2d.FanConnectionRouter());};draw2d.DecoratedConnection.prototype=new draw2d.Connection();draw2d.DecoratedConnection.prototype.type="DecoratedConnection";