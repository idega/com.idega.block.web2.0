/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.BezierConnectionRouter=function(_2694){if(!_2694){this.cheapRouter=new draw2d.ManhattanConnectionRouter();}else{this.cheapRouter=null;}this.iteration=5;};draw2d.BezierConnectionRouter.prototype=new draw2d.ConnectionRouter;draw2d.BezierConnectionRouter.prototype.type="BezierConnectionRouter";draw2d.BezierConnectionRouter.prototype.drawBezier=function(_2695,_2696,t,iter){var n=_2695.length-1;var q=new Array();var _269b=n+1;for(var i=0;i<_269b;i++){q[i]=new Array();q[i][0]=_2695[i];}for(var j=1;j<=n;j++){for(var i=0;i<=(n-j);i++){q[i][j]=new draw2d.Point((1-t)*q[i][j-1].x+t*q[i+1][j-1].x,(1-t)*q[i][j-1].y+t*q[i+1][j-1].y);}}var c1=new Array();var c2=new Array();for(var i=0;i<n+1;i++){c1[i]=q[0][i];c2[i]=q[i][n-i];}if(iter>=0){this.drawBezier(c1,_2696,t,--iter);this.drawBezier(c2,_2696,t,--iter);}else{for(var i=0;i<n;i++){_2696.push(q[i][n-i]);}}};draw2d.BezierConnectionRouter.prototype.route=function(conn){if(this.cheapRouter!=null&&(conn.getSource().getParent().isMoving==true||conn.getTarget().getParent().isMoving==true)){this.cheapRouter.route(conn);return;}var _26a1=new Array();var _26a2=conn.getStartPoint();var toPt=conn.getEndPoint();this._route(_26a1,conn,toPt,this.getEndDirection(conn),_26a2,this.getStartDirection(conn));var _26a4=new Array();this.drawBezier(_26a1,_26a4,0.5,this.iteration);for(var i=0;i<_26a4.length;i++){conn.addPoint(_26a4[i]);}conn.addPoint(toPt);};draw2d.BezierConnectionRouter.prototype._route=function(_26a6,conn,_26a8,_26a9,toPt,toDir){var TOL=0.1;var _26ad=0.01;var _26ae=90;var UP=0;var RIGHT=1;var DOWN=2;var LEFT=3;var xDiff=_26a8.x-toPt.x;var yDiff=_26a8.y-toPt.y;var point;var dir;if(((xDiff*xDiff)<(_26ad))&&((yDiff*yDiff)<(_26ad))){_26a6.push(new draw2d.Point(toPt.x,toPt.y));return;}if(_26a9==LEFT){if((xDiff>0)&&((yDiff*yDiff)<TOL)&&(toDir==RIGHT)){point=toPt;dir=toDir;}else{if(xDiff<0){point=new draw2d.Point(_26a8.x-_26ae,_26a8.y);}else{if(((yDiff>0)&&(toDir==DOWN))||((yDiff<0)&&(toDir==UP))){point=new draw2d.Point(toPt.x,_26a8.y);}else{if(_26a9==toDir){var pos=Math.min(_26a8.x,toPt.x)-_26ae;point=new draw2d.Point(pos,_26a8.y);}else{point=new draw2d.Point(_26a8.x-(xDiff/2),_26a8.y);}}}if(yDiff>0){dir=UP;}else{dir=DOWN;}}}else{if(_26a9==RIGHT){if((xDiff<0)&&((yDiff*yDiff)<TOL)&&(toDir==LEFT)){point=toPt;dir=toDir;}else{if(xDiff>0){point=new draw2d.Point(_26a8.x+_26ae,_26a8.y);}else{if(((yDiff>0)&&(toDir==DOWN))||((yDiff<0)&&(toDir==UP))){point=new draw2d.Point(toPt.x,_26a8.y);}else{if(_26a9==toDir){var pos=Math.max(_26a8.x,toPt.x)+_26ae;point=new draw2d.Point(pos,_26a8.y);}else{point=new draw2d.Point(_26a8.x-(xDiff/2),_26a8.y);}}}if(yDiff>0){dir=UP;}else{dir=DOWN;}}}else{if(_26a9==DOWN){if(((xDiff*xDiff)<TOL)&&(yDiff<0)&&(toDir==UP)){point=toPt;dir=toDir;}else{if(yDiff>0){point=new draw2d.Point(_26a8.x,_26a8.y+_26ae);}else{if(((xDiff>0)&&(toDir==RIGHT))||((xDiff<0)&&(toDir==LEFT))){point=new draw2d.Point(_26a8.x,toPt.y);}else{if(_26a9==toDir){var pos=Math.max(_26a8.y,toPt.y)+_26ae;point=new draw2d.Point(_26a8.x,pos);}else{point=new draw2d.Point(_26a8.x,_26a8.y-(yDiff/2));}}}if(xDiff>0){dir=LEFT;}else{dir=RIGHT;}}}else{if(_26a9==UP){if(((xDiff*xDiff)<TOL)&&(yDiff>0)&&(toDir==DOWN)){point=toPt;dir=toDir;}else{if(yDiff<0){point=new draw2d.Point(_26a8.x,_26a8.y-_26ae);}else{if(((xDiff>0)&&(toDir==RIGHT))||((xDiff<0)&&(toDir==LEFT))){point=new draw2d.Point(_26a8.x,toPt.y);}else{if(_26a9==toDir){var pos=Math.min(_26a8.y,toPt.y)-_26ae;point=new draw2d.Point(_26a8.x,pos);}else{point=new draw2d.Point(_26a8.x,_26a8.y-(yDiff/2));}}}if(xDiff>0){dir=LEFT;}else{dir=RIGHT;}}}}}}this._route(_26a6,conn,point,dir,toPt,toDir);_26a6.push(_26a8);};