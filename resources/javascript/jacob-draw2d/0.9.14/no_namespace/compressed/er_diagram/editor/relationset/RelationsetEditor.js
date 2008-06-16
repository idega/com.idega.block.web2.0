/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

RelationsetEditor=function(id,_d6d){Workflow.call(this,id);this.relationset=_d6d;var _d6e=this.relationset.getTableAliasModels();for(var i=0;i<_d6e.getSize();i++){var _d70=new TableAliasFigure(_d6e.get(i));this.addFigure(_d70);}};RelationsetEditor.prototype=new Workflow;RelationsetEditor.prototype.type="RelationsetEditor";