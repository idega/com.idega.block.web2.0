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
draw2d.PropertyDialog=function(/*:draw2d.Figure*/ figure ,/*:String*/ propertyName,/*:String*/ label )
{
  /** @private **/
  this.figure = figure;
  /** @private **/
  this.propertyName = propertyName;
  /** @private **/
  this.label = label;
  draw2d.Dialog.call(this);
  this.setDimension(400,120);
}
draw2d.PropertyDialog.prototype = new draw2d.Dialog;
/** @private **/
draw2d.PropertyDialog.prototype.type="PropertyDialog";


/**
 * @private
 **/
draw2d.PropertyDialog.prototype.createHTMLElement=function()
{
  var item = draw2d.Dialog.prototype.createHTMLElement.call(this);

  var inputDiv = document.createElement("form");
  inputDiv.style.position="absolute";
  inputDiv.style.left = "10px";
  inputDiv.style.top = "30px";
  inputDiv.style.width="375px";
  inputDiv.style.font="normal 10px verdana";
  item.appendChild(inputDiv);

  this.labelDiv = document.createElement("div");
  this.labelDiv.innerHTML=this.label;
  this.disableTextSelection(this.labelDiv);
  inputDiv.appendChild(this.labelDiv);

  this.input = document.createElement("input");
  this.input.style.border="1px solid gray";
  this.input.style.font="normal 10px verdana";
  this.input.type="text";

  var value = this.figure.getProperty(this.propertyName);
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
 *
 **/
draw2d.PropertyDialog.prototype.onOk=function()
{
  draw2d.Dialog.prototype.onOk.call(this);
  this.figure.setProperty(this.propertyName, this.input.value);
}

