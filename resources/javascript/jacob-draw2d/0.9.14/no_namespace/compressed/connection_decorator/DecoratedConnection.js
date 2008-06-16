/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

DecoratedConnection=function(){Connection.call(this);this.setTargetDecorator(new ArrowConnectionDecorator());this.setRouter(new FanConnectionRouter());};DecoratedConnection.prototype=new Connection();DecoratedConnection.prototype.type="DecoratedConnection";