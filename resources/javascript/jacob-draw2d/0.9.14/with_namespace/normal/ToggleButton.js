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
draw2d.ToggleButton=function(/*:draw2d.PaletteWindow*/ palette )
{
  draw2d.Button.call(this,palette);
  /** @private **/
  this.isDownFlag=false; /*:boolean*/
}

draw2d.ToggleButton.prototype = new draw2d.Button;
/** @private **/
draw2d.ToggleButton.prototype.type="ToggleButton";


/**
 * @private
 **/
draw2d.ToggleButton.prototype.createHTMLElement=function()
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
    this.omousedown=function(event)
    {
       if(oThis.enabled)
       {
          if(!oThis.isDown())
          {
            // Call the super method!!!!
            draw2d.Button.prototype.setActive.call(oThis,true);
          }
       }
       event.cancelBubble = true;
       event.returnValue = false;
    }
    this.omouseup=function(event)
    {
       if(oThis.enabled)
       {
          // Call the super method!!!!
          if(oThis.isDown())
            draw2d.Button.prototype.setActive.call(oThis,false);

          oThis.isDownFlag = !oThis.isDownFlag;
          oThis.execute();
       }
       event.cancelBubble = true;
       event.returnValue = false;
    }

    if (item.addEventListener)
    {
      item.addEventListener("mousedown", this.omousedown, false);
      item.addEventListener("mouseup", this.omouseup, false);
    }
    else if (item.attachEvent)
    {
      item.attachEvent("onmousedown", this.omousedown);
      item.attachEvent("onmouseup", this.omouseup);
    }

    return item;
}

draw2d.ToggleButton.prototype.isDown=function()
{
  return this.isDownFlag;
}

/**
 * @private
 **/
draw2d.ToggleButton.prototype.setActive=function( /*:boolean*/ flag)
{
  draw2d.Button.prototype.setActive.call(this,flag);
  this.isDownFlag=flag;
}


/**
 *
 **/
draw2d.ToggleButton.prototype.execute=function()
{
}