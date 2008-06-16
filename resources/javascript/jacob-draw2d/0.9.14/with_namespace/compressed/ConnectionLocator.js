/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ConnectionLocator=function(_20b2){draw2d.Locator.call(this);this.connection=_20b2;};draw2d.ConnectionLocator.prototype=new draw2d.Locator;draw2d.ConnectionLocator.prototype.type="ConnectionLocator";draw2d.ConnectionLocator.prototype.getConnection=function(){return this.connection;};