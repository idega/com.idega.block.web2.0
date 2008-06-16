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
ArrowConnection=function()
{
  ArrowLine.call(this);
  this.sourcePort = null;
  this.targetPort = null;
  this.lineSegments = new Array();
  this.setColor(new  Color(0,0,115));
  this.setLineWidth(1);
}
ArrowConnection.prototype = new ArrowLine;
ArrowConnection.prototype.type="ArrowConnection";

ArrowConnection.prototype.disconnect=function()
{
  if(this.sourcePort!=null)
    this.sourcePort.detachMoveListener(this);
  if(this.targetPort!=null)
    this.targetPort.detachMoveListener(this);
}

ArrowConnection.prototype.reconnect=function()
{
  if(this.sourcePort!=null)
    this.sourcePort.attachMoveListener(this);
  if(this.targetPort!=null)
    this.targetPort.attachMoveListener(this);
}

ArrowConnection.prototype.isConnector = function()
{
   return true;
}

ArrowConnection.prototype.isResizeable=function()
{
  return false;
}

ArrowConnection.prototype.setSource=function(/*:Port*/ port)
{
  if(this.sourcePort!=null)
    this.sourcePort.detachMoveListener(this);

  this.sourcePort = port;
  if(this.sourcePort==null)
    return;
  this.sourcePort.attachMoveListener(this);
  this.setStartPoint(port.getAbsoluteX(), port.getAbsoluteY());
}

ArrowConnection.prototype.getSource=function()
{
  return this.sourcePort;
}

ArrowConnection.prototype.setTarget=function(/*:Port*/ port)
{
  if(this.targetPort!=null)
    this.targetPort.detachMoveListener(this);

  this.targetPort = port;
  if(this.targetPort==null)
    return;
  this.targetPort.attachMoveListener(this);
  this.setEndPoint(port.getAbsoluteX(), port.getAbsoluteY());
}

ArrowConnection.prototype.getTarget=function()
{
  return this.targetPort;
}

ArrowConnection.prototype.onOtherFigureMoved=function(/*:Figure*/ figure)
{
  if(figure==this.sourcePort)
    this.setStartPoint(this.sourcePort.getAbsoluteX(), this.sourcePort.getAbsoluteY());
  else
    this.setEndPoint(this.targetPort.getAbsoluteX(), this.targetPort.getAbsoluteY());
}