/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Document=function(_da5){this.canvas=_da5;};Document.prototype.getFigures=function(){var _da6=new ArrayList();var _da7=this.canvas.figures;var _da8=this.canvas.dialogs;for(var i=0;i<_da7.getSize();i++){var _daa=_da7.get(i);if(_da8.indexOf(_daa)==-1&&_daa.getParent()==null&&!(_daa instanceof Window)){_da6.add(_daa);}}return _da6;};Document.prototype.getFigure=function(id){return this.canvas.getFigure(id);};Document.prototype.getLines=function(){return this.canvas.getLines();};