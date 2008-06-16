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
draw2d.Color=function(/*:int*/ red,/*:int*/ green ,/*:int*/ blue)
{
  if(typeof green == "undefined")
  {
    var rgb = this.hex2rgb(red);
    /** @private **/
    this.red= rgb[0];
    /** @private **/
    this.green = rgb[1];
    /** @private **/
    this.blue = rgb[2];
  }
  else
  {
    /** @private **/
    this.red= red;
    /** @private **/
    this.green = green;
    /** @private **/
    this.blue = blue;
  }
}
/** @private **/
draw2d.Color.prototype.type="Color";

/**
 * @private
 **/
draw2d.Color.prototype.getHTMLStyle=function()
{
  return "rgb("+this.red+","+this.green+","+this.blue+")";
}

/**
 * Return the [red] part of the color.
 * @type int
 **/
draw2d.Color.prototype.getRed=function()
{
  return this.red;
}


/**
 * Return the [green] part of the color.
 * @type int
 **/
draw2d.Color.prototype.getGreen=function()
{
  return this.green;
}


/**
 * Return the [blue] part of the color.
 * @type int
 **/
draw2d.Color.prototype.getBlue=function()
{
  return this.blue;
}

/**
 * Returns the ideal Text Color. Usefull for font color selection by a given background color.
 *
 * @returns The <i>ideal</i> inverse color.
 * @type draw2d.Color
 **/
draw2d.Color.prototype.getIdealTextColor=function()
{
   var nThreshold = 105;
   var bgDelta = (this.red * 0.299) + (this.green * 0.587) + (this.blue * 0.114);
   return (255 - bgDelta < nThreshold) ? new  draw2d.Color(0,0,0) : new  draw2d.Color(255,255,255);
}


/**
 * @private
 */
draw2d.Color.prototype.hex2rgb=function(/*:String */hexcolor)
{
  hexcolor = hexcolor.replace("#","");
  return(
         {0:parseInt(hexcolor.substr(0,2),16),
          1:parseInt(hexcolor.substr(2,2),16),
          2:parseInt(hexcolor.substr(4,2),16)}
         );
}

/**
 * @private
 **/
draw2d.Color.prototype.hex=function()
{ 
  return(this.int2hex(this.red)+this.int2hex(this.green)+this.int2hex(this.blue)); 
}

/**
 * @private
 */
draw2d.Color.prototype.int2hex=function(v) 
{
  v=Math.round(Math.min(Math.max(0,v),255));
  return("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
}

/**
 * Returns a darker color of the given one..
 * 
 * @param {float} fraction  Darkness fraction.
 * @return        Darker color.
 * @type draw2d.Color
 */
draw2d.Color.prototype.darker=function(/*:float*/fraction)
{
   var red   = parseInt(Math.round (this.getRed()   * (1.0 - fraction)));
   var green = parseInt(Math.round (this.getGreen() * (1.0 - fraction)));
   var blue  = parseInt(Math.round (this.getBlue()  * (1.0 - fraction)));

   if (red   < 0) red   = 0; else if (red   > 255) red   = 255;
   if (green < 0) green = 0; else if (green > 255) green = 255;
   if (blue  < 0) blue  = 0; else if (blue  > 255) blue  = 255;

   return new draw2d.Color(red, green, blue);
}


/**
 * Make a color lighter.
 * 
 * @param {float} fraction  Darkness fraction.
 * @type draw2d.Color
 * @return          Lighter color.
 */
draw2d.Color.prototype.lighter=function(/*:float*/ fraction)
{
    var red   = parseInt(Math.round (this.getRed()   * (1.0 + fraction)));
    var green = parseInt(Math.round (this.getGreen() * (1.0 + fraction)));
    var blue  = parseInt(Math.round (this.getBlue()  * (1.0 + fraction)));

    if (red   < 0) red   = 0; else if (red   > 255) red   = 255;
    if (green < 0) green = 0; else if (green > 255) green = 255;
    if (blue  < 0) blue  = 0; else if (blue  > 255) blue  = 255;

    return new draw2d.Color(red, green, blue);
}
