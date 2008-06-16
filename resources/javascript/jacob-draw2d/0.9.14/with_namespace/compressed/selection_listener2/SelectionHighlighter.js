/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.SelectionHighlighter=function(_238a){this.workflow=_238a;this.counter=0;this.black=new draw2d.Color(0,0,0);this.gray=new draw2d.Color(200,200,200);};draw2d.SelectionHighlighter.prototype.type="SelectionHighlighter";draw2d.SelectionHighlighter.prototype.onSelectionChanged=function(_238b){this.counter++;debugLabel.setText("Count:"+this.counter);var alpha=(_238b==null)?1:0.2;var color=(_238b==null)?this.black:this.gray;var doc=this.workflow.getDocument();var _238f=doc.getFigures();for(var i=0;i<_238f.getSize();i++){_238f.get(i).setAlpha(alpha);}var lines=doc.getLines();for(var i=0;i<lines.getSize();i++){lines.get(i).setColor(color);}if(_238b!=null){_238b.setAlpha(1);if(_238b instanceof draw2d.Node){var ports=_238b.getPorts();for(var i=0;i<ports.getSize();i++){var port=ports.get(i);var _2394=port.getConnections();for(var j=0;j<_2394.getSize();j++){_2394.get(j).setColor(this.black);}}}}};