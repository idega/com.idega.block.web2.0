/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

SelectionHighlighter=function(_db1){this.workflow=_db1;this.counter=0;this.black=new Color(0,0,0);this.gray=new Color(200,200,200);};SelectionHighlighter.prototype.type="SelectionHighlighter";SelectionHighlighter.prototype.onSelectionChanged=function(_db2){this.counter++;debugLabel.setText("Count:"+this.counter);var _db3=(_db2==null)?1:0.2;var _db4=(_db2==null)?this.black:this.gray;var doc=this.workflow.getDocument();var _db6=doc.getFigures();for(var i=0;i<_db6.getSize();i++){_db6.get(i).setAlpha(_db3);}var _db8=doc.getLines();for(var i=0;i<_db8.getSize();i++){_db8.get(i).setColor(_db4);}if(_db2!=null){_db2.setAlpha(1);if(_db2 instanceof Node){var _db9=_db2.getPorts();for(var i=0;i<_db9.getSize();i++){var port=_db9.get(i);var _dbb=port.getConnections();for(var j=0;j<_dbb.getSize();j++){_dbb.get(j).setColor(this.black);}}}}};