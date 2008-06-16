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

draw2d.Drag=function()
{
}

/**
 * The item currently being dragged.
 * @scope private
 */
draw2d.Drag.current /*: Draggable */ = null;
draw2d.Drag.currentTarget /*:DropTarget */=null;

/**
 * Indicates whether or not an item is being dragged.
 * @scope private
 */
draw2d.Drag.dragging /*: boolean */ = false;

/**
 * Returns true if an item is being dragged.
 * @scope public
 * @return True if an item is being dragged, false if not.
 * @type boolean
 */
draw2d.Drag.isDragging = function () /*: boolean */ 
{
    return this.dragging;
}

/**
 * Sets the item being dragged.
 * @scope protected
 * @param {Draggable} oDraggable The draggable item.
 * @type void
 */
draw2d.Drag.setCurrent = function (oDraggable /*: Draggable */) 
{
    this.current = oDraggable;
    this.dragging = true;
}

/**
 * Returns the currently dragged item.
 * @scope public
 * @return The currently dragged item.
 * @type Draggable
 */
draw2d.Drag.getCurrent = function () /*: Draggable */ 
{
    return this.current;
}

/**
 * Clears the currently dragged item from memory and sets the dragging
 * flag to false.
 * @scope protected
 * @type void
 */
draw2d.Drag.clearCurrent = function () 
{
    this.current = null;
    this.dragging = false;
};

/**
 * Encapsulates the functionality for a draggable element.
 * @scope public
 * @extends EventTarget
 * @class
 */
draw2d.Draggable=function(oElement, iConstraints) 
{

    /*
     * Inherit properties from EventTarget.
     */
    draw2d.EventTarget.call(this);

    /*
     * Call constructor.
     */
    this.construct(oElement, iConstraints);  

    /**
     * The difference between the x cursor position and left edge of the element.
     * @scope private
     * @type int
     */  
    this.diffX /*: int */ = 0;

    /**
     * The difference between the y cursor position and top edge of the element.
     * @scope private
     * @type int
     */  
    this.diffY /*: int */ = 0;

    /**
     * Collection of drop targets for this item.
     * @scope private
     * @type Array
     */
    this.targets = new draw2d.ArrayList();
}

/*
 * Inherit methods from EventTarget.
 */
draw2d.Draggable.prototype = new draw2d.EventTarget;

/**
 * Adds a new drop target to the draggable item.
 * @scope public
 * @param {DropTarget} oDropTarget The drop target to register for this item.
 * @type void
 */
// draw2d.Draggable.prototype.addDropTarget = function (oDropTarget /*: DropTarget */) 
//{
//    this.targets.add(oDropTarget);
//}

/**
 * Creates a new instance based on the given element and the constraints.
 * @scope private
 * @constructor
 * @param {HTMLElement} oElement The DOM element to make draggable.
 * @param {int} iConstraints The rules for dragging.
 */
draw2d.Draggable.prototype.construct = function (oElement /*: HTMLElement */,  iConstraints /*: int */) 
{
    /**
     * The element to make draggable.
     * @private
     * @type HTMLElement
     */
    this.element /*: HTMLElement */ = oElement;

    /**
     * The constraints indicating the rules for dragging.
     * @private
     * @type int
     */
    this.constraints /*: int */ = iConstraints;

    /*
     * Create a pointer to this object.
     */
    var oThis = this;

    var dblTemp = function()
    {
        // Check if the user has made a "double click"
        /*
         * Create a dragstart event and fire it.
         */
        var oDragStartEvent = new draw2d.DragDropEvent();
        oDragStartEvent.initDragDropEvent("dblclick", true);
        oThis.dispatchEvent(oDragStartEvent);
        var oEvent = arguments[0] || window.event;
        oEvent.cancelBubble = true;
        oEvent.returnValue = false;
      }

    /*
     * Create a temporary function named fnTemp.
     */
    var fnTemp = function () {

        /*
        * Get the event objects, which is either the first
        * argument (for DOM-compliant browsers and Netscape 4.x)
        * or window.event (for IE).
        */
        var oEvent = arguments[0] || window.event;

        var oDragStartEvent = new draw2d.DragDropEvent();
        // dispatch Event benötigt eventuel die x/y Koordinate um zu bestimmen
        // ob dieses Even wirklich relevant ist. (z.b. Wo man in dem Object hinein geklickt hat)
        //
        var xOffset    = oThis.node.workflow.getAbsoluteX();
        var yOffset    = oThis.node.workflow.getAbsoluteY();
        var scrollLeft = oThis.node.workflow.getScrollLeft();
        var scrollTop  = oThis.node.workflow.getScrollTop();
        oDragStartEvent.x = oEvent.clientX - oThis.element.offsetLeft+scrollLeft-xOffset;
        oDragStartEvent.y = oEvent.clientY - oThis.element.offsetTop+scrollTop-yOffset;

        // Context menu
        //
        if(oEvent.button==2)
        {
           oDragStartEvent.initDragDropEvent("contextmenu", true);
           oThis.dispatchEvent(oDragStartEvent)
        }
        // Drag&Drop
        //
        else
        {
           oDragStartEvent.initDragDropEvent("dragstart", true);
           /*
            * If the event isn't cancelled, proceed.
            */
           if (oThis.dispatchEvent(oDragStartEvent)) 
           {
              /*
               * Get the difference between the clientX and clientY
               * and the position of the element.
               */
               oThis.diffX = oEvent.clientX - oThis.element.offsetLeft;
               oThis.diffY = oEvent.clientY - oThis.element.offsetTop;

              /*
               * Set the currently dragged item.
               */
               draw2d.Drag.setCurrent(oThis);

              // Error if the user drag the object outside the window and release the mouse button there.
              // The object glues at the mose pointer.
              if(oThis.isAttached==true)
                 oThis.detachEventHandlers();

              /*
               * Add all DOM event handlers
               */
               oThis.attachEventHandlers();
           }
        }

        oEvent.cancelBubble = true;
        oEvent.returnValue = false;
    };

    /*
     * Create a temporary function named fnTemp.
     */
    var fnMouseMove = function () 
    {
        // Falls man gerade beim Drag&Drop ist, ist die
        // MouseOver Anzeige ausgeschaltet
        //
        if(draw2d.Drag.getCurrent()==null)
        {
          /*
          * Get the event objects, which is either the first
          * argument (for DOM-compliant browsers and Netscape 4.x)
          * or window.event (for IE).
          */
          var oEvent = arguments[0] || window.event;
          if(draw2d.Drag.currentHover!=null && oThis!=draw2d.Drag.currentHover)
          {
             // this codes will be called if you move the cursor from one figure (the current hover figure)
             // to another figure without of "touch" the background.
             //
             var oDropEvent = new draw2d.DragDropEvent();
             oDropEvent.initDragDropEvent("mouseleave", false, oThis);
             draw2d.Drag.currentHover.dispatchEvent(oDropEvent);
          }
          if(oThis!=null && oThis!=draw2d.Drag.currentHover)
          {
              var oDropEvent = new draw2d.DragDropEvent();
              oDropEvent.initDragDropEvent("mouseenter", false, oThis);
              oThis.dispatchEvent(oDropEvent);
          }
          draw2d.Drag.currentHover = oThis;
        }
        else
        {
         // var oEvent = arguments[0] || window.event;
        }
    };

    /*
     * Determine which method to use to add the event handler.
     */
    if (this.element.addEventListener) {
        this.element.addEventListener("mousemove", fnMouseMove, false);
        this.element.addEventListener("mousedown", fnTemp, false);
        this.element.addEventListener("dblclick", dblTemp, false);
    } else if (this.element.attachEvent) {
        this.element.attachEvent("onmousemove", fnMouseMove);
        this.element.attachEvent("onmousedown", fnTemp);
        this.element.attachEvent("ondblclick", dblTemp);
    } else {
        throw new Error("Drag not supported in this browser.");
    }
};

/**
 * Attaches event handlers for the mousemove and mouseup events.
 * @scope private
 * @private
 * @type void
 */
draw2d.Draggable.prototype.attachEventHandlers = function () {

    /*
     * Create a pointer to this object.
     */
    var oThis = this;
    oThis.isAttached = true;

    /*
     * Create a temporary function named tempMouseMove.
     */
    this.tempMouseMove = function () {

        /*
         * Get the event objects, which is either the first
         * argument (for DOM-compliant browsers and Netscape 4.x)
         * or window.event (for IE).
         */
        var oEvent = arguments[0] || window.event;

        /*
         * Get the new x and y coordinates for the dragged element by
         * subtracting the difference in the x and y direction from 
         * the mouse position on the screen (clientX and clientY).
         */
        var newPos = new draw2d.Point(oEvent.clientX - oThis.diffX, oEvent.clientY - oThis.diffY);

        // Adjust the new location if the object can snap to a helper
        // like grid, geometry, ruler,...
        //
        if(oThis.node.getCanSnapToHelper())
        {
         newPos = oThis.node.getWorkflow().snapToHelper(oThis.node, newPos);
        }

        oThis.element.style.left = newPos.x+"px";
        oThis.element.style.top  = newPos.y+"px";

        var scrollLeft = oThis.node.workflow.getScrollLeft();
        var scrollTop  = oThis.node.workflow.getScrollTop();
        var xOffset = oThis.node.workflow.getAbsoluteX();
        var yOffset = oThis.node.workflow.getAbsoluteY();
        var oDropTarget  = oThis.getDropTarget(oEvent.clientX+scrollLeft-xOffset, oEvent.clientY+scrollTop-yOffset);
        var oCompartment = oThis.getCompartment(oEvent.clientX+scrollLeft-xOffset, oEvent.clientY+scrollTop-yOffset);
        if(draw2d.Drag.currentTarget!=null && oDropTarget!=draw2d.Drag.currentTarget)
        {
            var oDropEvent = new draw2d.DragDropEvent();
            oDropEvent.initDragDropEvent("dragleave", false, oThis);
            draw2d.Drag.currentTarget.dispatchEvent(oDropEvent);
        }
        if(oDropTarget!=null && oDropTarget!=draw2d.Drag.currentTarget)
        {
            var oDropEvent = new draw2d.DragDropEvent();
            oDropEvent.initDragDropEvent("dragenter", false, oThis);
            oDropTarget.dispatchEvent(oDropEvent);
        }
        draw2d.Drag.currentTarget      = oDropTarget;


        if(draw2d.Drag.currentCompartment!=null && oCompartment!=draw2d.Drag.currentCompartment)
        {
            var oDropEvent = new draw2d.DragDropEvent();
            oDropEvent.initDragDropEvent("figureleave", false, oThis);
            draw2d.Drag.currentCompartment.dispatchEvent(oDropEvent);
        }
        if(oCompartment!=null && oCompartment.node!=oThis.node && oCompartment!=draw2d.Drag.currentCompartment)
        {
            var oDropEvent = new draw2d.DragDropEvent();
            oDropEvent.initDragDropEvent("figureenter", false, oThis);
            oCompartment.dispatchEvent(oDropEvent);
        }
        draw2d.Drag.currentCompartment = oCompartment;

        /*
         * Create and fire a drag event.
         */
        var oDragEvent = new draw2d.DragDropEvent();
        oDragEvent.initDragDropEvent("drag", false);
        oThis.dispatchEvent(oDragEvent);
    };

    /*
     * Create a temporary function for the mouseup event.
     */
    oThis.tempMouseUp = function () {   

        /*
         * Detach all of the event handlers.
         */
        oThis.detachEventHandlers();

        /*
         * Get the event object.
         */
        var oEvent = arguments[0] || window.event;

        /*
         * Create and fire a dragend event.
         */
        var oDragEndEvent = new draw2d.DragDropEvent();
        oDragEndEvent.initDragDropEvent("dragend", false);
        oThis.dispatchEvent(oDragEndEvent);

        /*
         * Determine if the mouse is over a drop target.
         */
        var scrollLeft = oThis.node.workflow.getScrollLeft();
        var scrollTop  = oThis.node.workflow.getScrollTop();
        var xOffset = oThis.node.workflow.getAbsoluteX();
        var yOffset = oThis.node.workflow.getAbsoluteY();
        var oDropTarget = oThis.getDropTarget(oEvent.clientX+scrollLeft-xOffset, oEvent.clientY+scrollTop-yOffset);
	var oCompartment= oThis.getCompartment(oEvent.clientX+scrollLeft-xOffset, oEvent.clientY+scrollTop-yOffset);
        if (oDropTarget != null) 
        {
            var oDropEvent = new draw2d.DragDropEvent();
            oDropEvent.initDragDropEvent("drop", false, oThis);
            oDropTarget.dispatchEvent(oDropEvent);
        }
        if (oCompartment != null && oCompartment.node != oThis.node) 
        {
            var oDropEvent = new draw2d.DragDropEvent();
            oDropEvent.initDragDropEvent("figuredrop", false, oThis);
            oCompartment.dispatchEvent(oDropEvent);
        }

        if(draw2d.Drag.currentTarget!=null)
        {
            var oDropEvent = new draw2d.DragDropEvent();
            oDropEvent.initDragDropEvent("dragleave", false, oThis);
            draw2d.Drag.currentTarget.dispatchEvent(oDropEvent);
            draw2d.Drag.currentTarget=null;
        }

        draw2d.Drag.currentCompartment=null;
        draw2d.Drag.clearCurrent();
    };

    /*
     * Determine which method to use to add the event handlers for
     * the mousemove and mouseup events.
     */
    if (document.body.addEventListener) {
        document.body.addEventListener("mousemove", this.tempMouseMove, false);
        document.body.addEventListener("mouseup", this.tempMouseUp, false);
    } else if (document.body.attachEvent) {
        document.body.attachEvent("onmousemove", this.tempMouseMove);
        document.body.attachEvent("onmouseup", this.tempMouseUp);
    } else {
        throw new Error("Drag doesn't support this browser.");
    }
    
};

/**
 * Detaches event handlers for the mousemove and mouseup events.
 * @scope private
 */
draw2d.Draggable.prototype.detachEventHandlers = function () 
{
    this.isAttached = false;
    /*
     * Determine the method for removing the event handlers for the
     * mousemove and mouseup events.
     */
    if (document.body.removeEventListener) {
        document.body.removeEventListener("mousemove", this.tempMouseMove, false);
        document.body.removeEventListener("mouseup", this.tempMouseUp, false);
    } else if (document.body.detachEvent) {
        document.body.detachEvent("onmousemove", this.tempMouseMove);
        document.body.detachEvent("onmouseup", this.tempMouseUp);
    } else {
        throw new Error("Drag doesn't support this browser.");
    }
};

/**
 * Determines the drop target that the mouse is over.
 * @scope private
 * @param x The x-coordinate of the mouse.
 * @param y The y-coordinate of the mouse.
 * @return The drop target if the mouse is over one, null otherwise.
 */
draw2d.Draggable.prototype.getDropTarget = function (/*:int*/ x ,/*:int*/  y )
{
  for(var i=0;i<this.targets.getSize();i++)
  {
    var target = this.targets.get(i);
    if (target.node.isOver(x, y) && target.node!=this.node)
    {
        return target;
    }
  }
  return null;
}

/**
 * Determines the compartment target that the mouse is over.
 * @private
 * @param {int} x The x-coordinate of the mouse.
 * @param {int} y The y-coordinate of the mouse.
 * @return The drop target if the mouse is over one, null otherwise.
 */
draw2d.Draggable.prototype.getCompartment = function (x /*: int */, y /*: int */) /*: DropTarget */ 
{
  var result = null;
  for(var i=0;i<this.node.workflow.compartments.getSize();i++)
  {
    var target = this.node.workflow.compartments.get(i);
    if (target.isOver(x, y) && target!=this.node)
    {
        if(result==null)
           result = target;
        else if(result.getZOrder() < target.getZOrder())
           result = target;
    }
  }
  return result==null?null:result.dropable;
}


/**
 * Returns the left coordinate of the element.
 * @scope public
 * @return The left coordinate of the element.
 */
draw2d.Draggable.prototype.getLeft = function () /*: int */ 
{
    return this.element.offsetLeft;
}

/**
 * Returns the top coordinate of the element.
 * @scope public
 * @return The top coordinate of the element.
 */
draw2d.Draggable.prototype.getTop = function () /*: int */ 
{
    return this.element.offsetTop;
}

/**
 * Encapsulates information about a drag drop event.
 * @class
 * @scope public
 * @extends Event
 */
draw2d.DragDropEvent=function()
{
    /*
     * Inherit properties from Event.
     */
    draw2d.Event.call(this);
}

/*
 * Inherit methods from Event.
 */
draw2d.DragDropEvent.prototype = new draw2d.Event();

/**
 * Initializes the event object with information for the event.
 * @scope public
 * @param sType The type of event encapsulated by the object.
 * @param bCancelable True if the event can be cancelled.
 * @param oRelatedTarget The alternate target related to the event.
 */
draw2d.DragDropEvent.prototype.initDragDropEvent = function(sType /*: String */,
                                                      bCancelable /*: boolean */,
                                                      oRelatedTarget /*: EventTarget */) {
    /*
     * Call inherited method initEvent().
     */
    this.initEvent(sType, bCancelable);

    /*
     * Assign related target (may be null).
     */
    this.relatedTarget = oRelatedTarget;
}

/**
 * A target for a Draggable to be dropped.
 * @scope public
 * @class
 * @extends EventTarget
 */
draw2d.DropTarget=function(oElement)
{
    /*
     * Inherit properties from EventTarget.
     */
    draw2d.EventTarget.call(this);

    /*
     * Call constructor.
     */
    this.construct(oElement);
}

/*
 * Inherit methods from EventTarget.
 */
draw2d.DropTarget.prototype = new draw2d.EventTarget;

/**
 * Creates a new instance based on the given DOM element.
 * @constructor
 * @scope public
 * @param oElement The DOM element to make into a drop target.
 */
draw2d.DropTarget.prototype.construct = function (oElement /*: HTMLElement */) 
{
    /**
     * The DOM element to use as a drop target.
     * @scope private
     */
    this.element = oElement;
}

/**
 * Returns the left coordinate of the drop target.
 * @scope public
 * @return The left coordinate of the drop target.
 */
draw2d.DropTarget.prototype.getLeft = function () /*: int */ 
{
    var el = this.element;
    var ol=el.offsetLeft;
    while((el=el.offsetParent) != null)
    {
        ol += el.offsetLeft;
    }
    return ol;
}

/**
 * Returns the top coordinate of the drop target.
 * @scope public
 * @return The top coordinate of the drop target.
 */
draw2d.DropTarget.prototype.getTop = function () /*: int */
{
  var el = this.element;
  var ot=el.offsetTop;
  while((el=el.offsetParent) != null)
  {
     ot += el.offsetTop;
  }
  return ot;
}

/**
 * Returns the height of the drop target.
 * @scope public
 * @return The height of the drop target.
 */
draw2d.DropTarget.prototype.getHeight = function () /*: int */
{
    return this.element.offsetHeight;
}

/**
 * Returns the width of the drop target.
 * @scope public
 * @return The width of the drop target.
 */
draw2d.DropTarget.prototype.getWidth = function () /*: int */
{
    return this.element.offsetWidth;
}