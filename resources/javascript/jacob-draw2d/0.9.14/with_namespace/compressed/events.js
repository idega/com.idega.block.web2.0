/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

var draw2d=new Object();draw2d.Event=function(){this.type=null;this.target=null;this.relatedTarget=null;this.cancelable=false;this.timeStamp=null;this.returnValue=true;};draw2d.Event.prototype.initEvent=function(sType,_2c88){this.type=sType;this.cancelable=_2c88;this.timeStamp=(new Date()).getTime();};draw2d.Event.prototype.preventDefault=function(){if(this.cancelable){this.returnValue=false;}};draw2d.Event.fireDOMEvent=function(_2c89,_2c8a){if(document.createEvent){var evt=document.createEvent("Events");evt.initEvent(_2c89,true,true);_2c8a.dispatchEvent(evt);}else{if(document.createEventObject){var evt=document.createEventObject();_2c8a.fireEvent("on"+_2c89,evt);}}};draw2d.EventTarget=function(){this.eventhandlers=new Object();};draw2d.EventTarget.prototype.addEventListener=function(sType,_2c8d){if(typeof this.eventhandlers[sType]=="undefined"){this.eventhandlers[sType]=new Array;}this.eventhandlers[sType][this.eventhandlers[sType].length]=_2c8d;};draw2d.EventTarget.prototype.dispatchEvent=function(_2c8e){_2c8e.target=this;if(typeof this.eventhandlers[_2c8e.type]!="undefined"){for(var i=0;i<this.eventhandlers[_2c8e.type].length;i++){this.eventhandlers[_2c8e.type][i](_2c8e);}}return _2c8e.returnValue;};draw2d.EventTarget.prototype.removeEventListener=function(sType,_2c91){if(typeof this.eventhandlers[sType]!="undefined"){var _2c92=new Array;for(var i=0;i<this.eventhandlers[sType].length;i++){if(this.eventhandlers[sType][i]!=_2c91){_2c92[_2c92.length]=this.eventhandlers[sType][i];}}this.eventhandlers[sType]=_2c92;}};