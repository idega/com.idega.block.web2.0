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

draw2d.OverviewWindow=function(/*:String*/ name)
{
  draw2d.Window.call(this,"Overview Window");

  this.setDimension(180,150);
  this.servers= new Object();
  this.name   = name;
}

draw2d.OverviewWindow.prototype = new draw2d.Window;
/** @private **/
draw2d.OverviewWindow.prototype.type="OverviewWindow";

draw2d.OverviewWindow.prototype.createHTMLElement=function()
{
  var item = draw2d.Window.prototype.createHTMLElement.call(this);
  this.inputDiv = document.createElement("div");
  this.inputDiv.style.position="absolute";
  this.inputDiv.style.left = "10px";
  this.inputDiv.style.top = "20px";
  this.inputDiv.style.overflow="auto";
  this.inputDiv.style.border="1px solid black";
  this.inputDiv.style.font="normal 10px verdana";
  item.appendChild(this.inputDiv);

  return item;
}

/**
 * Resize the scrolling server list if the parent window resizes.
 *
 **/ 
draw2d.OverviewWindow.prototype.setDimension=function(/*:int*/ w,/*:int*/ h)
{
  draw2d.Window.prototype.setDimension.call(this,w,h);
  if(this.inputDiv!=null)
  {
    this.inputDiv.style.height=(h-30)+"px";
    this.inputDiv.style.width=(w-20)+"px";
  }
}

draw2d.OverviewWindow.prototype.addServer=function(/*:Server */ server)
{
  this.servers[server.id] = server;
  this.createList();
}


draw2d.OverviewWindow.prototype.removeServer=function(/*:Server */ server)
{
  this.servers[server.id] = null;
  this.createList();
}

/**
 * Create the figure list and add to all entries an onClick event.
 *
 **/
draw2d.OverviewWindow.prototype.createList=function()
{
  this.inputDiv.innerHTML="";
  var list = document.createElement("ul");
  for(key in this.servers)
  {
    var server = this.servers[key];
    if(server!=null)
    {
      var li = document.createElement("li");
      var a  = document.createElement("a");
      a.href = "javascript:draw2d.OverviewWindow.scrollTo('"+server.id+"')";
      a.innerHTML = server.ip;
      li.appendChild(a);
      if(server.isReachable())
      {
         a.style.color = "green";
      }
      else
      {
         a.style.color = "red";
         a.style.fontWeight = "bold";
      }

      list.appendChild(li);
    }
  }
  this.inputDiv.appendChild(list);
}

/**
 * NO "prototype". This is a static class function.
 */
draw2d.OverviewWindow.scrollTo= function(/*: String */ id)
{
  var server =workflow.getFigure(id);
  workflow.scrollTo(server.getX()-draw2d.OverviewWindow.screenWidth()/2,server.getY()-draw2d.OverviewWindow.screenHeight()/2);
}


/**
 * Will be called after a drag and drop action of this window
 *
 **/
draw2d.OverviewWindow.prototype.onDragend = function()
{
  draw2d.Window.prototype.onDragend.call(this);
  
  /* AJAX: Save the position persitent in the backend
   *
  if (window.XMLHttpRequest) this.req = new XMLHttpRequest();
  else if (window.ActiveXObject) this.req = new ActiveXObject("Microsoft.XMLHTTP");
  else return; // fall on our sword
  
  var saveUrl = "save_window.jsp?name="+this.name+"&browser="+browserId+"&pos_x="+this.x+"&pos_y="+this.y;
  this.req.open("get", saveUrl);
  this.req.setRequestHeader('content-type', 'text/plain');
  this.req.send(null);
  */
}

/**
 * TODO: move them to a IE / Firefox compatibility layer.
 *
 * NO "prototype". This is a static class function.
 * @private util function
 **/
draw2d.OverviewWindow.screenWidth=function ()
{
  var myWidth = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
  }
  return myWidth;
}

/**
 * TODO: move them to a IE / Firefox compatibility. layer.
 *
 * NO "prototype". This is a static class function.
 * @private util function
 **/
draw2d.OverviewWindow.screenHeight=function ()
{
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }
  return myHeight;
}


