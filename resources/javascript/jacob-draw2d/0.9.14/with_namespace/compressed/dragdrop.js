/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Drag=function(){};draw2d.Drag.current=null;draw2d.Drag.currentTarget=null;draw2d.Drag.dragging=false;draw2d.Drag.isDragging=function(){return this.dragging;};draw2d.Drag.setCurrent=function(_194d){this.current=_194d;this.dragging=true;};draw2d.Drag.getCurrent=function(){return this.current;};draw2d.Drag.clearCurrent=function(){this.current=null;this.dragging=false;};draw2d.Draggable=function(_194e,_194f){draw2d.EventTarget.call(this);this.construct(_194e,_194f);this.diffX=0;this.diffY=0;this.targets=new draw2d.ArrayList();};draw2d.Draggable.prototype=new draw2d.EventTarget;draw2d.Draggable.prototype.construct=function(_1950,_1951){this.element=_1950;this.constraints=_1951;var oThis=this;var _1953=function(){var _1954=new draw2d.DragDropEvent();_1954.initDragDropEvent("dblclick",true);oThis.dispatchEvent(_1954);var _1955=arguments[0]||window.event;_1955.cancelBubble=true;_1955.returnValue=false;};var _1956=function(){var _1957=arguments[0]||window.event;var _1958=new draw2d.DragDropEvent();var _1959=oThis.node.workflow.getAbsoluteX();var _195a=oThis.node.workflow.getAbsoluteY();var _195b=oThis.node.workflow.getScrollLeft();var _195c=oThis.node.workflow.getScrollTop();_1958.x=_1957.clientX-oThis.element.offsetLeft+_195b-_1959;_1958.y=_1957.clientY-oThis.element.offsetTop+_195c-_195a;if(_1957.button==2){_1958.initDragDropEvent("contextmenu",true);oThis.dispatchEvent(_1958);}else{_1958.initDragDropEvent("dragstart",true);if(oThis.dispatchEvent(_1958)){oThis.diffX=_1957.clientX-oThis.element.offsetLeft;oThis.diffY=_1957.clientY-oThis.element.offsetTop;draw2d.Drag.setCurrent(oThis);if(oThis.isAttached==true){oThis.detachEventHandlers();}oThis.attachEventHandlers();}}_1957.cancelBubble=true;_1957.returnValue=false;};var _195d=function(){if(draw2d.Drag.getCurrent()==null){var _195e=arguments[0]||window.event;if(draw2d.Drag.currentHover!=null&&oThis!=draw2d.Drag.currentHover){var _195f=new draw2d.DragDropEvent();_195f.initDragDropEvent("mouseleave",false,oThis);draw2d.Drag.currentHover.dispatchEvent(_195f);}if(oThis!=null&&oThis!=draw2d.Drag.currentHover){var _195f=new draw2d.DragDropEvent();_195f.initDragDropEvent("mouseenter",false,oThis);oThis.dispatchEvent(_195f);}draw2d.Drag.currentHover=oThis;}else{}};if(this.element.addEventListener){this.element.addEventListener("mousemove",_195d,false);this.element.addEventListener("mousedown",_1956,false);this.element.addEventListener("dblclick",_1953,false);}else{if(this.element.attachEvent){this.element.attachEvent("onmousemove",_195d);this.element.attachEvent("onmousedown",_1956);this.element.attachEvent("ondblclick",_1953);}else{throw new Error("Drag not supported in this browser.");}}};draw2d.Draggable.prototype.attachEventHandlers=function(){var oThis=this;oThis.isAttached=true;this.tempMouseMove=function(){var _1961=arguments[0]||window.event;var _1962=new draw2d.Point(_1961.clientX-oThis.diffX,_1961.clientY-oThis.diffY);if(oThis.node.getCanSnapToHelper()){_1962=oThis.node.getWorkflow().snapToHelper(oThis.node,_1962);}oThis.element.style.left=_1962.x+"px";oThis.element.style.top=_1962.y+"px";var _1963=oThis.node.workflow.getScrollLeft();var _1964=oThis.node.workflow.getScrollTop();var _1965=oThis.node.workflow.getAbsoluteX();var _1966=oThis.node.workflow.getAbsoluteY();var _1967=oThis.getDropTarget(_1961.clientX+_1963-_1965,_1961.clientY+_1964-_1966);var _1968=oThis.getCompartment(_1961.clientX+_1963-_1965,_1961.clientY+_1964-_1966);if(draw2d.Drag.currentTarget!=null&&_1967!=draw2d.Drag.currentTarget){var _1969=new draw2d.DragDropEvent();_1969.initDragDropEvent("dragleave",false,oThis);draw2d.Drag.currentTarget.dispatchEvent(_1969);}if(_1967!=null&&_1967!=draw2d.Drag.currentTarget){var _1969=new draw2d.DragDropEvent();_1969.initDragDropEvent("dragenter",false,oThis);_1967.dispatchEvent(_1969);}draw2d.Drag.currentTarget=_1967;if(draw2d.Drag.currentCompartment!=null&&_1968!=draw2d.Drag.currentCompartment){var _1969=new draw2d.DragDropEvent();_1969.initDragDropEvent("figureleave",false,oThis);draw2d.Drag.currentCompartment.dispatchEvent(_1969);}if(_1968!=null&&_1968.node!=oThis.node&&_1968!=draw2d.Drag.currentCompartment){var _1969=new draw2d.DragDropEvent();_1969.initDragDropEvent("figureenter",false,oThis);_1968.dispatchEvent(_1969);}draw2d.Drag.currentCompartment=_1968;var _196a=new draw2d.DragDropEvent();_196a.initDragDropEvent("drag",false);oThis.dispatchEvent(_196a);};oThis.tempMouseUp=function(){oThis.detachEventHandlers();var _196b=arguments[0]||window.event;var _196c=new draw2d.DragDropEvent();_196c.initDragDropEvent("dragend",false);oThis.dispatchEvent(_196c);var _196d=oThis.node.workflow.getScrollLeft();var _196e=oThis.node.workflow.getScrollTop();var _196f=oThis.node.workflow.getAbsoluteX();var _1970=oThis.node.workflow.getAbsoluteY();var _1971=oThis.getDropTarget(_196b.clientX+_196d-_196f,_196b.clientY+_196e-_1970);var _1972=oThis.getCompartment(_196b.clientX+_196d-_196f,_196b.clientY+_196e-_1970);if(_1971!=null){var _1973=new draw2d.DragDropEvent();_1973.initDragDropEvent("drop",false,oThis);_1971.dispatchEvent(_1973);}if(_1972!=null&&_1972.node!=oThis.node){var _1973=new draw2d.DragDropEvent();_1973.initDragDropEvent("figuredrop",false,oThis);_1972.dispatchEvent(_1973);}if(draw2d.Drag.currentTarget!=null){var _1973=new draw2d.DragDropEvent();_1973.initDragDropEvent("dragleave",false,oThis);draw2d.Drag.currentTarget.dispatchEvent(_1973);draw2d.Drag.currentTarget=null;}draw2d.Drag.currentCompartment=null;draw2d.Drag.clearCurrent();};if(document.body.addEventListener){document.body.addEventListener("mousemove",this.tempMouseMove,false);document.body.addEventListener("mouseup",this.tempMouseUp,false);}else{if(document.body.attachEvent){document.body.attachEvent("onmousemove",this.tempMouseMove);document.body.attachEvent("onmouseup",this.tempMouseUp);}else{throw new Error("Drag doesn't support this browser.");}}};draw2d.Draggable.prototype.detachEventHandlers=function(){this.isAttached=false;if(document.body.removeEventListener){document.body.removeEventListener("mousemove",this.tempMouseMove,false);document.body.removeEventListener("mouseup",this.tempMouseUp,false);}else{if(document.body.detachEvent){document.body.detachEvent("onmousemove",this.tempMouseMove);document.body.detachEvent("onmouseup",this.tempMouseUp);}else{throw new Error("Drag doesn't support this browser.");}}};draw2d.Draggable.prototype.getDropTarget=function(x,y){for(var i=0;i<this.targets.getSize();i++){var _1977=this.targets.get(i);if(_1977.node.isOver(x,y)&&_1977.node!=this.node){return _1977;}}return null;};draw2d.Draggable.prototype.getCompartment=function(x,y){var _197a=null;for(var i=0;i<this.node.workflow.compartments.getSize();i++){var _197c=this.node.workflow.compartments.get(i);if(_197c.isOver(x,y)&&_197c!=this.node){if(_197a==null){_197a=_197c;}else{if(_197a.getZOrder()<_197c.getZOrder()){_197a=_197c;}}}}return _197a==null?null:_197a.dropable;};draw2d.Draggable.prototype.getLeft=function(){return this.element.offsetLeft;};draw2d.Draggable.prototype.getTop=function(){return this.element.offsetTop;};draw2d.DragDropEvent=function(){draw2d.Event.call(this);};draw2d.DragDropEvent.prototype=new draw2d.Event();draw2d.DragDropEvent.prototype.initDragDropEvent=function(sType,_197e,_197f){this.initEvent(sType,_197e);this.relatedTarget=_197f;};draw2d.DropTarget=function(_1980){draw2d.EventTarget.call(this);this.construct(_1980);};draw2d.DropTarget.prototype=new draw2d.EventTarget;draw2d.DropTarget.prototype.construct=function(_1981){this.element=_1981;};draw2d.DropTarget.prototype.getLeft=function(){var el=this.element;var ol=el.offsetLeft;while((el=el.offsetParent)!=null){ol+=el.offsetLeft;}return ol;};draw2d.DropTarget.prototype.getTop=function(){var el=this.element;var ot=el.offsetTop;while((el=el.offsetParent)!=null){ot+=el.offsetTop;}return ot;};draw2d.DropTarget.prototype.getHeight=function(){return this.element.offsetHeight;};draw2d.DropTarget.prototype.getWidth=function(){return this.element.offsetWidth;};