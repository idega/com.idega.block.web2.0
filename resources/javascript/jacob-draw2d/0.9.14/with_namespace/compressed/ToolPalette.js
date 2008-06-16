/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToolPalette=function(title){draw2d.Window.call(this,title);this.setDimension(75,400);this.activeTool=null;this.children=new Object();};draw2d.ToolPalette.prototype=new draw2d.Window;draw2d.ToolPalette.prototype.type="ToolPalette";draw2d.ToolPalette.prototype.dispose=function(){draw2d.Window.prototype.dispose.call(this);};draw2d.ToolPalette.prototype.createHTMLElement=function(){var item=draw2d.Window.prototype.createHTMLElement.call(this);this.scrollarea=document.createElement("div");this.scrollarea.style.position="absolute";this.scrollarea.style.left="0px";if(this.hasTitleBar()){this.scrollarea.style.top="15px";}else{this.scrollarea.style.top="0px";}this.scrollarea.style.width=this.getWidth()+"px";this.scrollarea.style.height="15px";this.scrollarea.style.margin="0px";this.scrollarea.style.padding="0px";this.scrollarea.style.font="normal 10px verdana";this.scrollarea.style.borderBottom="2px solid gray";this.scrollarea.style.whiteSpace="nowrap";this.scrollarea.style.textAlign="center";this.scrollarea.style.overflowX="auto";this.scrollarea.style.overflowY="auto";this.scrollarea.style.overflow="auto";item.appendChild(this.scrollarea);return item;};draw2d.ToolPalette.prototype.setDimension=function(w,h){draw2d.Window.prototype.setDimension.call(this,w,h);if(this.scrollarea!=null){this.scrollarea.style.width=this.getWidth()+"px";if(this.hasTitleBar()){this.scrollarea.style.height=(this.getHeight()-15)+"px";}else{this.scrollarea.style.height=this.getHeight()+"px";}}};draw2d.ToolPalette.prototype.addChild=function(item){this.children[item.id]=item;this.scrollarea.appendChild(item.getHTMLElement());};draw2d.ToolPalette.prototype.getChild=function(id){return this.children[id];};draw2d.ToolPalette.prototype.getActiveTool=function(){return this.activeTool;};draw2d.ToolPalette.prototype.setActiveTool=function(tool){if(this.activeTool!=tool&&this.activeTool!=null){this.activeTool.setActive(false);}if(tool!=null){tool.setActive(true);}this.activeTool=tool;};