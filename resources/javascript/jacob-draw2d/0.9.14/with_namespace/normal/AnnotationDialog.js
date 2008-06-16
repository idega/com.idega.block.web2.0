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
 * @class Use this class to modifie the text in an annotation figure.
 *
 * @author Andreas Herz
 * @version 0.9.14
 * @param {Annotation} annotationFigure The annotation figure which should be modfied with this dialog.
 * @constructor
 */
draw2d.AnnotationDialog =function(/*:Annotation*/ annotationFigure)
{
  /** @private **/
  this.figure = annotationFigure;

  draw2d.Dialog.call(this);
  this.setDimension(400,100);
}

draw2d.AnnotationDialog.prototype = new draw2d.Dialog;
/** @private **/
draw2d.AnnotationDialog.prototype.type="AnnotationDialog";

/**
 * @private
 **/
draw2d.AnnotationDialog.prototype.createHTMLElement=function()
{
  var item = draw2d.Dialog.prototype.createHTMLElement.call(this);

  var inputDiv = document.createElement("form");
  inputDiv.style.position="absolute";
  inputDiv.style.left = "10px";
  inputDiv.style.top = "30px";
  inputDiv.style.width="375px";
  inputDiv.style.font="normal 10px verdana";
  item.appendChild(inputDiv);

  this.label = document.createTextNode("Text");
  inputDiv.appendChild(this.label);

  this.input = document.createElement("input");
  this.input.style.border="1px solid gray";
  this.input.style.font="normal 10px verdana";
  this.input.type="text";

  var value = this.figure.getText();
  if(value)
    this.input.value = value;
  else
    this.input.value = "";
  this.input.style.width="100%";
  inputDiv.appendChild(this.input);

  this.input.focus();

  return item;
}

/**
 * This method will be called if the user pressed the OK button in buttonbar of the dialog.<br>
 * Sub classes can override this method to implement there own stuff.<br><br>
 * Don't forget to call the super method after you have done your stuff with
 * <code>Dialog.prototype.onOk.call(this);</code>
 **/
draw2d.AnnotationDialog.prototype.onOk=function()
{
  this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure, this.input.value));
  this.workflow.removeFigure(this);
}
