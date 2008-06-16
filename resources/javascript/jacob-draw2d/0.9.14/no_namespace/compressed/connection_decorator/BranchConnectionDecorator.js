/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

BranchConnectionDecorator=function(){};BranchConnectionDecorator.prototype=new ConnectionDecorator;BranchConnectionDecorator.prototype.type="BranchConnectionDecorator";BranchConnectionDecorator.prototype.paint=function(g){g.drawLine(0,-8,15,0);g.drawLine(0,8,15,0);g.drawLine(15,8,15,-8);};