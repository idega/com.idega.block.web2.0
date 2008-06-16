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
 * @class A Connection is the line between two {@link draw2d.Port}s.
 *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.Connection=function()
{
  draw2d.Line.call(this);

  /** @private **/
  this.sourcePort = null;
  /** @private **/
  this.targetPort = null;

  /** @private **/
  this.sourceDecorator = null; /*:draw2d.ConnectionDecorator*/

  /** @private **/
  this.targetDecorator = null; /*:draw2d.ConnectionDecorator*/

  /** @private **/
  this.sourceAnchor = new draw2d.ConnectionAnchor();

  /** @private **/
  this.targetAnchor = new draw2d.ConnectionAnchor();


  /** @private **/
  this.router = draw2d.Connection.defaultRouter;

  /** @private **/
  this.lineSegments = new draw2d.ArrayList();

  this.children = new draw2d.ArrayList();

  this.setColor(new  draw2d.Color(0,0,115));
  this.setLineWidth(1);
}

draw2d.Connection.prototype = new draw2d.Line;

draw2d.Connection.defaultRouter = new draw2d.ManhattanConnectionRouter();

draw2d.Connection.setDefaultRouter=function(/*:draw2d.ConnectionRouter*/ router)
{
   draw2d.Connection.defaultRouter = router;
}

/**
 * @private
 **/
draw2d.Connection.prototype.disconnect=function()
{
  if(this.sourcePort!=null)
  {
    this.sourcePort.detachMoveListener(this);
    this.fireSourcePortRouteEvent();
  }

  if(this.targetPort!=null)
  {
    this.targetPort.detachMoveListener(this);
    this.fireTargetPortRouteEvent();
  }
}

/**
 * @private
 **/
draw2d.Connection.prototype.reconnect=function()
{
  if(this.sourcePort!=null)
  {
    this.sourcePort.attachMoveListener(this);
    this.fireSourcePortRouteEvent();
  }
  if(this.targetPort!=null)
  {
    this.targetPort.attachMoveListener(this);
    this.fireTargetPortRouteEvent();
  }
}


/**
 * You can't drag&drop the resize handles of a connector.
 * @type boolean
 **/
draw2d.Connection.prototype.isResizeable=function()
{
  return true;
}

/**
 * Add a child figure to the Connection. The hands over figure doesn't support drag&drop 
 * operations.
 *
 * @param {draw2d.Figure} figure the figure to add as decoration to the connection.
 * @param {draw2d.ConnectionLocator} locator the locator for the child. 
**/
draw2d.Connection.prototype.addFigure=function(/*:draw2d.Figure*/ figure, /*:draw2d.ConnectionLocator*/ locator)
{
  var entry = new Object();
  entry.figure  = figure;
  entry.locator = locator;

  this.children.add(entry);
  if(this.graphics !=null)
    this.paint();
}

/**
 * Set the ConnectionDecorator for this object.
 *
 **/
draw2d.Connection.prototype.setSourceDecorator=function(/*:draw2d.ConnectionDecorator*/ decorator)
{
  this.sourceDecorator = decorator;
  if(this.graphics !=null)
    this.paint();
}

/**
 * Set the ConnectionDecorator for this object.
 *
 **/
draw2d.Connection.prototype.setTargetDecorator=function(/*:draw2d.ConnectionDecorator*/ decorator)
{
  this.targetDecorator = decorator;
  if(this.graphics !=null)
    this.paint();
}

/**
 * Set the ConnectionAnchor for this object.
 *
 **/
draw2d.Connection.prototype.setSourceAnchor=function(/*:draw2d.ConnectionAnchor*/ anchor)
{
  this.sourceAnchor = anchor;
  this.sourceAnchor.setOwner(this.sourcePort);
  if(this.graphics !=null)
    this.paint();
}

/**
 * Set the ConnectionAnchor for this object.
 *
 **/
draw2d.Connection.prototype.setTargetAnchor=function(/*:draw2d.ConnectionAnchor*/ anchor)
{
  this.targetAnchor = anchor;
  this.targetAnchor.setOwner(this.targetPort);
  if(this.graphics !=null)
    this.paint();
}


/**
 * Set the ConnectionRouter for this object.
 *
 **/
draw2d.Connection.prototype.setRouter=function(/*:draw2d.ConnectionRouter*/ router)
{
  if(router !=null)
   this.router = router;
  else
   this.router = new draw2d.NullConnectionRouter();

  // repaint the connection with the new router
  if(this.graphics !=null)
     this.paint();
}

/**
 * Return the current active router of this connection.
 *
 * @type draw2d.ConnectionRouter
 **/
draw2d.Connection.prototype.getRouter=function()
{
  return this.router;
}

/**
 * @private
 **/
draw2d.Connection.prototype.paint=function()
{
  // Hack for the IE:
  // All HTML fragments of the children are corrupt If I clear the graphics context
  // This doesn't happens with the firefox.
  //
  // remove first the children before we set the innerHTML of the context to "";
  //
  for(var i=0; i<this.children.getSize();i++)
  {
     var entry = this.children.get(i);
     if(entry.isAppended==true)
        this.html.removeChild(entry.figure.getHTMLElement());
     entry.isAppended=false;
  }

  if(this.graphics ==null)
    this.graphics = new jsGraphics(this.id);
  else
    this.graphics.clear();

  this.graphics.setStroke(this.stroke);
  this.graphics.setColor(this.lineColor.getHTMLStyle());

   this.startStroke();

  // Use the internal router if any has been set....
  //
  this.router.route(this);

  // paint the decorator if any exists
  //
  if(this.getSource().getParent().isMoving==false && this.getTarget().getParent().isMoving==false )
  {
   if(this.targetDecorator!=null)
      this.targetDecorator.paint(new draw2d.Graphics(this.graphics,this.getEndAngle(),this.getEndPoint()));

   if(this.sourceDecorator!=null)
      this.sourceDecorator.paint(new draw2d.Graphics(this.graphics,this.getStartAngle(),this.getStartPoint()));
  }
  this.finishStroke();

  for(var i=0; i<this.children.getSize();i++)
  {
     var entry = this.children.get(i);
     this.html.appendChild(entry.figure.getHTMLElement());
     entry.isAppended=true;
     entry.locator.relocate(entry.figure);
  }
}

/**
 * Return the recalculated position of the start point if we have set an anchor.
 * 
 * @type draw2d.Point
 **/
 draw2d.Connection.prototype.getStartPoint= function()
 {
  if(this.isMoving==false)
     return this.sourceAnchor.getLocation(this.targetAnchor.getReferencePoint());
  else
     return draw2d.Line.prototype.getStartPoint.call(this);
 }


/**
 * Return the recalculated position of the start point if we have set an anchor.
 *
 * @type draw2d.Point
 **/
 draw2d.Connection.prototype.getEndPoint= function()
 {
  if(this.isMoving==false)
     return this.targetAnchor.getLocation(this.sourceAnchor.getReferencePoint());
  else
     return draw2d.Line.prototype.getEndPoint.call(this);
 }


/*
 * @private
 *
 **/
draw2d.Connection.prototype.startStroke=function()
{
 this.oldPoint=null;
 this.lineSegments = new draw2d.ArrayList();
}

/*
 * @private
 *
 **/
draw2d.Connection.prototype.finishStroke=function()
{
  this.graphics.paint();
  this.oldPoint=null;
}

/**
 * Returns the fulcrms of the connection
 *
 * @return an draw2d.ArrayList of type draw2d.Point
 * @type draw2d.ArrayList 
 **/
draw2d.Connection.prototype.getPoints=function()
{
  var result = new draw2d.ArrayList();
  var line;
  for(var i = 0; i< this.lineSegments.getSize();i++)
  {
     line = this.lineSegments.get(i);
     result.add(line.start);
  }
  // add the last point
  result.add(line.end);
  return result;
}

/*
 * @private
 *
 **/
draw2d.Connection.prototype.addPoint=function(/*:draw2d.Point*/ p)
{
  p = new draw2d.Point(parseInt(p.x), parseInt(p.y));
  if(this.oldPoint!=null)
  {
    this.graphics.drawLine(this.oldPoint.x,this.oldPoint.y, p.x, p.y);
// For ConnectionRouter debugging only. All fulcrum point will be marked.
//
//    this.graphics.fillEllipse(p.x-3, p.y-3,6,6); 
//    this.graphics.drawString(""+this.lineSegments.length,p.x, p.y);

    // store the painted line segment for the "mouse selection test"
    // (required for user interaction)
    var line = new Object();
    line.start = this.oldPoint;
    line.end   = p;
    this.lineSegments.add(line);
  }


  this.oldPoint = new Object();
  this.oldPoint.x = p.x;
  this.oldPoint.y = p.y;
}


/**
 * Set the new source port of this connection. This enforce a repaint of the connection.
 *
 * @param {draw2d.Port} port The new source port of this connection.
 * 
 **/
draw2d.Connection.prototype.setSource=function(/*:draw2d.Port*/ port)
{
  if(this.sourcePort!=null)
    this.sourcePort.detachMoveListener(this);

  this.sourcePort = port;
  if(this.sourcePort==null)
    return;
  this.sourceAnchor.setOwner(this.sourcePort);
  this.fireSourcePortRouteEvent();
  this.sourcePort.attachMoveListener(this);
  this.setStartPoint(port.getAbsoluteX(), port.getAbsoluteY());
}

/**
 * Returns the source port of this connection.
 *
 * @type draw2d.Port
 **/
draw2d.Connection.prototype.getSource=function()
{
  return this.sourcePort;
}

/**
 * Set the target port of this connection. This enforce a repaint of the connection.
 * 
 * @param {draw2d.Port} port The new target port of this connection
 **/
draw2d.Connection.prototype.setTarget=function(/*:draw2d.Port*/ port)
{
  if(this.targetPort!=null)
    this.targetPort.detachMoveListener(this);

  this.targetPort = port;
  if(this.targetPort==null)
    return;
  this.targetAnchor.setOwner(this.targetPort);
  this.fireTargetPortRouteEvent();
  this.targetPort.attachMoveListener(this);
  this.setEndPoint(port.getAbsoluteX(), port.getAbsoluteY());
}

/**
 * Returns the target port of this connection.
 *
 * @type draw2d.Port
 **/
draw2d.Connection.prototype.getTarget=function()
{
  return this.targetPort;
}

/**
 * @see draw2d.Figure#onOtherFigureMoved
 **/
draw2d.Connection.prototype.onOtherFigureMoved=function(/*:draw2d.Figure*/ figure)
{
  if(figure==this.sourcePort)
    this.setStartPoint(this.sourcePort.getAbsoluteX(), this.sourcePort.getAbsoluteY());
  else
    this.setEndPoint(this.targetPort.getAbsoluteX(), this.targetPort.getAbsoluteY());
}

/**
 * Checks if the hands over coordinate hits the line.
 *
 * @param {int} px the x coordinate of the test point
 * @param {int} py the y coordinate of the test point
 * @type boolean
 **/
draw2d.Connection.prototype.containsPoint= function(/*:int*/ px, /*:int*/ py)
{
  for(var i = 0; i< this.lineSegments.getSize();i++)
  {
     var line = this.lineSegments.get(i);
     if(draw2d.Line.hit(line.start.x,line.start.y,line.end.x, line.end.y, px,py))
       return true;
  }
  return false;
}

draw2d.Connection.prototype.getStartAngle=function()
{
  var p1 = this.lineSegments.get(0).start;
  var p2 = this.lineSegments.get(0).end;
  if(this.router instanceof draw2d.BezierConnectionRouter)
  {
   p2 = this.lineSegments.get(5).end;
  }
  var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
  var angle = -(180/Math.PI) *Math.asin((p1.y-p2.y)/length);

  if(angle<0)
  {
     if(p2.x<p1.x)
       angle = Math.abs(angle) + 180;
     else
       angle = 360- Math.abs(angle);
  }
  else
  {
     if(p2.x<p1.x)
       angle = 180-angle;
  }
  return angle;
}

draw2d.Connection.prototype.getEndAngle=function()
{
  var p1 = this.lineSegments.get(this.lineSegments.getSize()-1).end;
  var p2 = this.lineSegments.get(this.lineSegments.getSize()-1).start;
  if(this.router instanceof draw2d.BezierConnectionRouter)
  {
   p2 = this.lineSegments.get(this.lineSegments.getSize()-5).end;
  }
  var length = Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
  var angle = -(180/Math.PI) *Math.asin((p1.y-p2.y)/length);

  if(angle<0)
  {
     if(p2.x<p1.x)
       angle = Math.abs(angle) + 180;
     else
       angle = 360- Math.abs(angle);
  }
  else
  {
     if(p2.x<p1.x)
       angle = 180-angle;
  }
  return angle;
}


/**
 * @private
 **/
draw2d.Connection.prototype.fireSourcePortRouteEvent=function()
{
    // enforce a repaint of all connections which are related to this port
    // this is required for a "FanConnectionRouter" or "ShortesPathConnectionRouter"
    //
   var connections = this.sourcePort.getConnections();
   for(var i=0; i<connections.getSize();i++)
   {
      connections.get(i).paint();
   }
}

/**
 * @private
 **/
draw2d.Connection.prototype.fireTargetPortRouteEvent=function()
{
    // enforce a repaint of all connections which are related to this port
    // this is required for a "FanConnectionRouter" or "ShortesPathConnectionRouter"
    //
   var connections = this.targetPort.getConnections();
   for(var i=0; i<connections.getSize();i++)
   {
      connections.get(i).paint();
   }
}
