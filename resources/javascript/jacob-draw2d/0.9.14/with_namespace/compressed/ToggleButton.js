/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.ToggleButton=function(_287a){draw2d.Button.call(this,_287a);this.isDownFlag=false;};draw2d.ToggleButton.prototype=new draw2d.Button;draw2d.ToggleButton.prototype.type="ToggleButton";draw2d.ToggleButton.prototype.createHTMLElement=function(){var item=document.createElement("div");item.id=this.id;item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.height="24px";item.style.width="24px";item.style.margin="0px";item.style.padding="0px";if(this.getImageUrl()!=null){item.style.backgroundImage="url("+this.getImageUrl()+")";}else{item.style.backgroundImage="";}var oThis=this;this.omousedown=function(event){if(oThis.enabled){if(!oThis.isDown()){draw2d.Button.prototype.setActive.call(oThis,true);}}event.cancelBubble=true;event.returnValue=false;};this.omouseup=function(event){if(oThis.enabled){if(oThis.isDown()){draw2d.Button.prototype.setActive.call(oThis,false);}oThis.isDownFlag=!oThis.isDownFlag;oThis.execute();}event.cancelBubble=true;event.returnValue=false;};if(item.addEventListener){item.addEventListener("mousedown",this.omousedown,false);item.addEventListener("mouseup",this.omouseup,false);}else{if(item.attachEvent){item.attachEvent("onmousedown",this.omousedown);item.attachEvent("onmouseup",this.omouseup);}}return item;};draw2d.ToggleButton.prototype.isDown=function(){return this.isDownFlag;};draw2d.ToggleButton.prototype.setActive=function(flag){draw2d.Button.prototype.setActive.call(this,flag);this.isDownFlag=flag;};draw2d.ToggleButton.prototype.execute=function(){};