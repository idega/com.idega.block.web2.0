/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Circle=function(_12c9){Oval.call(this);if(_12c9){this.setDimension(_12c9,_12c9);}};Circle.prototype=new Oval;Circle.prototype.type="Circle";Circle.prototype.setDimension=function(w,h){if(w>h){Oval.prototype.setDimension.call(this,w,w);}else{Oval.prototype.setDimension.call(this,h,h);}};Circle.prototype.isStrechable=function(){return false;};