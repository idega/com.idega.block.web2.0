/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.NullConnectionRouter=function(){};draw2d.NullConnectionRouter.prototype=new draw2d.ConnectionRouter;draw2d.NullConnectionRouter.prototype.type="NullConnectionRouter";draw2d.NullConnectionRouter.prototype.invalidate=function(){};draw2d.NullConnectionRouter.prototype.route=function(_2ab8){_2ab8.addPoint(_2ab8.getStartPoint());_2ab8.addPoint(_2ab8.getEndPoint());};