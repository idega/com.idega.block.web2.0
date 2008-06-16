/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

MenuItem=function(label,_12c5,_12c6){this.label=label;this.iconUrl=_12c5;this.parentMenu=null;this.action=_12c6;};MenuItem.prototype.type="MenuItem";MenuItem.prototype.isEnabled=function(){return true;};MenuItem.prototype.getLabel=function(){return this.label;};MenuItem.prototype.execute=function(x,y){this.parentMenu.workflow.showMenu(null);this.action(x,y);};