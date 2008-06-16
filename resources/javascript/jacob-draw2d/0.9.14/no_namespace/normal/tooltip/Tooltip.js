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
Tooltip=function(/*:String*/ msg)
{
  Annotation.call(this,msg);
  this.setCanDrag(false);
  this.setFontSize(8);
  this.setSelectable(false); 
  this.setDeleteable(false);
  this.setBorder(new LineBorder(1));
}

Tooltip.prototype = new  Annotation;
Tooltip.prototype.type="Tooltip";


Tooltip.prototype.createHTMLElement=function()
{
    var item = Annotation.prototype.createHTMLElement.call(this);
    item.style.margin="3px";
    item.style.padding="3px";
    item.style.paddingLeft="25px";
    item.style.background = "rgb(255,255,128) url(asterisk.png) no-repeat 3px 1px";
    item.style.zIndex=(Figure.ZOrderIndex+1);

    return item;
}
