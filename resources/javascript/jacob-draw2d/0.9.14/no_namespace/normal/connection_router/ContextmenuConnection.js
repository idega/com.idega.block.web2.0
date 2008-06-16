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
ContextmenuConnection=function()
{
  Connection.call(this);
  this.sourcePort = null;
  this.targetPort = null;
  this.lineSegments = new Array();
  this.setColor(new  Color(128,128,255));
  this.setLineWidth(1);
}
ContextmenuConnection.prototype = new Connection();


/**
 * Callback method for the double click event of user interaction.
 **/
ContextmenuConnection.prototype.getContextMenu=function()
{
  var menu =new Menu();
  var oThis = this;

  menu.appendMenuItem(new MenuItem("NULL Router", null,function(){oThis.setRouter(null);}));
  menu.appendMenuItem(new MenuItem("Manhatten Router", null,function(){
               oThis.setRouter(new ManhattanConnectionRouter());
  }));
  menu.appendMenuItem(new MenuItem("Bezier Router", null,function(){oThis.setRouter(new BezierConnectionRouter());}));
  menu.appendMenuItem(new MenuItem("Fan Router", null,function(){oThis.setRouter(new FanConnectionRouter());}));

  return menu;
}