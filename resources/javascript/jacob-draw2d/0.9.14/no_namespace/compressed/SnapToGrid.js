/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

SnapToGrid=function(_d43){SnapToHelper.call(this,_d43);};SnapToGrid.prototype=new SnapToHelper;SnapToGrid.prototype.snapPoint=function(_d44,_d45,_d46){_d46.x=this.workflow.gridWidthX*Math.floor(((_d45.x+this.workflow.gridWidthX/2)/this.workflow.gridWidthX));_d46.y=this.workflow.gridWidthY*Math.floor(((_d45.y+this.workflow.gridWidthY/2)/this.workflow.gridWidthY));return 0;};SnapToGrid.prototype.snapRectangle=function(_d47,_d48){_d48.x=_d47.x;_d48.y=_d47.y;_d48.w=_d47.w;_d48.h=_d47.h;return 0;};