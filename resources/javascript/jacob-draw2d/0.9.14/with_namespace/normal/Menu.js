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
s *
 * @version 0.9.14
 * @author Andreas Herz
 * @constructor
 */
draw2d.Menu=function()
{
   this.menuItems = new draw2d.ArrayList();
   draw2d.Figure.call(this);
   this.setSelectable(false);
   this.setDeleteable(false);
   this.setCanDrag(false);
   this.setResizeable(false);
   this.setSelectable(false);
   this.setZOrder(10000);
   this.dirty=false;
//   this.setBackgroundColor(new  draw2d.Color(255,200,200));
}

draw2d.Menu.prototype = new draw2d.Figure;
/** @private **/
draw2d.Menu.prototype.type="Menu";


draw2d.Menu.prototype.createHTMLElement=function()
{
   var item = document.createElement("div");

   item.style.position="absolute";
   item.style.left   = this.x+"px";
   item.style.top    = this.y+"px";
   item.style.margin = "0px";
   item.style.padding= "0px";
   item.style.zIndex = ""+draw2d.Figure.ZOrderBaseIndex;
   item.style.border= "1px solid gray";
   item.style.background = "lavender";
   item.style.cursor="pointer";

  return item;
}

draw2d.Menu.prototype.setWorkflow= function(/*:draw2d.Workflow*/ workflow)
{
  this.workflow = workflow;
}

/**
 * Returns [true] if the command can be execute and the execution of the
 * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
 * return false. Rhe execution of this Command doesn't modify the model.
 *
 **/
draw2d.Menu.prototype.appendMenuItem=function(/*:MenuItem*/ item)
{
  this.menuItems.add(item);
  item.parentMenu = this;
  this.dirty=true;
}

/**
 * @private
 **/
draw2d.Menu.prototype.getHTMLElement=function()
{
  var html = draw2d.Figure.prototype.getHTMLElement.call(this);
  if(this.dirty)
     this.createList();
  return html;
}

/**
 * Create the figure list and add to all entries an onClick event.
 *
 **/
draw2d.Menu.prototype.createList=function()
{
  this.dirty=false;
  this.html.innerHTML="";
  var oThis = this;
  for(var i=0;i<this.menuItems.getSize();i++)
  {
      var item = this.menuItems.get(i);

      var li = document.createElement("a");
      li.innerHTML = item.getLabel();
      li.style.display="block";
      li.style.fontFamily="Verdana, Arial, Helvetica, sans-serif";
      li.style.fontSize="9pt";
      li.style.color="dimgray";
      li.style.borderBottom="1px solid silver";
      li.style.paddingLeft="5px";
      li.style.paddingRight="5px";
      li.style.cursor="pointer";
      this.html.appendChild(li);

      li.menuItem = item;
      if (li.addEventListener) 
      {
         li.addEventListener("click",  function(event)
         {
            var oEvent = arguments[0] || window.event;
            oEvent.cancelBubble = true; 
            oEvent.returnValue = false;
            var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
            var diffY = oEvent.clientY;// - oThis.html.offsetTop;
            var scrollLeft= document.body.parentNode.scrollLeft;
            var scrollTop = document.body.parentNode.scrollTop;
            this.menuItem.execute(diffX+scrollLeft, diffY+scrollTop);
         }, false);
         li.addEventListener("mouseup",  function(event){event.cancelBubble = true; event.returnValue = false;}, false);
         li.addEventListener("mousedown",  function(event){event.cancelBubble = true; event.returnValue = false;}, false);
         li.addEventListener("mouseover", function(event){this.style.backgroundColor="silver";},false);
         li.addEventListener("mouseout", function(event){this.style.backgroundColor="transparent";},false);
      } 
      else if (li.attachEvent) 
      {
         li.attachEvent("onclick",  function(event)
         {
            var oEvent = arguments[0] || window.event;
            oEvent.cancelBubble = true; 
            oEvent.returnValue = false;
            var diffX = oEvent.clientX;// - oThis.html.offsetLeft;
            var diffY = oEvent.clientY;// - oThis.html.offsetTop;
            var scrollLeft= document.body.parentNode.scrollLeft;
            var scrollTop = document.body.parentNode.scrollTop;
            event.srcElement.menuItem.execute(diffX+scrollLeft, diffY+scrollTop);
         });
         li.attachEvent("onmousedown",  function(event){event.cancelBubble = true; event.returnValue = false;});
         li.attachEvent("onmouseup",  function(event){event.cancelBubble = true; event.returnValue = false;});
         li.attachEvent("onmouseover", function(event){event.srcElement.style.backgroundColor="silver";});
         li.attachEvent("onmouseout", function(event){event.srcElement.style.backgroundColor="transparent";});
      }
  }
}

