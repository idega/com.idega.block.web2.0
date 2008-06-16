/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ConnectionLocator=function(_12d3){Locator.call(this);this.connection=_12d3;};ConnectionLocator.prototype=new Locator;ConnectionLocator.prototype.type="ConnectionLocator";ConnectionLocator.prototype.getConnection=function(){return this.connection;};