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
draw2d.Workflow=function(/*:String*/id)
{
   if(!id)
     return;
   /** @private */
   this.gridWidthX = 10; /*:int*/
   /** @private */
   this.gridWidthY = 10; /*:int*/

   /** @private */
   this.snapToGridHelper = null;

   /** @private */
   this.verticalSnapToHelperLine = null; /*:draw2d.Line*/

   /** @private */
   this.horizontalSnapToHelperLine = null; /*:draw2d.Line*/

   // Ein Workflow enthält Elemente
   //
   /** @private */
   this.figures     = new draw2d.ArrayList();
   /** @private */
   this.lines       = new draw2d.ArrayList();
   /** @private */
   this.commonPorts = new draw2d.ArrayList();
   /** @private */
   this.dropTargets = new draw2d.ArrayList();
   /** @private */
   this.compartments = new draw2d.ArrayList(); // objects which can manage children
   /** @private */
   this.selectionListeners = new draw2d.ArrayList();
   /** @private */
   this.dialogs = new draw2d.ArrayList();

   /** @private */
   this.toolPalette = null;
   /** @private */
   this.dragging = false;

   this.tooltip = null;

   /** @private */
   this.draggingLine = null; // line which will be moved via drag&drop

   /** @private **/
   this.commandStack = new draw2d.CommandStack();

   /** @private */
   this.oldScrollPosLeft = 0;
   this.oldScrollPosTop  = 0;

   /** @private */
   this.currentSelection = null;            // primary selection
 
   /** @private */
   this.currentMenu = null; /*:Menu*/

   /** @private */
   this.connectionLine    = new draw2d.Line();
   /** @private */
   this.resizeHandleStart = new draw2d.LineStartResizeHandle(this); // 
   /** @private */
   this.resizeHandleEnd   = new draw2d.LineEndResizeHandle(this);

   /** @private */
   this.resizeHandle1 = new draw2d.ResizeHandle(this,1); // 1 = LEFT TOP
   /** @private */
   this.resizeHandle2 = new draw2d.ResizeHandle(this,2); // 2 = CENTER_TOP
   /** @private */
   this.resizeHandle3 = new draw2d.ResizeHandle(this,3); // 3 = RIGHT_TOP
   /** @private */
   this.resizeHandle4 = new draw2d.ResizeHandle(this,4); // 4 = RIGHT_MIDDLE
   /** @private */
   this.resizeHandle5 = new draw2d.ResizeHandle(this,5); // 5 = RIGHT_BOTTOM
   /** @private */
   this.resizeHandle6 = new draw2d.ResizeHandle(this,6); // 6 = CENTER_BOTTOM
   /** @private */
   this.resizeHandle7 = new draw2d.ResizeHandle(this,7); // 7 = LEFT_BOTTOM
   /** @private */
   this.resizeHandle8 = new draw2d.ResizeHandle(this,8); // 8 = LEFT_MIDDLE

   this.resizeHandleHalfWidth = parseInt(this.resizeHandle2.getWidth()/2);

   draw2d.Canvas.call(this,id);

   /** @private */
   this.setPanning(false); // flag for the panning feature of the workflow canvas

  if(this.html!=null)
  {
    this.html.style.backgroundImage="url(grid_10.png)";
 
    /*
     * Determine which method to use to add the event handler.
     */
    oThis = this;
    // Firefox seems to need to have the tabindex="0" property set to some value 
    // so it knows this Div or Span is keyboard selectable. That allows the keyboard 
    // event to be triggered. It is not so dumb - you might want to trap Delete or 
    // Insert keys on a table etc. 
    this.html.tabIndex="0";
    var contextMenu = function ()
    {
      var oEvent = arguments[0] || window.event;
      var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
      var diffY = oEvent.clientY;// - oThis.html.offsetTop;
      var scrollLeft = oThis.getScrollLeft();
      var scrollTop  = oThis.getScrollTop();
      var xOffset = oThis.getAbsoluteX();
      var yOffset = oThis.getAbsoluteY();
      if(oThis.getBestFigure(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset)!=null)
         return;

      var line = oThis.getBestLine(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset,null);
      if(line!=null)
         line.onContextMenu(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset);
      else
         oThis.onContextMenu(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset);
    };
    this.html.oncontextmenu=function(){return false;};
    var oThis = this;
    var keyDown=function(event)
    {
      var ctrl = event.ctrlKey;
      oThis.onKeyDown(event.keyCode, ctrl);
    }
    var mouseDown = function()
    {
      var oEvent = arguments[0] || window.event;
      var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
      var diffY = oEvent.clientY;// - oThis.html.offsetTop;
      var scrollLeft = oThis.getScrollLeft();
      var scrollTop  = oThis.getScrollTop();
      var xOffset = oThis.getAbsoluteX();
      var yOffset = oThis.getAbsoluteY();
      oThis.onMouseDown(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset);
    }
    var mouseUp = function()
    {
      var oEvent = arguments[0] || window.event;
      if(oThis.currentMenu!=null)
      {
         oThis.removeFigure(oThis.currentMenu);
         oThis.currentMenu=null;
      }
      if(oEvent.button==2)
         return;
      var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
      var diffY = oEvent.clientY;// - oThis.html.offsetTop;
      var scrollLeft = oThis.getScrollLeft();
      var scrollTop  = oThis.getScrollTop();
      var xOffset = oThis.getAbsoluteX();
      var yOffset = oThis.getAbsoluteY();
      oThis.onMouseUp(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset);
    }
    var mouseMove = function()
    {
      var oEvent = arguments[0] || window.event;
      var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
      var diffY = oEvent.clientY;// - oThis.html.offsetTop;
      var scrollLeft = oThis.getScrollLeft();
      var scrollTop  = oThis.getScrollTop();
      var xOffset = oThis.getAbsoluteX();
      var yOffset = oThis.getAbsoluteY();
      oThis.currentMouseX = diffX+scrollLeft-xOffset;
      oThis.currentMouseY = diffY+scrollTop-yOffset;
      var obj = oThis.getBestFigure(oThis.currentMouseX, oThis.currentMouseY)
      // Note: The event will be handle by "obj" if obj!=null
      //       Don't add additional checks for this case.
      if(draw2d.Drag.currentHover!=null && obj==null)
      {
          var oDropEvent = new draw2d.DragDropEvent();
          oDropEvent.initDragDropEvent("mouseleave", false, oThis);
          draw2d.Drag.currentHover.dispatchEvent(oDropEvent);
      }
      else
      {
         var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
         var diffY = oEvent.clientY;// - oThis.html.offsetTop;
         var scrollLeft = oThis.getScrollLeft();
         var scrollTop  = oThis.getScrollTop();
         var xOffset = oThis.getAbsoluteX();
         var yOffset = oThis.getAbsoluteY();
         oThis.onMouseMove(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset);
      }
      if(obj==null)
	draw2d.Drag.currentHover = null;
 
      // Tooltip handling
      //
      if(oThis.tooltip!=null)
      {
        if(Math.abs(oThis.currentTooltipX-oThis.currentMouseX)>10 ||Math.abs(oThis.currentTooltipY-oThis.currentMouseY)>10)
        {
           oThis.showTooltip(null);
        }
      }
    }

    var tmpDoubleClick = function (oEvent)
    {
      var oEvent = arguments[0] || window.event;
      var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
      var diffY = oEvent.clientY;// - oThis.html.offsetTop;
      var scrollLeft = oThis.getScrollLeft();
      var scrollTop  = oThis.getScrollTop();
      var xOffset = oThis.getAbsoluteX();
      var yOffset = oThis.getAbsoluteY();
      var line = oThis.getBestLine(diffX+scrollLeft-xOffset, diffY+scrollTop-yOffset,null);
      if(line!=null)
         line.onDoubleClick();
    }

    if (this.html.addEventListener) 
    {
        this.html.addEventListener("contextmenu", contextMenu, false);
        this.html.addEventListener("mousemove", mouseMove, false);
        this.html.addEventListener("mouseup", mouseUp, false);
        this.html.addEventListener("mousedown", mouseDown, false);
        this.html.addEventListener("keydown", keyDown, false);
        this.html.addEventListener("dblclick",tmpDoubleClick,false );
    } 
    else if (this.html.attachEvent) 
    {
        this.html.attachEvent("oncontextmenu", contextMenu);
        this.html.attachEvent("onmousemove", mouseMove);
        this.html.attachEvent("onmousedown", mouseDown);
        this.html.attachEvent("onmouseup", mouseUp);
        this.html.attachEvent("onkeydown", keyDown);
        this.html.attachEvent("ondblclick", tmpDoubleClick);
    } 
    else 
    {
        throw new Error("Open-jACOB Draw2D not supported in this browser.");
    }
  }
}


// Workflow leitet von Canvas ab
//
draw2d.Workflow.prototype = new draw2d.Canvas;
/** @private **/
draw2d.Workflow.prototype.type="Workflow";

/** @private **/
draw2d.Workflow.COLOR_GREEN = new  draw2d.Color(0,255,0);

/**
 * This method will be called from the framework of the document has been scrolled.
 * The canvas/workflow adjust the dialog/window element which has been a fixed position.
 *
 * @final
 * @private
 **/
draw2d.Workflow.prototype.onScroll=function()
{
  var scrollLeft = this.getScrollLeft();
  var scrollTop  = this.getScrollTop();

  var diffLeft =   scrollLeft - this.oldScrollPosLeft;
  var diffTop  =   scrollTop - this.oldScrollPosTop;

  for(var i=0;i< this.figures.getSize();i++)
  {
    var figure = this.figures.get(i);
    if(figure.hasFixedPosition && figure.hasFixedPosition()==true)
      figure.setPosition(figure.getX()+diffLeft, figure.getY()+diffTop);
  }

  this.oldScrollPosLeft= scrollLeft;
  this.oldScrollPosTop = scrollTop;
}

draw2d.Workflow.prototype.setPanning=function(/*:boolean*/flag)
{
  this.panning= flag;
  if(flag)
    this.html.style.cursor="move";
  else
    this.html.style.cursor="default";
}

/**
 * You can scroll the view to a well defined position.
 *
 * @param {int} x the new X scroll position
 * @param {int} y the Y scroll position
**/
draw2d.Workflow.prototype.scrollTo=function(/*:int*/ x, /*:int*/y, /*:boolean*/ fast)
{
  if(fast)
  {
   this.scrollArea.scrollLeft= x;
   this.scrollArea.scrollTop = y;
  }
  else
  {
   var steps= 40;
   var xStep = (x-this.getScrollLeft())/steps;
   var yStep = (y-this.getScrollTop())/steps;

   var oldX = this.getScrollLeft();
   var oldY = this.getScrollTop();
   for(var i=0;i<steps;i++)
   {
      this.scrollArea.scrollLeft= oldX + (xStep*i);
      this.scrollArea.scrollTop = oldY + (yStep*i);
   }
  }
}



/**
 *
 * @param {draw2d.Figure} tooltip The tooltip to show
 * @param {boolean} autoHide Indicate if the tooltip should be removed after a timeout period..
 **/
draw2d.Workflow.prototype.showTooltip=function(/*:draw2d.Figure*/ tooltip, /*:boolean*/ autoHide)
{
  if(this.tooltip!=null)
  {
     this.removeFigure(this.tooltip);
     this.tooltip = null;
     if(this.tooltipTimer>=0)
     {
       window.clearTimeout(this.tooltipTimer);
       this.tooltipTimer=-1;
     }
  }
  this.tooltip = tooltip;
  if(this.tooltip!=null)
  {
     this.currentTooltipX = this.currentMouseX;
     this.currentTooltipY = this.currentMouseY;
     this.addFigure(this.tooltip,this.currentTooltipX+10 , this.currentTooltipY+10);
     var oThis = this;
     var cancelTooltipByTimer = function(){oThis.tooltipTimer=-1;oThis.showTooltip(null);};
     if(autoHide==true)
     {
         this.tooltipTimer = window.setTimeout(cancelTooltipByTimer, 5000);
     }
  }
}


/**
 *
 * @param {draw2d.Dialog} dialog The dialog to show.
 * @param {int} x The x position.
 * @param {int} y The y position.
 **/
draw2d.Workflow.prototype.showDialog=function(/*:draw2d.Dialog*/dialog ,/*:int*/ xPos ,/*:int*/ yPos)
{
  if(xPos)
    this.addFigure(dialog,xPos, yPos);
  else
    this.addFigure(dialog,200, 100);

  this.dialogs.add(dialog);
}

/**
 * @param {draw2d.Menu} menu The menu to show.
 * @param {int} x The x position.
 * @param {int} y The y position.
 * @private
 **/
draw2d.Workflow.prototype.showMenu=function(/*:draw2d.Menu*/menu ,/*:int*/ xPos ,/*:int*/ yPos)
{
 if(this.menu!=null)
 {
   this.html.removeChild(this.menu.getHTMLElement());
   this.menu.setWorkflow();
 }

 this.menu =menu;
 if(this.menu!=null)
 {
   this.menu.setWorkflow(this);
   this.menu.setPosition(xPos,yPos);

   this.html.appendChild(this.menu.getHTMLElement());
   this.menu.paint();
  }
}

/**
 * Callback method for the context menu interaction.
 * Don't override this method! Implement getContextMenu instead.
 *
 * @see #getContextMenu
 * @private
 * @final
 * @param {int} x The absolute x coordinate of the right mouse button click
 * @param {int} y The absolute y coordinate of the right mouse button click
 **/
draw2d.Workflow.prototype.onContextMenu=function(/*:int*/ x, /*:int*/y)
{
    var menu = this.getContextMenu();
    if(menu!=null)
      this.showMenu(menu,x,y);
}

/**
 * @returns null or the Menu object for this figure.
 * @type draw2d.Menu
 **/
draw2d.Workflow.prototype.getContextMenu=function()
{
   return null;
}

/**
 * Set the tool window of this Canvas. At the moment a workflow instance can only handle one tool window instance.
 * @param {draw2d.Window} toolWindow The tool window of the canvas
 **/
draw2d.Workflow.prototype.setToolWindow=function(/*:draw2d.Window*/ toolWindow, /*:int*/x, /*:int*/y)
{
  this.toolPalette = toolWindow;

  if(y)
   this.addFigure(toolWindow,x,y);
  else
   this.addFigure(toolWindow,20,20);

  this.dialogs.add(toolWindow);
}

/**
 * Enable/disable the snap to grid behaviour of the canvas. All figures will snap to the grid during the
 * the drap and drop operation.
 * 
 * @param {boolean} <b>true</b> if you want snap to the grid.
 **/
draw2d.Workflow.prototype.setSnapToGrid=function(/*:boolean*/ flag)
{
  if(flag)
   this.snapToGridHelper = new draw2d.SnapToGrid(this);
  else
   this.snapToGridHelper = null;
}

/**
 * Used to perform snapping to existing elements. Snapping is based on the existing children of a container. 
 * When snapping a rectangle, the edges of the rectangle will snap to edges of other rectangles generated from 
 * the children of the given container/canvas. Similarly, the centers and middles of rectangles will snap to each other.
 *
 * @param {boolean} <b>true</b> if you want snap to the geometry.
 */
draw2d.Workflow.prototype.setSnapToGeometry=function(/*:boolean*/ flag)
{
  if(flag)
   this.snapToGeometryHelper = new draw2d.SnapToGeometry(this);
  else
   this.snapToGeometryHelper = null;
}


/**
 * Set the grid width of the canvas.
 * 
 * @param {int} dx The width of the grid.
 * @param {int} dy The height of the grid.
 **/
draw2d.Workflow.prototype.setGridWidth=function(/*:int*/ dx,/*:int*/ dy)
{
   this.gridWidthX = dx;
   this.gridWidthY = dy;
}

/**
 * Add a figure at the hands over x/y position.
 *
 * @param {draw2d.Figure} figure The figure to add.
 * @param {int} x The x position.
 * @param {int} y The y position.
 **/
draw2d.Workflow.prototype.addFigure=function(/*:draw2d.Figure*/ figure ,/*:int*/ xPos, /*:int*/ yPos)
{
  draw2d.Canvas.prototype.addFigure.call(this,figure,xPos,yPos,true);
  figure.setWorkflow(this);

  var oThisWorkflow = this;

  // Compartments must be stored in an additional structure
  //
  if(figure instanceof draw2d.CompartmentFigure)
  {
    this.compartments.add(figure);
  }

  if(figure instanceof draw2d.Line)
  {
    this.lines.add(figure);
  }
  else
  {
    this.figures.add(figure);
    figure.draggable.addEventListener("dragend", function (oEvent)
    {
//      var figure = oThisWorkflow.figures[oEvent.target.element.id];
    });
    figure.draggable.addEventListener("dragstart", function (oEvent)
    {
      var figure = oThisWorkflow.getFigure(oEvent.target.element.id);
      if(figure==null)
        return;

      if(figure.isSelectable()==false)
        return;

      oThisWorkflow.showResizeHandles(figure);
      oThisWorkflow.setCurrentSelection(figure);
    });
    figure.draggable.addEventListener("drag", function (oEvent)
    {
      var figure = oThisWorkflow.getFigure(oEvent.target.element.id);
      if(figure == null)
        return;
      if(figure.isSelectable()==false)
        return;

      oThisWorkflow.moveResizeHandles(figure);
    });

  }
  figure.paint();
  this.setDocumentDirty();

}

/**
 * Remove a figure from the Canvas.
 *
 * @param {draw2d.Figure} figure The figure to remove
 *
 **/
draw2d.Workflow.prototype.removeFigure = function(/*:draw2d.Figure*/ figure)
{
    draw2d.Canvas.prototype.removeFigure.call(this, figure);

    this.figures.remove(figure);
    this.lines.remove(figure);
    this.dialogs.remove(figure);

    figure.setWorkflow(null);

    if(figure instanceof draw2d.CompartmentFigure)
       this.compartments.remove(figure);

    if(figure instanceof draw2d.Connection)
       figure.disconnect();

    if(this.currentSelection == figure)
      this.setCurrentSelection(null);

    this.setDocumentDirty();
}

/**
 * Move the hands over figure in front of a other figures.
 *
 * @param {draw2d.Figure} figure The figure to bring on top.
 **/
draw2d.Workflow.prototype.moveFront = function(/*:draw2d.Figure*/ figure)
{
  this.html.removeChild(figure.getHTMLElement());
  this.html.appendChild(figure.getHTMLElement());
}

/**
 * Move the hands over figure back.
 *
 * @param {draw2d.Figure} figure The figure to bring back.
 **/
draw2d.Workflow.prototype.moveBack = function(/*:draw2d.Figure*/ figure)
{
  this.html.removeChild(figure.getHTMLElement());
  this.html.insertBefore(figure.getHTMLElement(), this.html.firstChild);
}

/**
 * Retruns the best comparment figure at the location [x,y].
 *
 * @param {int} x The x position.
 * @param {int} y The y position.
 * @param {draw2d.Figure} figureToIgnore The figure which should be ignored.
 **/
draw2d.Workflow.prototype.getBestCompartmentFigure=function(/*:int*/ x, /*:int*/ y, /*:draw2d.Figure*/ figureToIgnore)
{
  var result = null;
  for(var i=0;i<this.figures.getSize();i++)
  {
    var figure = this.figures.get(i);
    if((figure instanceof draw2d.CompartmentFigure) && figure.isOver(x,y)==true && figure!=figureToIgnore)
    {
        if(result==null)
           result = figure;
        else if(result.getZOrder() < figure.getZOrder())
           result = figure;
    }
  }
  return result;
}

/**
 * @private
 * @type draw2d.Figure
 **/
draw2d.Workflow.prototype.getBestFigure=function(/*:int*/ x, /*:int*/ y, /*:draw2d.Figure*/ figureToIgnore)
{
  var result = null;
  for(var i=0;i <this.figures.getSize();i++)
  {
    var figure = this.figures.get(i);
    if(figure.isOver(x,y)==true && figure!=figureToIgnore)
    {
        if(result==null)
           result = figure;
        else if(result.getZOrder() < figure.getZOrder())
           result = figure;
    }
  }
  return result;
}

/**
 * @private
 * @type draw2d.Line
 **/
draw2d.Workflow.prototype.getBestLine=function(/*:int*/ x, /*:int*/ y, /*:draw2d.Line*/ lineToIgnore)
{
  var result = null;
  for(var i=0;i< this.lines.getSize();i++)
  {
    var line = this.lines.get(i);
    if(line.containsPoint(x,y)==true && line!=lineToIgnore)
    {
        if(result==null)
           result = line;
        else if(result.getZOrder() < line.getZOrder())
           result = line;
    }
  }
  return result;
}

/**
 * Returns the figure with the given id. Use <b>workflow.getDocument().getFigure(..)</b> for the
 * public access.<br>
 *
 * @param {String} id The id of the figure.
 * @type draw2d.Figure
 * @private
 **/
draw2d.Workflow.prototype.getFigure=function(/*:String*/ id)
{
  for(var i=0; i<this.figures.getSize();i++)
  {
     var figure = this.figures.get(i);
     if(figure.id==id)
        return figure;
  }
  return null;;
}


/**
 * @private
 **/
draw2d.Workflow.prototype.getFigures=function()
{
  return this.figures;
}

/**
 * Returns the document of the canvas.
 *
 * @type draw2d.Document
 **/
draw2d.Workflow.prototype.getDocument=function()
{
  return new draw2d.Document(this);
}

/**
 * @see draw2d.Window#onSelectionChanged
 * @param {draw2d.Window} w The window which will be notified if an object has been selected
 **/
draw2d.Workflow.prototype.addSelectionListener=function(/*:draw2d.Window*/ w)
{
  this.selectionListeners.add(w);
}

/**
 * @see draw2d.Window#onSelectionChanged
 * @param {Window} w The window which will be removed from the slection eventing
 **/
draw2d.Workflow.prototype.removeSelectionListener=function(/*:draw2d.Window*/ w )
{
  this.selectionListeners.remove(w);
}

/**
 * Set the current selected figure in the workflow Canvas.
 *
 * @param {draw2d.Figure} figure The new selection.
 **/
draw2d.Workflow.prototype.setCurrentSelection=function(/*:draw2d.Figure*/ figure )
{
  if(figure==null)
  {
    this.hideResizeHandles();
    this.hideLineResizeHandles();
  }

  this.currentSelection = figure;

  // Testen ob eine Linie getroffen wurde
  //
  for(var i=0;i < this.selectionListeners.getSize();i++)
  {
    var w = this.selectionListeners.get(i);
    if(w!=null && w.onSelectionChanged)
      w.onSelectionChanged(this.currentSelection);
  }
}

/**
 * Returns the current selected figure in the Canvas.
 *
 * @param {draw2d.Figure} figure The new selection.
 **/
draw2d.Workflow.prototype.getCurrentSelection=function()
{
  return this.currentSelection;
}

/**
 * @type ArrayList
 **/
draw2d.Workflow.prototype.getLines=function()
{
  return this.lines;
}

/**
 * @param {draw2d.Port} port The new port which has beend added to the workflow Canvas.
 * @private
 **/
draw2d.Workflow.prototype.registerPort = function(/*:draw2d.Port*/ port )
{
  // All elements have the same drop targets.
  //
  port.draggable.targets= this.dropTargets;

  this.commonPorts.add(port);
  this.dropTargets.add(port.dropable);
}

/**
 * @param {draw2d.Port} p The port which has been removed from the workflow Canvas.
 * @private
 **/
draw2d.Workflow.prototype.unregisterPort = function(/*:draw2d.Port*/ port )
{
  port.draggable.targets=null;

  this.commonPorts.remove(port);
  this.dropTargets.remove(port.dropable);
}
/**
 * Returns the command stack for the Canvas. Required for undo/redo  support.
 *
 * @type draw2d.CommandStack
 **/
draw2d.Workflow.prototype.getCommandStack = function()
{
  return this.commandStack;
}

/**
 * @private
 **/
draw2d.Workflow.prototype.showConnectionLine=function(/*:int*/ x1  ,/*:int*/ y1 ,/*:int*/ x2,/*:int*/ y2 )
{
  this.connectionLine.setStartPoint(x1,y1);
  this.connectionLine.setEndPoint(x2,y2);
  if(this.connectionLine.canvas==null)
    draw2d.Canvas.prototype.addFigure.call(this,this.connectionLine);
}

/**
 * @private
 **/
draw2d.Workflow.prototype.hideConnectionLine=function()
{
  if(this.connectionLine.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.connectionLine);
}

/**
 * @param {draw2d.Line} line The line for the resize handles.
 * @private
 **/
draw2d.Workflow.prototype.showLineResizeHandles=function(/*:draw2d.Line*/ figure )
{
  var resizeWidthHalf = this.resizeHandleStart.getWidth()/2;
  var resizeHeightHalf= this.resizeHandleStart.getHeight()/2;
  var startPoint = figure.getStartPoint();
  var endPoint   = figure.getEndPoint();
  draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandleStart,startPoint.x-resizeWidthHalf,startPoint.y-resizeWidthHalf);
  draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandleEnd,endPoint.x-resizeWidthHalf,endPoint.y-resizeWidthHalf);
  this.resizeHandleStart.setCanDrag(figure.isResizeable());
  this.resizeHandleEnd.setCanDrag(figure.isResizeable());
  if(figure.isResizeable())
  {
    this.resizeHandleStart.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
    this.resizeHandleEnd.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
    // required for reconnect of connections
   this.resizeHandleStart.draggable.targets= this.dropTargets;
   this.resizeHandleEnd.draggable.targets= this.dropTargets;

  }
  else
  {
    this.resizeHandleStart.setBackgroundColor(null);
    this.resizeHandleEnd.setBackgroundColor(null);
  }
}

/**
 * @private
 **/
draw2d.Workflow.prototype.hideLineResizeHandles=function()
{
  if(this.resizeHandleStart.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandleStart);
  if(this.resizeHandleEnd.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandleEnd);
}

/**
 * @private
 **/
draw2d.Workflow.prototype.showResizeHandles=function(/*:draw2d.Figure*/ figure)
{
  this.hideLineResizeHandles();
  this.hideResizeHandles();

  // We must reset the alpha blending of the resizeHandles if the last selected object != figure
  // Reason: We would fadeIn the ResizeHandles at the new selected object but the fast toggle from oldSeleciton => newSelection
  //         doesn't reset the alpha to 0.0. So, we do it manually.
  //
  if(this.getEnableSmoothFigureHandling()==true && this.getCurrentSelection()!=figure)
  {
     this.resizeHandle1.setAlpha(0.01);
     this.resizeHandle2.setAlpha(0.01);
     this.resizeHandle3.setAlpha(0.01);
     this.resizeHandle4.setAlpha(0.01);
     this.resizeHandle5.setAlpha(0.01);
     this.resizeHandle6.setAlpha(0.01);
     this.resizeHandle7.setAlpha(0.01);
     this.resizeHandle8.setAlpha(0.01);
  }

  var resizeWidth = this.resizeHandle1.getWidth();
  var resizeHeight= this.resizeHandle1.getHeight();
  var objHeight   = figure.getHeight();
  var objWidth    = figure.getWidth();
  var xPos = figure.getX();
  var yPos = figure.getY();
  draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle1,xPos-resizeWidth,yPos-resizeHeight);
  draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle3,xPos+objWidth,yPos-resizeHeight);
  draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle5,xPos+objWidth,yPos+objHeight);
  draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle7,xPos-resizeWidth,yPos+objHeight);

  this.moveFront(this.resizeHandle1);
  this.moveFront(this.resizeHandle3);
  this.moveFront(this.resizeHandle5);
  this.moveFront(this.resizeHandle7);

  this.resizeHandle1.setCanDrag(figure.isResizeable());
  this.resizeHandle3.setCanDrag(figure.isResizeable());
  this.resizeHandle5.setCanDrag(figure.isResizeable());
  this.resizeHandle7.setCanDrag(figure.isResizeable());
  if(figure.isResizeable())
  {
    var green = new  draw2d.Color(0,255,0);
    this.resizeHandle1.setBackgroundColor(green);
    this.resizeHandle3.setBackgroundColor(green);
    this.resizeHandle5.setBackgroundColor(green);
    this.resizeHandle7.setBackgroundColor(green);
  }
  else
  {
    this.resizeHandle1.setBackgroundColor(null);
    this.resizeHandle3.setBackgroundColor(null);
    this.resizeHandle5.setBackgroundColor(null);
    this.resizeHandle7.setBackgroundColor(null);
  }

  if(figure.isStrechable() && figure.isResizeable())
  {
    this.resizeHandle2.setCanDrag(figure.isResizeable());
    this.resizeHandle4.setCanDrag(figure.isResizeable());
    this.resizeHandle6.setCanDrag(figure.isResizeable());
    this.resizeHandle8.setCanDrag(figure.isResizeable());
    draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle2,xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos-resizeHeight);
    draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle4,xPos+objWidth,yPos+(objHeight/2)-(resizeHeight/2));
    draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle6,xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos+objHeight);
    draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle8,xPos-resizeWidth,yPos+(objHeight/2)-(resizeHeight/2));
    this.moveFront(this.resizeHandle2);
    this.moveFront(this.resizeHandle4);
    this.moveFront(this.resizeHandle6);
    this.moveFront(this.resizeHandle8);
  }
}

/**
 * @private
 **/
draw2d.Workflow.prototype.hideResizeHandles=function()
{
  if(this.resizeHandle1.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle1);
  if(this.resizeHandle2.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle2);
  if(this.resizeHandle3.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle3);
  if(this.resizeHandle4.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle4);
  if(this.resizeHandle5.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle5);
  if(this.resizeHandle6.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle6);
  if(this.resizeHandle7.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle7);
  if(this.resizeHandle8.canvas!=null)
    draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle8);
}

/**
 * @private
 **/
draw2d.Workflow.prototype.moveResizeHandles=function(/*:draw2d.Figure*/ figure)
{
  var resizeWidth = this.resizeHandle1.getWidth();
  var resizeHeight= this.resizeHandle1.getHeight();
  var objHeight   = figure.getHeight();
  var objWidth    = figure.getWidth();
  var xPos = figure.getX();
  var yPos = figure.getY();
  this.resizeHandle1.setPosition(xPos-resizeWidth,yPos-resizeHeight);
  this.resizeHandle3.setPosition(xPos+objWidth,yPos-resizeHeight);
  this.resizeHandle5.setPosition(xPos+objWidth,yPos+objHeight);
  this.resizeHandle7.setPosition(xPos-resizeWidth,yPos+objHeight);
  if(figure.isStrechable())
  {
    this.resizeHandle2.setPosition(xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos-resizeHeight);
    this.resizeHandle4.setPosition(xPos+objWidth,yPos+(objHeight/2)-(resizeHeight/2));
    this.resizeHandle6.setPosition(xPos+(objWidth/2)-this.resizeHandleHalfWidth,yPos+objHeight);
    this.resizeHandle8.setPosition(xPos-resizeWidth,yPos+(objHeight/2)-(resizeHeight/2));
  }
}

/**
 * @private
 **/
draw2d.Workflow.prototype.onMouseDown=function(/*:int*/ x, /*:int*/ y)
{
  this.dragging = true;
  this.mouseDownPosX = x;
  this.mouseDownPosY = y;

  // testen ob ein tool aktive ist und diese Aktion
  // an das Tool weiter leiten
  //
  if(this.toolPalette!=null && this.toolPalette.getActiveTool()!=null)
  {
    this.toolPalette.getActiveTool().execute(x,y);
  }

  this.setCurrentSelection(null);
  this.showMenu(null);

  // Testen ob eine Linie getroffen wurde
  //
  var size=this.getLines().getSize();
  for(var i=0;i< size;i++)
  {
    var line = this.lines.get(i);
    if(line.containsPoint(x,y) && line.isSelectable())
    {
      this.hideResizeHandles();
      this.setCurrentSelection(line);
      this.showLineResizeHandles(this.currentSelection);
      if(line instanceof draw2d.Line && !(line instanceof draw2d.Connection))
      	this.draggingLine = line;
      break;
    }
  }
}

/**
 * @private
 **/
draw2d.Workflow.prototype.onMouseUp=function(/*:int*/ x ,/*:int*/ y)
{
  this.dragging = false;
  this.draggingLine = null;
}

/**
 * @private
 **/
draw2d.Workflow.prototype.onMouseMove=function(/*:int*/ x ,/*:int*/ y)
{
  // DragDrop of a connection/Line
  if(this.dragging==true && this.draggingLine!=null)
  {
   var diffX = x-this.mouseDownPosX;
   var diffY = y-this.mouseDownPosY;
   // don't use "setStartPoint(...)". This enforce a repaint of the the connection.
   // We need only one repaint of the connect and this will be done with "setEndPoint(...)"
   // This is a simple performance "hack".
   this.draggingLine.startX= this.draggingLine.getStartX()+diffX;
   this.draggingLine.startY= this.draggingLine.getStartY()+diffY;
   this.draggingLine.setEndPoint(this.draggingLine.getEndX()+diffX, this.draggingLine.getEndY()+diffY);
   this.mouseDownPosX = x;
   this.mouseDownPosY = y;
   this.showLineResizeHandles(this.currentSelection);
  }
  else if(this.dragging==true && this.panning==true)
  {
   var diffX = x-this.mouseDownPosX;
   var diffY = y-this.mouseDownPosY;

   // set the new viewpoint
   //
   this.scrollTo(this.getScrollLeft()-diffX,  this.getScrollTop()-diffY,true);

   // adjust all palletes and toolbars
   //
   this.onScroll();
  }
}

/**
 * @private
 **/
draw2d.Workflow.prototype.onKeyDown=function( /*:int*/ keyCode, /*:boolean*/ ctrl)
{
  // "Figure" löscht sich selbst, da dies den KeyDown Event empfangen
  // kann. Bei einer Linie geht dies leider nicht, und muss hier abgehandelt werden.
  //

  if(keyCode==46 && this.currentSelection!=null && this.currentSelection.isDeleteable())
     this.commandStack.execute(new draw2d.CommandDelete(this.currentSelection));
  else if(keyCode==90 && ctrl)
     this.commandStack.undo();
  else if(keyCode==89 && ctrl)
     this.commandStack.redo();

}

/**
 * @private
 **/
draw2d.Workflow.prototype.setDocumentDirty=function()
{
  // recreate the SnapToHelper. The need the 
  for(var i=0;i<this.dialogs.getSize();i++)
  {
    var d = this.dialogs.get(i);
    if(d!=null && d.onSetDocumentDirty)
      d.onSetDocumentDirty();
  }
  if(this.snapToGeometryHelper!=null)
     this.snapToGeometryHelper.onSetDocumentDirty();
  if(this.snapToGridHelper!=null)
     this.snapToGridHelper.onSetDocumentDirty();
}


/** 
 *  Adjust the x to the next grid line.
 *
 * @param {int} x The x axis value to adjust.
 * @type int
 * @private
 **/
draw2d.Workflow.prototype.snapToHelper=function(/*:draw2d.Figure*/figure, /*:draw2d.Point*/ pos)
{
   if(this.snapToGeometryHelper!=null)
   {
      // The user drag&draop a ResizeHandle
      //
      if(figure instanceof draw2d.ResizeHandle)
      {
         var snapPoint = figure.getSnapToGridAnchor();
         pos.x+= snapPoint.x;
         pos.y+= snapPoint.y;
         var result = new draw2d.Point(pos.x,pos.y);

         var snapDirections = figure.getSnapToDirection();
         var direction = this.snapToGeometryHelper.snapPoint(snapDirections, pos,result);

         // Show a vertical line if the snapper has modified the inputPoint
         //
         if((snapDirections & draw2d.SnapToHelper.EAST_WEST) && !(direction & draw2d.SnapToHelper.EAST_WEST))
            this.showSnapToHelperLineVertical(result.x);
         else
            this.hideSnapToHelperLineVertical();

         // Show a horizontal line if the snapper has modified the inputPoint
         //
         if((snapDirections & draw2d.SnapToHelper.NORTH_SOUTH) && !(direction & draw2d.SnapToHelper.NORTH_SOUTH))
            this.showSnapToHelperLineHorizontal(result.y);
         else
            this.hideSnapToHelperLineHorizontal();

         result.x-= snapPoint.x;
         result.y-= snapPoint.y;
         return result;
      }
      // The user drag&drop a normal figure
      else
      {
         var inputBounds = new draw2d.Dimension(pos.x,pos.y, figure.getWidth(), figure.getHeight());
         var result = new draw2d.Dimension(pos.x,pos.y, figure.getWidth(), figure.getHeight());

         var snapDirections = draw2d.SnapToHelper.NSEW;
         var direction = this.snapToGeometryHelper.snapRectangle( inputBounds, result);

         // Show a vertical line if the snapper has modified the inputPoint
         //
         if((snapDirections & draw2d.SnapToHelper.WEST) && !(direction & draw2d.SnapToHelper.WEST))
            this.showSnapToHelperLineVertical(result.x);
         else if((snapDirections & draw2d.SnapToHelper.EAST) && !(direction & draw2d.SnapToHelper.EAST))
            this.showSnapToHelperLineVertical(result.getX()+result.getWidth());
         else
            this.hideSnapToHelperLineVertical();

         // Show a horizontal line if the snapper has modified the inputPoint
         //
         if((snapDirections & draw2d.SnapToHelper.NORTH) && !(direction & draw2d.SnapToHelper.NORTH))
            this.showSnapToHelperLineHorizontal(result.y);
         else if((snapDirections & draw2d.SnapToHelper.SOUTH) && !(direction & draw2d.SnapToHelper.SOUTH))
            this.showSnapToHelperLineHorizontal(result.getY()+result.getHeight());
         else
            this.hideSnapToHelperLineHorizontal();

         return result.getTopLeft();
      }
   }
   else if(this.snapToGridHelper!=null)
   {
      var snapPoint = figure.getSnapToGridAnchor();
      pos.x= pos.x+snapPoint.x;
      pos.y= pos.y+snapPoint.y;
      var result = new draw2d.Point(pos.x,pos.y);
      this.snapToGridHelper.snapPoint(0,pos,result);
      result.x= result.x-snapPoint.x;
      result.y= result.y-snapPoint.y;
      return result;
   }

   return pos;
}


/**
 *
 * @private
 **/
draw2d.Workflow.prototype.showSnapToHelperLineHorizontal=function(/*:int*/ horizontalLocation)
{
   if(this.horizontalSnapToHelperLine==null)
   {
      this.horizontalSnapToHelperLine = new draw2d.Line();
      this.horizontalSnapToHelperLine.setColor(new  draw2d.Color(175,175,255));
      this.addFigure(this.horizontalSnapToHelperLine);
   }
   this.horizontalSnapToHelperLine.setStartPoint(0,horizontalLocation);
   this.horizontalSnapToHelperLine.setEndPoint(this.getWidth(),horizontalLocation);
}

/**
 *
 * @private
 **/
draw2d.Workflow.prototype.showSnapToHelperLineVertical=function( /*:int*/ verticalLocation)
{
   if(this.verticalSnapToHelperLine==null)
   {
      this.verticalSnapToHelperLine = new draw2d.Line();
      this.verticalSnapToHelperLine.setColor(new  draw2d.Color(175,175,255));
      this.addFigure(this.verticalSnapToHelperLine);
   }
   this.verticalSnapToHelperLine.setStartPoint(verticalLocation,0);
   this.verticalSnapToHelperLine.setEndPoint(verticalLocation,this.getHeight());
}

/**
 *
 * @private
 **/
draw2d.Workflow.prototype.hideSnapToHelperLines=function()
{
  this.hideSnapToHelperLineHorizontal();
  this.hideSnapToHelperLineVertical();
}

draw2d.Workflow.prototype.hideSnapToHelperLineHorizontal=function()
{
   if(this.horizontalSnapToHelperLine!=null)
   {
      this.removeFigure(this.horizontalSnapToHelperLine);
      this.horizontalSnapToHelperLine = null;
   }
}

draw2d.Workflow.prototype.hideSnapToHelperLineVertical=function()
{
   if(this.verticalSnapToHelperLine!=null)
   {
      this.removeFigure(this.verticalSnapToHelperLine);
      this.verticalSnapToHelperLine = null;
   }
}

