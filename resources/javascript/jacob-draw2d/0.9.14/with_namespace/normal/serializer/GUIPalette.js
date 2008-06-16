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

draw2d.GUIPalette=function()
{
  draw2d.ToolPalette.call(this, "Tools");

  this.tool1 = new draw2d.ToolGroup(this);
  this.tool2 = new draw2d.ToolInputBox(this);
  this.tool3 = new draw2d.ToolCheckBox(this);

  this.tool4 = new draw2d.ToolSave(this);

  this.tool1.setPosition(10,30);
  this.tool2.setPosition(10,70);
  this.tool3.setPosition(10,110);

  this.tool4.setPosition(10,180);

  this.addChild(this.tool1);
  this.addChild(this.tool2);
  this.addChild(this.tool3);
  this.addChild(this.tool4);
}

draw2d.GUIPalette.prototype = new draw2d.ToolPalette;


draw2d.GUIPalette.prototype.dispose=function()
{
  draw2d.ToolPalette.prototype.dispose.call(this);
  this.tool1.dispose();
  this.tool2.dispose();
  this.tool3.dispose();
  this.tool4.dispose();
}

draw2d.GUIPalette.prototype.addChildren=function(item /*: HTMLElement*/)
{
}
