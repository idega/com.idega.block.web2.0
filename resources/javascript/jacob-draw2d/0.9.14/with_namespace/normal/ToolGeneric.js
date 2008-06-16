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
draw2d.ToolGeneric=function(/*:draw2d.PaletteWindow*/ palette)
{
  /** @private **/
  this.x   = 0;
  /** @private **/
  this.y   = 0;
  /** @private **/
  this.enabled=true;
  /** @private **/
  this.tooltip = null;
  /** @private **/
  this.palette = palette;
  this.setDimension(10,10);
  /** @private **/
  this.html = this.createHTMLElement();
}

/** @private **/
draw2d.ToolGeneric.prototype.type="ToolGeneric";

/**
 * @private
 **/
draw2d.ToolGeneric.prototype.dispose=function()
{
  //this.id   = null; don't dispose the id! This is important for deregistration
  //this.html = null; don't dispose the id! This is important for deregistration
}


draw2d.ToolGeneric.prototype.getImageUrl=function()
{
  if(this.enabled)
    return this.type+".png";
  else
    return this.type+"_disabled.png";
}


/**
 * @private
 **/
draw2d.ToolGeneric.prototype.createHTMLElement=function()
{
    var item = document.createElement('div');
    item.id        = this.id;
    item.style.position="absolute";
    item.style.left   = this.x+"px";
    item.style.top    = this.y+"px";
    item.style.height = "24px";
    item.style.width  = "24px";
    item.style.margin = "0px";
    item.style.padding= "0px";
    if(this.getImageUrl()!=null)
      item.style.backgroundImage="url("+this.getImageUrl()+")";
    else
      item.style.backgroundImage="";
    var oThis = this;
    this.click=function(event)
    {
       if(oThis.enabled)
        oThis.palette.setActiveTool(oThis);
       event.cancelBubble = true;
       event.returnValue = false;
    }
    if (item.addEventListener) 
      item.addEventListener("click", this.click, false);
    else if (item.attachEvent) 
      item.attachEvent("onclick", this.click);

    return item;
}

/**
 * @private
 **/
draw2d.ToolGeneric.prototype.getHTMLElement=function()
{
  if(this.html==null)
    this.html = this.createHTMLElement();
  return this.html;
}


/**
 *
 **/
draw2d.ToolGeneric.prototype.execute=function(/*:int*/ x, /*:int*/ y)
{
  if(this.enabled)
    this.palette.setActiveTool(null);
}

draw2d.ToolGeneric.prototype.setTooltip=function(/*:String*/ tooltipText)
{
  this.tooltip = tooltipText;
  if(this.tooltip!=null)
     this.html.title=this.tooltip;
  else
     this.html.title="";

}


/**
 * @private
 **/
draw2d.ToolGeneric.prototype.setActive=function( /*:boolean*/ flag)
{
  if(!this.enabled)
    return;
  if(flag==true)
    this.html.style.border="2px inset";
  else
  {
    this.html.style.border="0px";
  }
}

/**
 * @private
 **/
draw2d.ToolGeneric.prototype.setEnabled=function(/*:boolean*/flag)
{
  this.enabled=flag;
  if(this.getImageUrl()!=null)
    this.html.style.backgroundImage="url("+this.getImageUrl()+")";
  else
    this.html.style.backgroundImage="";
}

/**
 *
 **/
draw2d.ToolGeneric.prototype.setDimension=function(/*:int*/ w,/*:int*/ h)
{
  this.width = w;
  this.height= h;

  // Falls das Element noch nie gezeichnet wurde, dann braucht aus das HTML nicht 
  // aktualisiert werden
  //
  if(this.html==null)
    return;

  this.html.style.width  = this.width+"px";
  this.html.style.height = this.height+"px";
}

/**
 *
 **/
draw2d.ToolGeneric.prototype.setPosition=function(xPos /*int*/, yPos /*int*/)
{
  this.x = Math.max(0,xPos);
  this.y = Math.max(0,yPos);
  // Falls das Element noch nie gezeichnet wurde, dann braucht aus das HTML nicht 
  // aktualisiert werden
  //
  if(this.html==null)
    return;

  this.html.style.left = this.x+"px";
  this.html.style.top  = this.y+"px";
}

/**
 *
 **/
draw2d.ToolGeneric.prototype.getWidth=function()
{
  return this.width;
}

/**
 *
 **/
draw2d.ToolGeneric.prototype.getHeight=function()
{
  return this.height;
}

/**
 *
 **/
draw2d.ToolGeneric.prototype.getY=function()
{
    return this.y;
}

/**
 *
 **/
draw2d.ToolGeneric.prototype.getX=function()
{
    return this.x;
}

/**
 *
 **/
draw2d.ToolGeneric.prototype.getPosition=function()
{
  return new draw2d.Point(this.x, this.y);
}
