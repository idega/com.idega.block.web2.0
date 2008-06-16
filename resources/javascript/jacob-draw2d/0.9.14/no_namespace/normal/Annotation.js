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
 * @author Andreas Herz
 * @version 0.9.14
 * @param {String} msg The annotation text to display.
 * @constructor
 */
Annotation=function(/*:String*/ msg)
{
  /** @private **/
  this.msg = msg;
  /** @private **/
  this.color = new  Color(0,0,0);
  /** @private **/
  this.bgColor = new  Color(241,241,121);
  /** @private **/
  this.fontSize= 10;
  /** @private **/
  this.textNode = null;
  Figure.call(this);
}

Annotation.prototype = new Figure;
/** @private **/
Annotation.prototype.type="Annotation";

/**
 * @private
 **/
Annotation.prototype.createHTMLElement=function()
{
    var item = Figure.prototype.createHTMLElement.call(this);
    item.style.color=this.color.getHTMLStyle();
    item.style.backgroundColor=this.bgColor.getHTMLStyle();
    item.style.fontSize=this.fontSize+"pt";
    item.style.width="auto";
    item.style.height="auto";
    item.style.margin="0px";
    item.style.padding="0px";
    item.onselectstart = function() {return false;};
    item.unselectable = "on";
    item.style.MozUserSelect = "none";
    item.style.cursor = "default";

    this.textNode = document.createTextNode(this.msg);
    item.appendChild(this.textNode);
    this.disableTextSelection(item);

    return item;
}

/**
 * This method will be called from the framework if the user dbl click on this
 * figure. Sub classes can override this method to implement there own behaviour.<br>
 *
 **/
Annotation.prototype.onDoubleClick=function()
{
  var dialog = new AnnotationDialog(this);
  this.workflow.showDialog(dialog);
}



/**
 * Set the background color of this figure 
 *
 * @param {Color} color The new background color of this object.
 **/
Annotation.prototype.setBackgroundColor= function(/*:Color*/ color)
{
  this.bgColor = color;
  if(this.bgColor!=null)
    this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
  else
    this.html.style.backgroundColor="transparent";
}


/**
 * Returns the current background color of this objetc. 
 *
 * @returns Returns the current background color of this figure.
 * @type Color
 **/
Annotation.prototype.getBackgroundColor=function()
{
  return this.bgColor;
}


/**
 * Set the font size of the annotation text
 * @param {int} size The font size in <code>pt</code>
 **/
Annotation.prototype.setFontSize= function(/*:int*/ size)
{
  this.fontSize = size;
  this.html.style.fontSize = this.fontSize+"pt";
}
/**
 * @type String
 * @returns Returns the annotation text.
 **/ 
Annotation.prototype.getText=function()
{
  return this.msg;
}

/**
 * Set the text or message of this annotation figure.
 *
 * @param {String} text The new text of the annotation.
 **/
Annotation.prototype.setText=function(/*:String*/ text)
{
  this.msg = text;
  this.html.removeChild(this.textNode);
  this.textNode = document.createTextNode(this.msg);
  this.html.appendChild(this.textNode);
}


Annotation.prototype.setStyledText=function(/*:String*/ text)
{
  this.msg = text;
  this.html.removeChild(this.textNode);
  this.textNode = document.createElement("div");
  this.textNode.innerHTML=text;
  this.html.appendChild(this.textNode);
}
