/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.CommandStackEvent=function(_1680,_1681){this.command=_1680;this.details=_1681;};draw2d.CommandStackEvent.prototype.type="CommandStackEvent";draw2d.CommandStackEvent.prototype.getCommand=function(){return this.command;};draw2d.CommandStackEvent.prototype.getDetails=function(){return this.details;};draw2d.CommandStackEvent.prototype.isPostChangeEvent=function(){return 0!=(this.getDetails()&draw2d.CommandStack.POST_MASK);};draw2d.CommandStackEvent.prototype.isPreChangeEvent=function(){return 0!=(this.getDetails()&draw2d.CommandStack.PRE_MASK);};