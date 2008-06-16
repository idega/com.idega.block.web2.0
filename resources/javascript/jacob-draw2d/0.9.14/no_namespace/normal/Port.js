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
 * @class A Port is the anchor for a {@link Connection}. A {@link Connection} must have a start and a end Port.
 * <br>
 * @version 0.9.14
 * @author Andreas Herz
 * @param {Figure} uiRepresentation The figure to paint this Port. This parameter is optional.
 * @constructor
 */
Port=function(/*:Figure*/ disconnectedUIRepresentation,/*:Figure*/ connectedUIRepresentation)
{
  // Inner Class for the port corona. Why?! The runtime increment the alpha value from 0-1 if you add 
  // an element to the canvas if you have set workflow.setSmoothFigureHandling(true). But the corona should have max. alpha=0.3.
  //
  Corona = function(){}
  Corona.prototype = new Circle;
  Corona.prototype.setAlpha=function(/*:float 0-1*/ percent)
  {
     Circle.prototype.setAlpha.call(this, Math.min(0.3,percent));
  }

  // Die graphische Representation des Elementes
  //
  if(disconnectedUIRepresentation==null)
    this.currentUIRepresentation = new Circle();
  else
    this.currentUIRepresentation = disconnectedUIRepresentation;


  if(connectedUIRepresentation==null)
  {
   this.connectedUIRepresentation = new Circle();
   this.connectedUIRepresentation.setColor(null);
  }
  else
  {
   this.connectedUIRepresentation = connectedUIRepresentation;
  }

  this.disconnectedUIRepresentation = this.currentUIRepresentation;
  this.hideIfConnected = false;

  // a flag which indicates that the HTML of the port ui representation has 
  // been added to the DOM tree.
  //
  this.uiRepresentationAdded=true;

  /** @private **/
  this.parentNode = null;
  /** @private **/
  this.originX=0; // the fix point of the port.
  /** @private **/
  this.originY=0;

  /** @private **/
  this.coronaWidth=10; // the corona width for the isOver method. Usefull during drag&drop of ports. Better SnapTo behaviour.

  /** @private **/
  this.corona=null; // Circle

  Rectangle.call(this);
  this.setDimension(8,8);
  this.setBackgroundColor(new  Color(100,180,100));
  this.setColor(new  Color(90,150,90));
  Rectangle.prototype.setColor.call(this,null);
  /** @private **/
  this.dropable = new DropTarget(this.html);
  this.dropable.node = this;
  this.dropable.addEventListener("dragenter", function (oEvent)
  {
    oEvent.target.node.onDragEnter(oEvent.relatedTarget.node);
  });
  this.dropable.addEventListener("dragleave", function (oEvent)
  {
    oEvent.target.node.onDragLeave(oEvent.relatedTarget.node);
  });
  this.dropable.addEventListener("drop", function (oEvent)
  {
    oEvent.relatedTarget.node.onDrop(oEvent.target.node);
  });
}

Port.prototype = new Rectangle;
/** @private **/
Port.prototype.type="Port";

/** @private **/
Port.ZOrderBaseIndex=5000;

/**
 * Set the common z-index of the window element. This method exists for
 * compatibility reason to dojo or another UI javascript library. 
 * It is now possible to arange the draw2d elements behind/before other UI elements.
 *
 * @see #setZOrder
 * @static
 * @param {int} index The z-order for all new port objects.
 **/
Port.setZOrderBaseIndex=function(/*:int*/ index)
{
  Port.ZOrderBaseIndex = index;
}

/**
 * Hide the port if a connector has been attach to this.
 * The port doesn't change the functonality. You can drag&drop the port. 
 * It hide's only the UI Representation!
 **/
Port.prototype.setHideIfConnected=function(/*:boolean*/ flag)
{
  this.hideIfConnected = flag;
}


/**
 * @private
 **/
Port.prototype.dispose=function()
{
  // Remove all Connections which are bounded to this port
  // In this case this are all movement listener
  var size= this.moveListener.getSize();
  for(var i=0;i<size;i++)
  {
    var target = this.moveListener.get(i);
    this.parentNode.workflow.removeFigure(target);
    target.dispose();
  }

  Rectangle.prototype.dispose.call(this);
  this.parentNode = null;
  this.dropable.node=null;
  this.dropable = null;
  this.disconnectedUIRepresentation.dispose();
  this.connectedUIRepresentation.dispose();
}



/**
 * @private
 **/
Port.prototype.createHTMLElement=function()
{
    var item = Rectangle.prototype.createHTMLElement.call(this);
    item.style.zIndex=Port.ZOrderBaseIndex;
    this.currentUIRepresentation.html.zIndex=Port.ZOrderBaseIndex;
    item.appendChild(this.currentUIRepresentation.html);
    this.uiRepresentationAdded=true;

    return item;
}

/**
 * Set the representation of this port. The default representation of a port is a green circle.
 *
 * @param {Figure} figure The new UI representation of this port.
 *
 **/
Port.prototype.setUiRepresentation=function(/*:Figure*/ figure)
{
  // a port need a UI representation
  //
  if(figure == null)
     figure = new Figure();

  if(this.uiRepresentationAdded)
    this.html.removeChild(this.currentUIRepresentation.getHTMLElement());

  this.html.appendChild(figure.getHTMLElement());
  figure.paint();

  this.currentUIRepresentation = figure;
}

/**
 * Callback method for the mouse enter event. Usefull for mouse hover-effects.
 * Override this method for yourown effects. Don't call them manually.
 *
 * @private
 **/
Port.prototype.onMouseEnter=function()
{
    this.setLineWidth(2);
}


/**
 * Callback method for the mouse leave event. Usefull for mouse hover-effects.
 * @private
 **/
Port.prototype.onMouseLeave=function()
{
    this.setLineWidth(0);
}


/**
 * Set the dimension of this port.
 *
 * @param {int} width The new width of the object
 * @param {int} heightThe new height of the object
 **/
Port.prototype.setDimension=function(/*:int*/ width, /*:int*/ height)
{
  Rectangle.prototype.setDimension.call(this, width, height);
  this.connectedUIRepresentation.setDimension(width, height);
  this.disconnectedUIRepresentation.setDimension(width, height);

  // adjust the position
  this.setPosition(this.x, this.y);
}

/**
 * Set the background color of the port
 * @param {Color} color The new background color of the port. 
 **/
Port.prototype.setBackgroundColor=function(/*:Color*/ color)
{
  // delegate to the UI representation
  this.currentUIRepresentation.setBackgroundColor(color);
}

/**
 * Returns the background color of this port.
 *
 * @type Color
 */
Port.prototype.getBackgroundColor=function()
{
  // delegate to the UI representation
  return this.currentUIRepresentation.getBackgroundColor();
}


/**
 * Returns a array of <code>Connection</code> of all related connections to this port.
 *
 * @type ArrayList
 **/
Port.prototype.getConnections=function()
{
  var result = new ArrayList();

  // Return all Connections which are bounded to this port
  // In this case this are all movement listener

  var size= this.moveListener.getSize();
  for(var i=0;i<size;i++)
  {
    var target = this.moveListener.get(i);
    if(target instanceof Connection)
       result.add(target);
  }
  return result;
}


/**
 * Set the foreground color of the port
 * @param {Color} color The new foreground color of the port. 
 **/
Port.prototype.setColor=function(/*:Color*/ color)
{
  // delegate to the UI representation
  this.currentUIRepresentation.setColor(color);
}

/**
 * Returns the foreground color of the port.
 *
 * @type Color
 **/
Port.prototype.getColor=function()
{
  // delegate to the UI representation
  return this.currentUIRepresentation.getColor();
}

/**
 * Set the foreground color of the port
 * @param {Color} color The new foreground color of the port. 
 **/
Port.prototype.setLineWidth=function(/*:int*/ width)
{
  // delegate to the UI representation
  this.currentUIRepresentation.setLineWidth(width);
}

/**
 * Returns the line with of the port border.
 *
 * @type int
 **/
Port.prototype.getLineWidth=function()
{
  // delegate to the UI representation
  return this.currentUIRepresentation.getLineWidth();
}

/**
 * @private
 **/
Port.prototype.paint=function()
{
  // delegate to the UI representation
  this.currentUIRepresentation.paint();
}


/**
 * Set the position of this port 
 *
 * @param {int} xPos The new x position of the port.
 * @param {int} yPos The new y position of the port.
 **/
Port.prototype.setPosition=function(/*int*/ xPos, /*int*/ yPos)
{
  // The origin must be set before the base class will be called.
  // Reason: The base class fires a onFigureMoved event. And the listener needs sometimes
  //         the originX/originY coordinates. (e.g. Port and Connection).
  this.originX=xPos; // the fix point of the point.
  this.originY=yPos;

  Rectangle.prototype.setPosition.call(this,xPos,yPos);

  // Falls das Element noch nie gezeichnet wurde, dann braucht aus das HTML nicht 
  // aktualisiert werden
  //
  if(this.html==null)
    return;

  this.html.style.left = (this.x-this.getWidth()/2)+"px";
  this.html.style.top  = (this.y-this.getHeight()/2)+"px";
}

/**
 * Set the parentNode of this port.
 * Call {@link Node.addPort} if you want to a port to node. Don't call this method directly.
 *
 * @private
 */
Port.prototype.setParent=function(/*:Node*/ parentNode)
{
  if(this.parentNode!=null)
    this.parentNode.detachMoveListener(this);

  this.parentNode = parentNode;
  if(this.parentNode!=null)
    this.parentNode.attachMoveListener(this);
}

Port.prototype.attachMoveListener = function(/*:Figure*/ figure)
{
  Rectangle.prototype.attachMoveListener.call(this,figure);
  if(this.hideIfConnected==true)
   this.setUiRepresentation(this.connectedUIRepresentation);
}


Port.prototype.detachMoveListener = function(/*:Figure*/ figure)
{
  Rectangle.prototype.detachMoveListener.call(this,figure);
  if(this.getConnections().getSize()==0)
    this.setUiRepresentation(this.disconnectedUIRepresentation);
}

/**
 * Return the parentNode {@link Node} of this port.
 * @type Node
 **/
Port.prototype.getParent=function()
{
  return this.parentNode;
}

/**
 * @private
 **/
Port.prototype.onDrag = function()
{
  Rectangle.prototype.onDrag.call(this);

  this.parentNode.workflow.showConnectionLine(this.parentNode.x+this.x, this.parentNode.y+this.y, this.parentNode.x+this.originX, this.parentNode.y+this.originY);
}

/**
 * Returns the corona width of the Port. The corona width will be used during the
 * drag&drop of a port.
 *
 * @type int
 **/
Port.prototype.getCoronaWidth = function()
{
   return this.coronaWidth;
}


/**
 * Set the corona width of the Port. The corona width will be used during the
 * drag&drop of a port. You can drop a port in the corona of this port to create
 * a connection. It is not neccessary to drop exactly on the port.
 *
 * @param {int} width The new corona width of the port
 **/
Port.prototype.setCoronaWidth = function(/*:int*/ width)
{
   this.coronaWidth = width;
}



/**
 * @private
 **/
Port.prototype.onDragend = function()
{
  // Don't call the parent implementation. This will create an CommandMove object
  // and store them o the CommandStack for the undo operation. This makes no sense for a
  // port.
  // Rectangle.prototype.onDragend.call(this); DON'T call the super implementation!!!

  this.setAlpha(1.0);

  // 1.) Restore the old Position of the node
  //
  this.setPosition(this.originX, this.originY);

  // 2.) Remove the bounding line from the canvas
  //
  this.parentNode.workflow.hideConnectionLine();
}

/**
 * @private
 * @param {int} x The new x-origin of the port
 * @param {int} y The new yoriging of the port
 **/
Port.prototype.setOrigin=function(/*:int*/ x, /*:int*/ y)
{
  this.originX = x;
  this.originY = y;
}

/**
 * @private
 * @param {Port} port The port under the current drag object
 **/
Port.prototype.onDragEnter = function(/*:Port*/ port)
{
  this.parentNode.workflow.connectionLine.setColor(new  Color(0,150,0));
  this.parentNode.workflow.connectionLine.setLineWidth(3);

  this.showCorona(true);
}

/**
 * @private
 * @param {Port} port The port which we leave with the drag object.
 **/
Port.prototype.onDragLeave = function(/*:Port*/ port)
{
  this.parentNode.workflow.connectionLine.setColor(new  Color(0,0,0));
  this.parentNode.workflow.connectionLine.setLineWidth(1);

  this.showCorona(false);
}

/**
 * @private
 * @param {Port} port The drop target.
 **/
Port.prototype.onDrop = function(/*:Port*/ port)
{
  if(this.parentNode.id == port.parentNode.id)
  {
    // same parentNode -> do nothing
  }
  else
  {
    // OK
    var command = new CommandConnect(this.parentNode.workflow,port,this);
    this.parentNode.workflow.getCommandStack().execute(command);
  }
}


/**
 * Returns the absolute y-position of the port.
 *
 * @type Point
 **/
Port.prototype.getAbsolutePosition=function()
{
  return new Point(this.getAbsoluteX(), this.getAbsoluteY());
}

/**
 * Returns the absolute y-position of the port.
 *
 * @type Point
 **/
Port.prototype.getAbsoluteBounds=function()
{
  return new Dimension(this.getAbsoluteX(), this.getAbsoluteY(),this.getWidth(),this.getHeight());
}

/**
 * Returns the absolute y-position of the port.
 *
 * @type int
 **/
Port.prototype.getAbsoluteY=function()
{
  return this.originY+ this.parentNode.getY();
}

/**
 * Returns the absolute x-position of the port.
 *
 * @type int 
 **/
Port.prototype.getAbsoluteX=function()
{
  return this.originX+this.parentNode.getX();
}

/**
 * Callback method of the movemoent of a figure
 * @see Figure#attachMoveListener
 * @param {Figure} figure The figure which has been moved
 **/
Port.prototype.onOtherFigureMoved=function(/*:Figure*/ figure)
{
  // Falls sich der parentNode bewegt hat, dann muss der Port dies seinen
  // Connections mitteilen
  this.fireMoveEvent();
}

/**
 * Return the name of this port.
 * @see Node#getPort
 * @type String
 **/
Port.prototype.getName = function()
{
  // wird in einem Property gespeichert, da dieses später via XMLSerializer wird geladen werden muss.
  // Der Serializer kümmert sich allerdings im Moment nur um die Properties.
  return this.getProperty("name");
}

/**
 * Set the name of this port.
 * @see Node#getPort
 * @param {String} name The new name of this port.
 **/
Port.prototype.setName = function(/*:String*/ name)
{
  // wird in einem Property gespeichert, da dieses später via XMLSerializer wird geladen werden muss.
  // Der Serializer kümmert sich allerdings im Moment nur um die Properties.
  this.setProperty("name",name);
}

Port.prototype.isOver = function (/*:int*/ iX ,/*:int*/ iY)
{
    var x = this.getAbsoluteX()-this.coronaWidth-this.getWidth()/2;
    var y = this.getAbsoluteY()-this.coronaWidth-this.getHeight()/2;
    var iX2 = x + this.width + (this.coronaWidth*2)+this.getWidth()/2;
    var iY2 = y + this.height + (this.coronaWidth*2)+this.getHeight()/2;
    return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
}

/**
 *
 * @private
 */
Port.prototype.showCorona = function (/*:boolean*/ flag, /*:float*/ diameter)
{
  if(flag == true)
  {
   this.corona = new Corona();
   this.corona.setAlpha(0.3);
   this.corona.setBackgroundColor(new  Color(0,125,125));
   this.corona.setColor(null);
   this.corona.setDimension(this.getWidth()+(this.getCoronaWidth()*2),this.getWidth()+(this.getCoronaWidth()*2));
   this.parentNode.getWorkflow().addFigure(this.corona,this.getAbsoluteX()-this.getCoronaWidth()-this.getWidth()/2, this.getAbsoluteY()-this.getCoronaWidth()-this.getHeight()/2);
  }
  else if(flag==false && this.corona!=null)
  {
   this.parentNode.getWorkflow().removeFigure(this.corona);
   this.corona = null;
  }
}