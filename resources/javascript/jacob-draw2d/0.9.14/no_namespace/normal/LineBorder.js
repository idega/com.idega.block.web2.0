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
LineBorder=function(/*:int*/ width)
{
  Border.call(this);

  /** @private **/
  this.width =1;

  if(width)
   this.width = width;

  /** @private **/
  this.figure=null;
}
LineBorder.prototype = new Border;
/** @private **/
LineBorder.prototype.type="LineBorder";

/**
 * @private
 **/
LineBorder.prototype.dispose=function()
{
  Border.prototype.dispose.call(this);
  this.figure=null;
}

/**
 * @param {int} w The new line stroke width of the border.
 **/
LineBorder.prototype.setLineWidth=function(/*:int*/ w)
{
  this.width=w;
  if(this.figure!=null)
    this.figure.html.style.border=this.getHTMLStyle();
}

/**
 * @private
 * @returns String
 **/
LineBorder.prototype.getHTMLStyle=function()
{
  if(this.getColor()!=null)
    return this.width+"px solid "+this.getColor().getHTMLStyle();

  return this.width+"px solid black";
}

/**
 * @private
 **/
LineBorder.prototype.refresh=function()
{
  // update the HTML vom Vaterelement
  this.setLineWidth(this.width);
}