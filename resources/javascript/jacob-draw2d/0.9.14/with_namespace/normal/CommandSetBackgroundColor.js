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
draw2d.CommandSetBackgroundColor=function(/*:draw2d.Figure*/ figure,/*:draw2d.Color*/ color)
{
   draw2d.Command.call(this,"set background color");
   this.figure   = figure;
   this.newColor = color;
   this.oldColor = figure.getBackgroundColor();
}

draw2d.CommandSetBackgroundColor.prototype = new draw2d.Command;
/** @private **/
draw2d.CommandSetBackgroundColor.prototype.type="CommandSetBackgroundColor";

/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandSetBackgroundColor.prototype.execute=function()
{
   this.redo();
}

/**
 * Undo the command
 *
 **/
draw2d.CommandSetBackgroundColor.prototype.undo=function()
{
   this.figure.setBackgroundColor(this.oldColor);
}

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandSetBackgroundColor.prototype.redo=function()
{
   this.figure.setBackgroundColor(this.newColor);
}
