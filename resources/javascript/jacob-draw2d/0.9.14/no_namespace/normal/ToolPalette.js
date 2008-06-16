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
ToolPalette=function(/*:String*/ title)
{
  Window.call(this,title);
  this.setDimension(75,400);
  /** @private **/
  this.activeTool = null;/*:ToolGeneric */

  /** @private **/
  this.children = new Object();
}

ToolPalette.prototype = new Window;
/** @private **/
ToolPalette.prototype.type="ToolPalette";


/**
 * @private
 **/
ToolPalette.prototype.dispose=function()
{
  Window.prototype.dispose.call(this);
}


/**
 * @private
 **/
ToolPalette.prototype.createHTMLElement=function()
{
  var item = Window.prototype.createHTMLElement.call(this);

  this.scrollarea = document.createElement("div");
  this.scrollarea.style.position="absolute";
  this.scrollarea.style.left   = "0px";
  if(this.hasTitleBar())
   this.scrollarea.style.top    = "15px";
  else
   this.scrollarea.style.top    = "0px";
  this.scrollarea.style.width = this.getWidth()+"px";
  this.scrollarea.style.height = "15px";
  this.scrollarea.style.margin = "0px";
  this.scrollarea.style.padding= "0px";
  this.scrollarea.style.font="normal 10px verdana";
  this.scrollarea.style.borderBottom="2px solid gray";
  this.scrollarea.style.whiteSpace="nowrap";
  this.scrollarea.style.textAlign="center";
  this.scrollarea.style.overflowX="auto";
  this.scrollarea.style.overflowY="auto";
  this.scrollarea.style.overflow="auto";
  item.appendChild(this.scrollarea);

  return item;
}

/**
 * @param {int} w new width of the window. 
 * @param {int} h new height of the window. 
 **/
ToolPalette.prototype.setDimension=function(/*:int*/ w,/*:int*/ h)
{
  Window.prototype.setDimension.call(this,w,h);
  if(this.scrollarea!=null)
  {
    this.scrollarea.style.width=this.getWidth()+"px";
    if(this.hasTitleBar())
       this.scrollarea.style.height=(this.getHeight()-15)+"px";
    else
       this.scrollarea.style.height=this.getHeight()+"px";
  }
}

/**
 *
 **/
ToolPalette.prototype.addChild=function(/*:Button*/ item)
{
  this.children[item.id] = item;

  this.scrollarea.appendChild(item.getHTMLElement());
}


/**
 *
 **/
ToolPalette.prototype.getChild=function(/*:String*/ id )
{
  return this.children[id];
}


/**
 *
 **/
ToolPalette.prototype.getActiveTool=function()
{
  return this.activeTool;
}


/**
 *
 **/
ToolPalette.prototype.setActiveTool=function(/*:ToolGeneric*/ tool)
{
  if(this.activeTool != tool && this.activeTool!=null)
    this.activeTool.setActive(false);
  if(tool!=null)
    tool.setActive(true);
  this.activeTool = tool;
}

