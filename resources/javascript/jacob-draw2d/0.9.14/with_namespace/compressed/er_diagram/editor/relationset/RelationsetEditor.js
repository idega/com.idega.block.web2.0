/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

RelationsetEditor=function(id,_1dab){draw2d.Workflow.call(this,id);this.relationset=_1dab;var _1dac=this.relationset.getTableAliasModels();for(var i=0;i<_1dac.getSize();i++){var _1dae=new TableAliasFigure(_1dac.get(i));this.addFigure(_1dae);}};RelationsetEditor.prototype=new draw2d.Workflow;RelationsetEditor.prototype.type="RelationsetEditor";