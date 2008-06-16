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
 * @param {String} title The title of the window.
 * @constructor
 */
Dialog=function( /*:String*/ title)
{
  /** @private **/
  this.buttonbar = null;
  if(title)
    Window.call(this,title);
  else
    Window.call(this,"Dialog");
  this.setDimension(400,300);
}

Dialog.prototype = new Window;
/** @private **/
Dialog.prototype.type="Dialog";

/**
 * @private
 **/
Dialog.prototype.createHTMLElement=function()
{
  var item = Window.prototype.createHTMLElement.call(this);

  var oThis = this;

  this.buttonbar = document.createElement("div");
  this.buttonbar.style.position="absolute";
  this.buttonbar.style.left   = "0px";
  this.buttonbar.style.bottom = "0px";
  this.buttonbar.style.width  = this.getWidth()+"px";
  this.buttonbar.style.height = "30px";
  this.buttonbar.style.margin = "0px";
  this.buttonbar.style.padding= "0px";
  this.buttonbar.style.font="normal 10px verdana";
  this.buttonbar.style.backgroundColor="#c0c0c0";
  this.buttonbar.style.borderBottom="2px solid gray";
  this.buttonbar.style.whiteSpace="nowrap";
  this.buttonbar.style.textAlign="center";

  this.okbutton = document.createElement("button");
  this.okbutton.style.border="1px solid gray";
  this.okbutton.style.font="normal 10px verdana";
  this.okbutton.style.width="80px";
  this.okbutton.style.margin="5px";
  this.okbutton.innerHTML = "Ok";
  this.okbutton.onclick=function(){oThis.onOk();};
  this.buttonbar.appendChild(this.okbutton);

  this.cancelbutton = document.createElement("button");
  this.cancelbutton.innerHTML = "Cancel";
  this.cancelbutton.style.font="normal 10px verdana";
  this.cancelbutton.style.border="1px solid gray";
  this.cancelbutton.style.width="80px";
  this.cancelbutton.style.margin="5px";
  this.cancelbutton.onclick=function(){oThis.onCancel();};
  this.buttonbar.appendChild(this.cancelbutton);

  item.appendChild(this.buttonbar);

  return item;
}

/**
 * This method will be called if the user pressed the OK button in buttonbar of the dialog.<br>
 * Subclasses can override this method to implement there own stuff.<br><br>
 * Don't forget to call the super method after you have done your stuff with
 * <code>Dialog.prototype.onOk.call(this);</code>
 **/
Dialog.prototype.onOk=function()
{
  this.workflow.removeFigure(this);
}

/**
 * This method will be called if the user pressed the CANCEL button in buttonbar of the dialog.<br>
 * Subclasses can override this method to implement there own stuff.<br><br>
 * Don't forget to call the super method after you have done your stuff with
 * <code>Dialog.prototype.onCancel.call(this);</code>
 **/
Dialog.prototype.onCancel=function()
{
  this.workflow.removeFigure(this);
}

/**
 * Set the new dimension of the dialog.
 * @param {int} w new width of the window. 
 * @param {int} h new height of the window. 
 **/
Dialog.prototype.setDimension=function(/*:int*/ w, /*:int*/ h)
{
  Window.prototype.setDimension.call(this,w,h);
  if(this.buttonbar!=null)
  {
    this.buttonbar.style.width=this.getWidth()+"px";
  }
}

/**
 * @param {Workflow} workflow The new workflow of the object. 
 * @private
 **/
Dialog.prototype.setWorkflow= function(/*:Workflow*/ workflow)
{
  Window.prototype.setWorkflow.call(this, workflow);
  this.setFocus();
}

/**
 * The framework call this method after dialog creation. You can
 * set the focus to your HTML input element or something else.
 * It is always recommeded to call the super method if a sub class override this
 * method. <br>
 * Call: <code>Dialog.prototype.setFocus.call(this);</code>
 **/
Dialog.prototype.setFocus=function()
{
}

/**
 * Framework callback if an object has beend deleted, move, added or something else.
 * Sub classes can override this method to implement there own stuff. e.g. update some
 * UI elements in relation to the document dirty state.
 **/
Dialog.prototype.onSetDocumentDirty=function()
{
}