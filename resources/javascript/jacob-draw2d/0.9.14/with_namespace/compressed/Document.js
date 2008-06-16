/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Document=function(_1ae5){this.canvas=_1ae5;};draw2d.Document.prototype.getFigures=function(){var _1ae6=new draw2d.ArrayList();var _1ae7=this.canvas.figures;var _1ae8=this.canvas.dialogs;for(var i=0;i<_1ae7.getSize();i++){var _1aea=_1ae7.get(i);if(_1ae8.indexOf(_1aea)==-1&&_1aea.getParent()==null&&!(_1aea instanceof draw2d.Window)){_1ae6.add(_1aea);}}return _1ae6;};draw2d.Document.prototype.getFigure=function(id){return this.canvas.getFigure(id);};draw2d.Document.prototype.getLines=function(){return this.canvas.getLines();};