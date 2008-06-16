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
 * A simple Connection with a label.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.LabelConnection=function()
{
  draw2d.Connection.call(this);

  // Create any Draw2D figure as decoration for the connection
  //
  var label = new draw2d.Label("Message");

  // set some style
  //
  label.setBackgroundColor(new draw2d.Color(230,230,250));
  label.setBorder(new draw2d.LineBorder(1));

  // add the new decoration to the connection
  //
  this.addFigure(label, new draw2d.ManhattenMidpointLocator(this));
}


draw2d.LabelConnection.prototype = new draw2d.Connection;

