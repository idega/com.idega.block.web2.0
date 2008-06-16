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
CheckBoxFigure=function(/*:String */ title)
{
  /** @private **/
  if(title)
     this.title =title;
  else
     this.title = "";
  Figure.call(this);
}

CheckBoxFigure.prototype = new Figure;

/**
 * @private
 **/
CheckBoxFigure.prototype.createHTMLElement=function()
{
  var item = Figure.prototype.createHTMLElement.call(this);
  item.style.margin="0px";
  item.style.padding="0px";

  this.ui_element = document.createElement("input");
  this.ui_element.type="checkbox";
  this.ui_element.style.position="absolute";
  this.ui_element.style.left   = "0px";
  this.ui_element.style.top    = "0px";
  this.ui_element.style.margin = "0px";
  this.ui_element.style.padding= "0px";
  this.ui_element.style.cursor="move";
  
  this.textNode = document.createElement("div");
  this.textNode.innerHTML = "blabla";
  this.textNode.style.fontFamily="sans-serif";
  this.textNode.style.fontSize="8pt";
  this.textNode.style.position="absolute";
  this.textNode.style.left   = "20px";
  this.textNode.style.top    = "0px";

  item.appendChild(this.ui_element);
  item.appendChild(this.textNode);
  return item;
}

/**
 * @param {int} w new width of the window. 
 * @param {int} h new height of the window. 
 **/
CheckBoxFigure.prototype.setDimension=function( w /*:int*/, h /*:int*/)
{
  Figure.prototype.setDimension.call(this,w,20);
}

