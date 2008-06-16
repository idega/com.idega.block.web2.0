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
 * @version 0.9.14
 * @author Andreas Herz
 * @param {String} msg The text of the label object
 * @constructor
 */
draw2d.Label=function(/*:String*/ msg)
{
  /** @private **/
  this.msg = msg;
  /** @private **/
  this.bgColor = null;
  /** @private **/
  this.color = new  draw2d.Color(0,0,0);
  /** @private **/
  this.fontSize= 10;
  /** @private **/
  this.textNode = null;
  /** @private **/
  this.align = "center";
  draw2d.Figure.call(this);
}

draw2d.Label.prototype = new draw2d.Figure;
/** @private **/
draw2d.Label.prototype.type="Label";

/**
 * @private
 **/
draw2d.Label.prototype.createHTMLElement=function()
{
    var item = draw2d.Figure.prototype.createHTMLElement.call(this);
    this.textNode = document.createTextNode(this.msg);
    item.appendChild(this.textNode);
    item.style.color=this.color.getHTMLStyle();
    item.style.fontSize=this.fontSize+"pt";
    item.style.width="auto";
    item.style.height="auto";
//    item.style.padding="2px";
    item.style.paddingLeft="3px";
    item.style.paddingRight="3px";
    item.style.textAlign=this.align;

    if(this.bgColor!=null)
      item.style.backgroundColor=this.bgColor.getHTMLStyle();
    return item;
}

/**
 * A Label is not resizeable. In this case this method returns always <b>false</b>.
 * @returns Returns always false in the case of a Label.
 * @type boolean
 **/
draw2d.Label.prototype.isResizeable=function()
{
  return false;
}

draw2d.Label.prototype.setWordwrap=function(/*:boolean*/ flag)
{
  this.html.style.whiteSpace=flag?"wrap":"nowrap";
}

/**
 * @param {int} w The new width of the figure
 * @param {int} h The new height of the figure
 **/
/*
Label.prototype.setDimension=function( w, h)
{
  // ignore: Das Label bestimmt seine Breite/Höhe selbst.
}
*/

/**
 * 
 * @param {String} align The new align of the label ["left", "center", "right"]
 **/
draw2d.Label.prototype.setAlign=function( /*:String*/ align)
{
  this.align = align;
  this.html.style.textAlign=align;
}

/**
 * Set the new background color of the label.
 *
 * @param {draw2d.Color} color The new background color.
 **/
draw2d.Label.prototype.setBackgroundColor= function(/*:draw2d.Color*/ color)
{
  this.bgColor = color;
  if(this.bgColor!=null)
    this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
  else
    this.html.style.backgroundColor="transparent";
}

/**
 * @param {draw2d.Color} color The new font color of the label.
 **/
draw2d.Label.prototype.setColor= function(/*:draw2d.Color*/ color)
{
  this.color = color;
  this.html.style.color = this.color.getHTMLStyle();
}

/**
 * Set the new font size in [pt].
 *
 * @param {int} size The new font size in <code>pt</code>
 **/
draw2d.Label.prototype.setFontSize= function(/*:int*/ size)
{
  this.fontSize = size;
  this.html.style.fontSize = this.fontSize+"pt";
}

/**
 * @returns the calculated width of the label
 * @type int
 **/
draw2d.Label.prototype.getWidth=function()
{
  if(window.getComputedStyle)
    return parseInt(getComputedStyle(this.html,'').getPropertyValue("width"));
  return parseInt(this.html.clientWidth);
}

/**
 * @returns the calculated height of the label
 * @type int
 **/
draw2d.Label.prototype.getHeight=function()
{
  if(window.getComputedStyle)
    return parseInt(getComputedStyle(this.html,'').getPropertyValue("height"));
  return parseInt(this.html.clientHeight);
}

/**
 * Returns the current text of the label.
 *
 * @returns the current display text of the label
 * @type String
 **/
draw2d.Label.prototype.getText=function()
{
  this.msg = text;
}

/**
 * @param {String} text The new text for the label.
 **/
draw2d.Label.prototype.setText=function(/*:String*/ text )
{
  this.msg = text;
  this.html.removeChild(this.textNode);
  this.textNode = document.createTextNode(this.msg);
  this.html.appendChild(this.textNode);
}

/**
 * @param {String} text The new HTML formated text for the label.
 **/
draw2d.Label.prototype.setStyledText=function(/*:String*/ text)
{
  this.msg = text;
  this.html.removeChild(this.textNode);
  this.textNode = document.createElement("div");
  this.textNode.style.whiteSpace="nowrap";
  this.textNode.innerHTML=text;
  this.html.appendChild(this.textNode);
}
