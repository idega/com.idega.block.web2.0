/* This notice must be untouched at all times.

Open-jACOB Draw2D
The latest version is available at
http://www.openjacob.org

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/

/**
 * 
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.BackgroundColorDialog=function(/*:draw2d.Figure*/ figure)
{
  draw2d.ColorDialog.call(this);
  this.figure = figure;
  var color = figure.getBackgroundColor();
  // color==null => transparent
  if(color!=null)
    this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));
}

draw2d.BackgroundColorDialog.prototype = new draw2d.ColorDialog;
/** @private **/
draw2d.BackgroundColorDialog.prototype.type="BackgroundColorDialog";


/**
 * This method will be called if the user press the ok button in the dialog.
 * A sub class can implement there own stuff.<br>
 *
 * @private
 **/
draw2d.BackgroundColorDialog.prototype.onOk=function()
{
  var oldWorkflow = this.workflow;
  draw2d.ColorDialog.prototype.onOk.call(this);
  if(typeof this.figure.setBackgroundColor =="function")
  {
    // 1.) undo/redo support
    oldWorkflow.getCommandStack().execute(new draw2d.CommandSetBackgroundColor(this.figure, this.getSelectedColor()));

    // 2.) without undo/redo
    //this.figure.setBackgroundColor(this.getSelectedColor());

    // update the workflow with the new property of hte object
    //
    if(oldWorkflow.getCurrentSelection()==this.figure)
      oldWorkflow.setCurrentSelection(this.figure);
  }
}
