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
MyLinkFigure=function()
{
  Rectangle.call(this);
  this.setDimension(50,50);
  this.setBackgroundColor(new  Color(220,255,255));
}

MyLinkFigure.prototype = new Rectangle;
/** @private**/
MyLinkFigure.prototype.type="MyLinkFigure";


MyLinkFigure.prototype.createHTMLElement=function()
{
  var item = Rectangle.prototype.createHTMLElement.call(this);

  this.time = document.createElement('a');
  this.time.href="#";
  this.time.style.position="absolute";
  this.time.style.left="5px";
  this.time.style.top="5px";
//  this.time.style.width="50px";
//  this.time.style.height="15px";
  this.time.style.backgroundColor="rgb(255,255,128)";
  this.time.style.fontSize="9pt";
  this.time.style.padding="8px";
  this.time.style.border="1px solid rgb(255,128,255)";
  this.time.style.textAlign="left";
  this.time.style.fontSize="9px";
  this.time.style.whiteSpace="nowrap";
  this.time.innerHTML="click";
  var oThis = this;
  var tmp=function(){oThis.requestDay();};
  this.time.onclick=tmp;
  this.disableTextSelection(this.time);

  item.appendChild(this.time);

  return item;
}

MyLinkFigure.prototype.requestDay=function()
{

//  var dialog = new PropertyDialog(this,"day","Maximale Bearbeitungzeit in Tagen:");
//  this.getWorkflow().showDialog(dialog, this.getX(), this.getY());
var obj = new Circle(200);
this.getWorkflow().addFigure(obj,this.getX(), this.getY());
//  dialog.input.focus();
}
/** 
 *
 **/
MyLinkFigure.prototype.toggle=function()
{
  if(this.highlight)
    this.setBackgroundColor(new  Color(245,115,115));
  else
    this.setBackgroundColor(new  Color(115,245,115));
  this.highlight = !this.highlight;
}