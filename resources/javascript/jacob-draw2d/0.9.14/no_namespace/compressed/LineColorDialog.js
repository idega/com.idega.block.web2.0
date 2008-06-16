/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

LineColorDialog=function(_1c1){ColorDialog.call(this);this.figure=_1c1;var _1c2=_1c1.getColor();this.updateH(this.rgb2hex(_1c2.getRed(),_1c2.getGreen(),_1c2.getBlue()));};LineColorDialog.prototype=new ColorDialog;LineColorDialog.prototype.type="LineColorDialog";LineColorDialog.prototype.onOk=function(){var _1c3=this.workflow;ColorDialog.prototype.onOk.call(this);if(typeof this.figure.setColor=="function"){_1c3.getCommandStack().execute(new CommandSetColor(this.figure,this.getSelectedColor()));if(_1c3.getCurrentSelection()==this.figure){_1c3.setCurrentSelection(this.figure);}}};