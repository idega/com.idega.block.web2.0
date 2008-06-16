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

draw2d.VectorPalette=function()
{
  draw2d.ToolPalette.call(this, "Tools");

  this.tool1 = new draw2d.ToolLine(this);
  this.tool2 = new draw2d.ToolRectangle(this);
  this.tool3 = new draw2d.ToolRectangleUnfilled(this);
  this.tool4 = new draw2d.ToolOval(this);
  this.tool5 = new draw2d.ToolOvalUnfilled(this);
  this.tool6 = new draw2d.ToolCircle(this);
  this.tool7 = new draw2d.ToolCircleUnfilled(this);

  this.tool1.setPosition(10,30);

  this.tool2.setPosition(10,60);
  this.tool3.setPosition(40,60);

  this.tool4.setPosition(10,90);
  this.tool5.setPosition(40,90);

  this.tool6.setPosition(10,120);
  this.tool7.setPosition(40,120);


  this.addChild(this.tool1);
  this.addChild(this.tool2);
  this.addChild(this.tool3);
  this.addChild(this.tool4);
  this.addChild(this.tool5);
  this.addChild(this.tool6);
  this.addChild(this.tool7);

  // undo / redo support
  //
  this.undoTool = new draw2d.ToolUndo(this);
  this.undoTool.setPosition(10,170);
  this.undoTool.setEnabled(false);
  this.addChild(this.undoTool);


  this.redoTool = new draw2d.ToolRedo(this);
  this.redoTool.setPosition(40,170);
  this.redoTool.setEnabled(false);
  this.addChild(this.redoTool);
}

draw2d.VectorPalette.prototype = new draw2d.ToolPalette;
/** @private */
draw2d.VectorPalette.prototype.type="VectorPalette";


draw2d.VectorPalette.prototype.onSetDocumentDirty=function()
{
  this.undoTool.setEnabled(this.workflow.getCommandStack().canUndo());
  this.redoTool.setEnabled(this.workflow.getCommandStack().canRedo());
}
