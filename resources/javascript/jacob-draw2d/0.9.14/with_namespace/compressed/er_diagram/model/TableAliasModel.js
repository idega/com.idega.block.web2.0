/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

TableAliasModel=function(name,table){this.table=table;this.name=name;};TableAliasModel.prototype.type="TableAliasModel";TableAliasModel.prototype.getName=function(){return this.name;};TableAliasModel.prototype.getTableModel=function(){return this.table;};