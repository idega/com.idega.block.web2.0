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
 * Copy&Paste implementation of a Connection.
 * TODO: Change the standard "Connection" class to avoid stupid Copy&Paste
 *       e.g. Add method to set the visible representation of an connection.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.ContextmenuConnection=function()
{
  draw2d.Connection.call(this);
  this.sourcePort = null;
  this.targetPort = null;
  this.lineSegments = new Array();
  this.setColor(new  draw2d.Color(0,0,115));
  this.setLineWidth(2);
}
draw2d.ContextmenuConnection.prototype = new draw2d.Connection();

/**
 * Callback method for the double click event of user interaction.
 **/
draw2d.ContextmenuConnection.prototype.getContextMenu=function()
{
  var menu =new draw2d.Menu();
  var oThis = this;

  menu.appendMenuItem(new draw2d.MenuItem("Blue", null,function(){oThis.setColor(new  draw2d.Color(0,0,255));}));
  menu.appendMenuItem(new draw2d.MenuItem("Green", null,function(){oThis.setColor(new  draw2d.Color(0,255,0));}));
  menu.appendMenuItem(new draw2d.MenuItem("Silver", null,function(){oThis.setColor(new  draw2d.Color(128,128,128));}));
  menu.appendMenuItem(new draw2d.MenuItem("Black", null,function(){oThis.setColor(new  draw2d.Color(0,0,0));}));

  return menu;
}