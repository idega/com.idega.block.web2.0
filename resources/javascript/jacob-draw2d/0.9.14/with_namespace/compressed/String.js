/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

String.prototype.trim=function(){return (this.replace(new RegExp("^([\\s]+)|([\\s]+)$","gm"),""));};String.prototype.lefttrim=function(){return (this.replace(new RegExp("^[\\s]+","gm"),""));};String.prototype.righttrim=function(){return (this.replace(new RegExp("[\\s]+$","gm"),""));};