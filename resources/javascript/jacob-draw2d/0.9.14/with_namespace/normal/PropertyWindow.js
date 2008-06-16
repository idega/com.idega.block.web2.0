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
draw2d.PropertyWindow=function()
{
  /** @private **/
  this.currentSelection = null;
  draw2d.Window.call(this,"Property Window");
  this.setDimension(200,100);
}
draw2d.PropertyWindow.prototype = new draw2d.Window;
/** @private **/
draw2d.PropertyWindow.prototype.type="PropertyWindow";


/**
 * @private
 **/
draw2d.PropertyWindow.prototype.dispose=function()
{
  draw2d.Window.prototype.dispose.call(this);
}

/**
 * @private
 **/
draw2d.PropertyWindow.prototype.createHTMLElement=function()
{
  var item = draw2d.Window.prototype.createHTMLElement.call(this);

  item.appendChild(this.createLabel("Type:", 15,25));
  item.appendChild(this.createLabel("X :", 15,50));
  item.appendChild(this.createLabel("Y :", 15,70));
  item.appendChild(this.createLabel("Width :", 85,50));
  item.appendChild(this.createLabel("Height :", 85,70));

  this.labelType   = this.createLabel("",50,25);
  this.labelX      = this.createLabel("",40,50);
  this.labelY      = this.createLabel("",40,70);
  this.labelWidth = this.createLabel("",135,50);
  this.labelHeight = this.createLabel("",135,70);
  this.labelType.style.fontWeight="normal";
  this.labelX.style.fontWeight="normal";
  this.labelY.style.fontWeight="normal";
  this.labelWidth.style.fontWeight="normal";
  this.labelHeight.style.fontWeight="normal";

  item.appendChild(this.labelType);
  item.appendChild(this.labelX);
  item.appendChild(this.labelY);
  item.appendChild(this.labelWidth);
  item.appendChild(this.labelHeight);

  return item;
}

draw2d.PropertyWindow.prototype.onSelectionChanged=function(figure /*:draw2d.Figure*/)
{
  draw2d.Window.prototype.onSelectionChanged.call(this,figure);

  if(this.currentSelection!=null)
    this.currentSelection.detachMoveListener(this);

  this.currentSelection = figure;

  if(figure!=null && figure !=this)
  {
    this.labelType.innerHTML=figure.type;
    if(figure.getX)
    {
      this.labelX.innerHTML=figure.getX();
      this.labelY.innerHTML=figure.getY();
      this.labelWidth.innerHTML=figure.getWidth();
      this.labelHeight.innerHTML=figure.getHeight();
      this.currentSelection = figure;
      this.currentSelection.attachMoveListener(this);
    }
    else
    {
      this.labelX.innerHTML="";
      this.labelY.innerHTML="";
      this.labelWidth.innerHTML="";
      this.labelHeight.innerHTML="";
    }
  }
  else
  {
    this.labelType.innerHTML="&lt;none&gt;";
    this.labelX.innerHTML="";
    this.labelY.innerHTML="";
    this.labelWidth.innerHTML="";
    this.labelHeight.innerHTML="";
  }
}

draw2d.PropertyWindow.prototype.getCurrentSelection=function()
{
  return this.currentSelection;
}

draw2d.PropertyWindow.prototype.onOtherFigureMoved=function(figure /*:draw2d.Figure*/)
{
  if(figure == this.currentSelection)
    this.onSelectionChanged(figure);
}

draw2d.PropertyWindow.prototype.createLabel=function(text /*:String*/, x /*:int*/, y /*:int*/)
{
  var l = document.createElement("div");
  l.style.position="absolute";
  l.style.left   = x+"px";
  l.style.top    = y+"px";
  l.style.font="normal 10px verdana";
  l.style.whiteSpace="nowrap";
  l.style.fontWeight="bold";
  l.innerHTML = text;

  return l;
}

