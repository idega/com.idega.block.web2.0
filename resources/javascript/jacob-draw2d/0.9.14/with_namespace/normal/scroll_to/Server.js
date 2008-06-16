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


/****************************************************************/
/** See the "AJAX" annotations for the server backend binding. **/
/****************************************************************/

draw2d.Server=function(/*:String*/ pkey, /*:String*/ ip, /*:String*/ state)
{
  this.label = new draw2d.Label(ip);
  this.label.setCanDrag(false);
  this.label.setSelectable(false);
  this.label.setBackgroundColor(new  draw2d.Color(255,255,255));
  this.label.setBorder(new draw2d.LineBorder());

  this.req==null;
  this.pkey = pkey;
  this.ip   = ip;
  this.state= state;
  if(this.state== "up")
    draw2d.ImageFigure.call(this,"Server_up.png");
  else
    draw2d.ImageFigure.call(this,"Server_down.png");
/*  @AJAX: Be in synch with the backend. Retrieve all 5 sec. the new server state.
  this.timer = window.setInterval("run(\""+this.id+"\")",5000);
*/
  this.setDimension(54,60)
}

/* @AJAX: required to update the state of the "Server" figure.
 * 
function run(objId)
{
  var figure = workflow.getFigure(objId);
  if(figure!=null)
    figure.updateState();
}
*/

draw2d.Server.prototype = new draw2d.ImageFigure;
/** @private **/
draw2d.Server.prototype.type="Server";


/**
 * Remove this server figure from the backend database.
 *
 * @private
 **/
draw2d.Server.prototype.dispose=function()
{
  overviewWindow.removeServer(this);

  this.workflow.removeFigure(this.label);
  draw2d.ImageFigure.prototype.dispose.call(this);

 /* @AJAX: Remove the "Server" in the backend
  * 
  if (window.XMLHttpRequest) this.req = new XMLHttpRequest();
  else if (window.ActiveXObject) this.req = new ActiveXObject("Microsoft.XMLHTTP");
  else return; // fall on our sword
  this.req.open("get", "delete_server.jsp?pkey="+this.pkey+"&browser="+browserId);
  this.req.setRequestHeader('content-type', 'text/plain');
  this.req.send(null);
 */
}

/**
 *
 **/
draw2d.Server.prototype.isReachable=function()
{
   return this.state =="up";
}

draw2d.Server.prototype.createHTMLElement=function()
{
    var item = draw2d.ImageFigure.prototype.createHTMLElement.call(this);
    item.style.width=this.width+"px";
    item.style.height=this.height+"px";
    item.style.margin="0px";
    item.style.padding="0px";
    item.style.border="0px";

    return item;
}

/**
 * Add an additional label to canvas if a workflow/canvas assigned to this object.
 *
 **/ 
draw2d.Server.prototype.setWorkflow=function(/*:draw2d.Workflow*/ workflow )
{
  draw2d.ImageFigure.prototype.setWorkflow.call(this,workflow);

  if(workflow==null)
    return;
  workflow.addFigure(this.label,this.x-20,this.y-10);
}


/**
 * Will be called after a drag and drop action
 **/
draw2d.Server.prototype.onDragend = function()
{
  draw2d.ImageFigure.prototype.onDragend.call(this);
  /* @AJAX:  Save the new Position in the backend database.
  
  if (window.XMLHttpRequest) this.req = new XMLHttpRequest();
  else if (window.ActiveXObject) this.req = new ActiveXObject("Microsoft.XMLHTTP");
  else return; // fall on our sword
  
  var saveUrl = "save_position.jsp?pkey="+this.pkey+"&browser="+browserId+"&pos_x="+this.x+"&pos_y="+this.y;
  this.req.open("get", saveUrl);
  this.req.setRequestHeader('content-type', 'text/plain');
  this.req.send(null);
  */
}

/**
 * Callback method for the double click event of user interaction.
 **/
draw2d.Server.prototype.onDoubleClick=function()
{
  var value = prompt("Server IP:", this.ip);
  if(value==null)
     return;
  this.ip = value; 

  /* @AJAX: Save the new IP Address on the backend
   *
  if (window.XMLHttpRequest) this.req = new XMLHttpRequest();
  else if (window.ActiveXObject) this.req = new ActiveXObject("Microsoft.XMLHTTP");
  else return; // fall on our sword
  var saveUrl = "save_ip.jsp?pkey="+this.pkey+"&browser="+browserId+"&ip="+this.ip;
  var oThis = this;
  this.req.open("get", saveUrl);
  this.req.setRequestHeader('content-type', 'text/plain');
  this.req.onreadystatechange = function ()
  {
      if (oThis.req.readyState == 4) 
      {
        oThis.updateState();
        oThis.req.onreadystatechange = null;
      }
  };
  this.req.send(null);
  */
  this.updateLabel();
}

draw2d.Server.prototype.onDrag = function()
{
  draw2d.ImageFigure.prototype.onDrag.call(this);
  this.updateLabel();
}

draw2d.Server.prototype.setPosition=function(/*:int*/ xPos , /*:int*/yPos )
{
  draw2d.ImageFigure.prototype.setPosition.call(this,xPos,yPos);
  this.updateLabel();
}

draw2d.Server.prototype.updateLabel=function()
{
  this.label.setText(this.ip);
  var xpos = this.getX()+(this.getWidth()/2)-(this.label.getWidth()/2);
  this.label.setPosition(xpos,this.y-this.label.getHeight()-3);
}

/**
 * Will be called after a drag and drop action
 **/

/*  @AJAX: Update the state of the object. The backend returns "up" or "down" to the handsover server id.
 *
Server.prototype.updateState = function()
{
  if (window.XMLHttpRequest) 
  	this.req = new XMLHttpRequest();
  else if (window.ActiveXObject) 
  	this.req = new ActiveXObject("Microsoft.XMLHTTP");
  else 
  	return; // fall on our sword

  var oThis = this;
  this.req.onreadystatechange = function ()
  {
      if (oThis.req.readyState == 4) 
      {
        oThis.req.onreadystatechange = null;
        var newState = oThis.req.responseText.trim();
        // only change anthing if the state of the server has been changed
        //
        if(newState == oThis.state)
           return;
        oThis.state = newState;
        if(oThis.state== "up")
        {
            oThis.setImage("Server_up.png");
            alertWindow.removeServer(oThis.id);
        }
        else
        {
            oThis.setImage("Server_down.png");
            alertWindow.addServer(oThis.id);
        }
      }
  };
  this.req.open("get", "reachable.jsp?pkey="+this.pkey+"&browser="+browserId);
  this.req.setRequestHeader('content-type', 'text/plain');
  this.req.send(null);
}
*/