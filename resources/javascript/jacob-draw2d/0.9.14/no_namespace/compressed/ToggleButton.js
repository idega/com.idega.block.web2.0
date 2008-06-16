/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

ToggleButton=function(_11e2){Button.call(this,_11e2);this.isDownFlag=false;};ToggleButton.prototype=new Button;ToggleButton.prototype.type="ToggleButton";ToggleButton.prototype.createHTMLElement=function(){var item=document.createElement("div");item.id=this.id;item.style.position="absolute";item.style.left=this.x+"px";item.style.top=this.y+"px";item.style.height="24px";item.style.width="24px";item.style.margin="0px";item.style.padding="0px";if(this.getImageUrl()!=null){item.style.backgroundImage="url("+this.getImageUrl()+")";}else{item.style.backgroundImage="";}var oThis=this;this.omousedown=function(event){if(oThis.enabled){if(!oThis.isDown()){Button.prototype.setActive.call(oThis,true);}}event.cancelBubble=true;event.returnValue=false;};this.omouseup=function(event){if(oThis.enabled){if(oThis.isDown()){Button.prototype.setActive.call(oThis,false);}oThis.isDownFlag=!oThis.isDownFlag;oThis.execute();}event.cancelBubble=true;event.returnValue=false;};if(item.addEventListener){item.addEventListener("mousedown",this.omousedown,false);item.addEventListener("mouseup",this.omouseup,false);}else{if(item.attachEvent){item.attachEvent("onmousedown",this.omousedown);item.attachEvent("onmouseup",this.omouseup);}}return item;};ToggleButton.prototype.isDown=function(){return this.isDownFlag;};ToggleButton.prototype.setActive=function(flag){Button.prototype.setActive.call(this,flag);this.isDownFlag=flag;};ToggleButton.prototype.execute=function(){};