/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

Event=function(){this.type=null;this.target=null;this.relatedTarget=null;this.cancelable=false;this.timeStamp=null;this.returnValue=true;};Event.prototype.initEvent=function(_d75,_d76){this.type=_d75;this.cancelable=_d76;this.timeStamp=(new Date()).getTime();};Event.prototype.preventDefault=function(){if(this.cancelable){this.returnValue=false;}};Event.fireDOMEvent=function(_d77,_d78){if(document.createEvent){var evt=document.createEvent("Events");evt.initEvent(_d77,true,true);_d78.dispatchEvent(evt);}else{if(document.createEventObject){var evt=document.createEventObject();_d78.fireEvent("on"+_d77,evt);}}};EventTarget=function(){this.eventhandlers=new Object();};EventTarget.prototype.addEventListener=function(_d7a,_d7b){if(typeof this.eventhandlers[_d7a]=="undefined"){this.eventhandlers[_d7a]=new Array;}this.eventhandlers[_d7a][this.eventhandlers[_d7a].length]=_d7b;};EventTarget.prototype.dispatchEvent=function(_d7c){_d7c.target=this;if(typeof this.eventhandlers[_d7c.type]!="undefined"){for(var i=0;i<this.eventhandlers[_d7c.type].length;i++){this.eventhandlers[_d7c.type][i](_d7c);}}return _d7c.returnValue;};EventTarget.prototype.removeEventListener=function(_d7e,_d7f){if(typeof this.eventhandlers[_d7e]!="undefined"){var _d80=new Array;for(var i=0;i<this.eventhandlers[_d7e].length;i++){if(this.eventhandlers[_d7e][i]!=_d7f){_d80[_d80.length]=this.eventhandlers[_d7e][i];}}this.eventhandlers[_d7e]=_d80;}};