/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

BackgroundColorDialog=function(_1410){ColorDialog.call(this);this.figure=_1410;var color=_1410.getBackgroundColor();if(color!=null){this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));}};BackgroundColorDialog.prototype=new ColorDialog;BackgroundColorDialog.prototype.type="BackgroundColorDialog";BackgroundColorDialog.prototype.onOk=function(){var _1412=this.workflow;ColorDialog.prototype.onOk.call(this);if(typeof this.figure.setBackgroundColor=="function"){_1412.getCommandStack().execute(new CommandSetBackgroundColor(this.figure,this.getSelectedColor()));if(_1412.getCurrentSelection()==this.figure){_1412.setCurrentSelection(this.figure);}}};