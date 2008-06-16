/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SnapToGrid=function(_1dfd){draw2d.SnapToHelper.call(this,_1dfd);};draw2d.SnapToGrid.prototype=new draw2d.SnapToHelper;draw2d.SnapToGrid.prototype.snapPoint=function(_1dfe,_1dff,_1e00){_1e00.x=this.workflow.gridWidthX*Math.floor(((_1dff.x+this.workflow.gridWidthX/2)/this.workflow.gridWidthX));_1e00.y=this.workflow.gridWidthY*Math.floor(((_1dff.y+this.workflow.gridWidthY/2)/this.workflow.gridWidthY));return 0;};draw2d.SnapToGrid.prototype.snapRectangle=function(_1e01,_1e02){_1e02.x=_1e01.x;_1e02.y=_1e01.y;_1e02.w=_1e01.w;_1e02.h=_1e01.h;return 0;};