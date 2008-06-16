/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

RelationsetModel=function(){this.relations=new ArrayList();this.nonPersistentTableAliases=new ArrayList();};RelationModel.prototype.type="RelationModel";RelationsetModel.prototype.getRelationModels=function(){return this.relations;};RelationsetModel.prototype.getTableAliasModels=function(){return this.nonPersistentTableAliases;};RelationsetModel.prototype.addRelationModel=function(_bc8){this.relations.add(_bc8);if(this.nonPersistentTableAliases.indexOf(_bc8.getToTableModel())<=0){this.nonPersistentTableAliases.add(_bc8.getToTableModel());}if(this.nonPersistentTableAliases.indexOf(_bc8.getFromTableModel())<=0){this.nonPersistentTableAliases.add(_bc8.getFromTableModel());}};RelationsetModel.prototype.getPosition=function(_bc9){return new Point(100,100);};