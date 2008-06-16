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
draw2d.ImageFigure=function(/*:String*/url)
{
  /** @private **/
  this.url = url;
  draw2d.Node.call(this);
  this.setDimension(40,40);
}

draw2d.ImageFigure.prototype = new  draw2d.Node;
/** @private **/
draw2d.ImageFigure.prototype.type="Image";

/**
 * @private
 **/
draw2d.ImageFigure.prototype.createHTMLElement=function()
{
    var item = draw2d.Node.prototype.createHTMLElement.call(this);
    item.style.width=this.width+"px";
    item.style.height=this.height+"px";
    item.style.margin="0px";
    item.style.padding="0px";
    item.style.border="0px";
    if(this.url!=null)
      item.style.backgroundImage="url("+this.url+")";
    else
      item.style.backgroundImage="";
    return item;
}

/**
 * A image can't change the color. Do nothing
 * @private
 **/
draw2d.ImageFigure.prototype.setColor= function(/*:draw2d.Color*/ color)
{
 // do nothing
}

/**
 * An image can't be resized. So - this function returns always false, 
 *
 * @return Returns always false.
 * @type boolean
 **/
draw2d.ImageFigure.prototype.isResizeable=function()
{
  return false;
}

/**
 * Set URL of the image. This can be absolute like http://www.anydomain.de/myimage.gif or relative
 * to the current server. directory
 *
 * @param {String} url The url of the image.
 **/
draw2d.ImageFigure.prototype.setImage=function(/*:String*/ url)
{
  this.url = url;
  if(this.url!=null)
    this.html.style.backgroundImage="url("+this.url+")";
  else
    this.html.style.backgroundImage="";
}