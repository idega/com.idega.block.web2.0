/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.BackgroundColorDialog=function(_1c11){draw2d.ColorDialog.call(this);this.figure=_1c11;var color=_1c11.getBackgroundColor();if(color!=null){this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));}};draw2d.BackgroundColorDialog.prototype=new draw2d.ColorDialog;draw2d.BackgroundColorDialog.prototype.type="BackgroundColorDialog";draw2d.BackgroundColorDialog.prototype.onOk=function(){var _1c13=this.workflow;draw2d.ColorDialog.prototype.onOk.call(this);if(typeof this.figure.setBackgroundColor=="function"){_1c13.getCommandStack().execute(new draw2d.CommandSetBackgroundColor(this.figure,this.getSelectedColor()));if(_1c13.getCurrentSelection()==this.figure){_1c13.setCurrentSelection(this.figure);}}};