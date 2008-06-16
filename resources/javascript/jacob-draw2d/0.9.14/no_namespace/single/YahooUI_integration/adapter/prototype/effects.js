String.prototype.parseColor=function(){
var color="#";
if(this.slice(0,4)=="rgb("){
var cols=this.slice(4,this.length-1).split(",");
var i=0;
do{
color+=parseInt(cols[i]).toColorPart();
}while(++i<3);
}else{
if(this.slice(0,1)=="#"){
if(this.length==4){
for(var i=1;i<4;i++){
color+=(this.charAt(i)+this.charAt(i)).toLowerCase();
}
}
if(this.length==7){
color=this.toLowerCase();
}
}
}
return (color.length==7?color:(arguments[0]||this));
};
Element.collectTextNodes=function(_4212){
return $A($(_4212).childNodes).collect(function(node){
return (node.nodeType==3?node.nodeValue:(node.hasChildNodes()?Element.collectTextNodes(node):""));
}).flatten().join("");
};
Element.collectTextNodesIgnoreClass=function(_4214,_4215){
return $A($(_4214).childNodes).collect(function(node){
return (node.nodeType==3?node.nodeValue:((node.hasChildNodes()&&!Element.hasClassName(node,_4215))?Element.collectTextNodesIgnoreClass(node,_4215):""));
}).flatten().join("");
};
Element.setContentZoom=function(_4217,_4218){
_4217=$(_4217);
_4217.setStyle({fontSize:(_4218/100)+"em"});
if(navigator.appVersion.indexOf("AppleWebKit")>0){
window.scrollBy(0,0);
}
return _4217;
};
Element.getOpacity=function(_4219){
return $(_4219).getStyle("opacity");
};
Element.setOpacity=function(_421a,value){
return $(_421a).setStyle({opacity:value});
};
Element.getInlineOpacity=function(_421c){
return $(_421c).style.opacity||"";
};
Element.forceRerendering=function(_421d){
try{
_421d=$(_421d);
var n=document.createTextNode(" ");
_421d.appendChild(n);
_421d.removeChild(n);
}
catch(e){
}
};
Array.prototype.call=function(){
var args=arguments;
this.each(function(f){
f.apply(this,args);
});
};
var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},tagifyText:function(_4221){
if(typeof Builder=="undefined"){
throw ("Effect.tagifyText requires including script.aculo.us' builder.js library");
}
var _4222="position:relative";
if(/MSIE/.test(navigator.userAgent)&&!window.opera){
_4222+=";zoom:1";
}
_4221=$(_4221);
$A(_4221.childNodes).each(function(child){
if(child.nodeType==3){
child.nodeValue.toArray().each(function(_4224){
_4221.insertBefore(Builder.node("span",{style:_4222},_4224==" "?String.fromCharCode(160):_4224),child);
});
Element.remove(child);
}
});
},multiple:function(_4225,_4226){
var _4227;
if(((typeof _4225=="object")||(typeof _4225=="function"))&&(_4225.length)){
_4227=_4225;
}else{
_4227=$(_4225).childNodes;
}
var _4228=Object.extend({speed:0.1,delay:0},arguments[2]||{});
var _4229=_4228.delay;
$A(_4227).each(function(_422a,index){
new _4226(_422a,Object.extend(_4228,{delay:index*_4228.speed+_4229}));
});
},PAIRS:{"slide":["SlideDown","SlideUp"],"blind":["BlindDown","BlindUp"],"appear":["Appear","Fade"]},toggle:function(_422c,_422d){
_422c=$(_422c);
_422d=(_422d||"appear").toLowerCase();
var _422e=Object.extend({queue:{position:"end",scope:(_422c.id||"global"),limit:1}},arguments[2]||{});
Effect[_422c.visible()?Effect.PAIRS[_422d][1]:Effect.PAIRS[_422d][0]](_422c,_422e);
}};
var Effect2=Effect;
Effect.Transitions={linear:Prototype.K,sinoidal:function(pos){
return (-Math.cos(pos*Math.PI)/2)+0.5;
},reverse:function(pos){
return 1-pos;
},flicker:function(pos){
return ((-Math.cos(pos*Math.PI)/4)+0.75)+Math.random()/4;
},wobble:function(pos){
return (-Math.cos(pos*Math.PI*(9*pos))/2)+0.5;
},pulse:function(pos,_4234){
_4234=_4234||5;
return (Math.round((pos%(1/_4234))*_4234)==0?((pos*_4234*2)-Math.floor(pos*_4234*2)):1-((pos*_4234*2)-Math.floor(pos*_4234*2)));
},none:function(pos){
return 0;
},full:function(pos){
return 1;
}};
Effect.ScopedQueue=Class.create();
Object.extend(Object.extend(Effect.ScopedQueue.prototype,Enumerable),{initialize:function(){
this.effects=[];
this.interval=null;
},_each:function(_4237){
this.effects._each(_4237);
},add:function(_4238){
var _4239=new Date().getTime();
var _423a=(typeof _4238.options.queue=="string")?_4238.options.queue:_4238.options.queue.position;
switch(_423a){
case "front":
this.effects.findAll(function(e){
return e.state=="idle";
}).each(function(e){
e.startOn+=_4238.finishOn;
e.finishOn+=_4238.finishOn;
});
break;
case "with-last":
_4239=this.effects.pluck("startOn").max()||_4239;
break;
case "end":
_4239=this.effects.pluck("finishOn").max()||_4239;
break;
}
_4238.startOn+=_4239;
_4238.finishOn+=_4239;
if(!_4238.options.queue.limit||(this.effects.length<_4238.options.queue.limit)){
this.effects.push(_4238);
}
if(!this.interval){
this.interval=setInterval(this.loop.bind(this),15);
}
},remove:function(_423d){
this.effects=this.effects.reject(function(e){
return e==_423d;
});
if(this.effects.length==0){
clearInterval(this.interval);
this.interval=null;
}
},loop:function(){
var _423f=new Date().getTime();
for(var i=0,len=this.effects.length;i<len;i++){
if(this.effects[i]){
this.effects[i].loop(_423f);
}
}
}});
Effect.Queues={instances:$H(),get:function(_4241){
if(typeof _4241!="string"){
return _4241;
}
if(!this.instances[_4241]){
this.instances[_4241]=new Effect.ScopedQueue();
}
return this.instances[_4241];
}};
Effect.Queue=Effect.Queues.get("global");
Effect.DefaultOptions={transition:Effect.Transitions.sinoidal,duration:1,fps:60,sync:false,from:0,to:1,delay:0,queue:"parallel"};
Effect.Base=function(){
};
Effect.Base.prototype={position:null,start:function(_4242){
this.options=Object.extend(Object.extend({},Effect.DefaultOptions),_4242||{});
this.currentFrame=0;
this.state="idle";
this.startOn=this.options.delay*1000;
this.finishOn=this.startOn+(this.options.duration*1000);
this.event("beforeStart");
if(!this.options.sync){
Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).add(this);
}
},loop:function(_4243){
if(_4243>=this.startOn){
if(_4243>=this.finishOn){
this.render(1);
this.cancel();
this.event("beforeFinish");
if(this.finish){
this.finish();
}
this.event("afterFinish");
return;
}
var pos=(_4243-this.startOn)/(this.finishOn-this.startOn);
var frame=Math.round(pos*this.options.fps*this.options.duration);
if(frame>this.currentFrame){
this.render(pos);
this.currentFrame=frame;
}
}
},render:function(pos){
if(this.state=="idle"){
this.state="running";
this.event("beforeSetup");
if(this.setup){
this.setup();
}
this.event("afterSetup");
}
if(this.state=="running"){
if(this.options.transition){
pos=this.options.transition(pos);
}
pos*=(this.options.to-this.options.from);
pos+=this.options.from;
this.position=pos;
this.event("beforeUpdate");
if(this.update){
this.update(pos);
}
this.event("afterUpdate");
}
},cancel:function(){
if(!this.options.sync){
Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).remove(this);
}
this.state="finished";
},event:function(_4247){
if(this.options[_4247+"Internal"]){
this.options[_4247+"Internal"](this);
}
if(this.options[_4247]){
this.options[_4247](this);
}
},inspect:function(){
var data=$H();
for(property in this){
if(typeof this[property]!="function"){
data[property]=this[property];
}
}
return "#<Effect:"+data.inspect()+",options:"+$H(this.options).inspect()+">";
}};
Effect.Parallel=Class.create();
Object.extend(Object.extend(Effect.Parallel.prototype,Effect.Base.prototype),{initialize:function(_4249){
this.effects=_4249||[];
this.start(arguments[1]);
},update:function(_424a){
this.effects.invoke("render",_424a);
},finish:function(_424b){
this.effects.each(function(_424c){
_424c.render(1);
_424c.cancel();
_424c.event("beforeFinish");
if(_424c.finish){
_424c.finish(_424b);
}
_424c.event("afterFinish");
});
}});
Effect.Event=Class.create();
Object.extend(Object.extend(Effect.Event.prototype,Effect.Base.prototype),{initialize:function(){
var _424d=Object.extend({duration:0},arguments[0]||{});
this.start(_424d);
},update:Prototype.emptyFunction});
Effect.Opacity=Class.create();
Object.extend(Object.extend(Effect.Opacity.prototype,Effect.Base.prototype),{initialize:function(_424e){
this.element=$(_424e);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
if(/MSIE/.test(navigator.userAgent)&&!window.opera&&(!this.element.currentStyle.hasLayout)){
this.element.setStyle({zoom:1});
}
var _424f=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});
this.start(_424f);
},update:function(_4250){
this.element.setOpacity(_4250);
}});
Effect.Move=Class.create();
Object.extend(Object.extend(Effect.Move.prototype,Effect.Base.prototype),{initialize:function(_4251){
this.element=$(_4251);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _4252=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});
this.start(_4252);
},setup:function(){
this.element.makePositioned();
this.originalLeft=parseFloat(this.element.getStyle("left")||"0");
this.originalTop=parseFloat(this.element.getStyle("top")||"0");
if(this.options.mode=="absolute"){
this.options.x=this.options.x-this.originalLeft;
this.options.y=this.options.y-this.originalTop;
}
},update:function(_4253){
this.element.setStyle({left:Math.round(this.options.x*_4253+this.originalLeft)+"px",top:Math.round(this.options.y*_4253+this.originalTop)+"px"});
}});
Effect.MoveBy=function(_4254,toTop,_4256){
return new Effect.Move(_4254,Object.extend({x:_4256,y:toTop},arguments[3]||{}));
};
Effect.Scale=Class.create();
Object.extend(Object.extend(Effect.Scale.prototype,Effect.Base.prototype),{initialize:function(_4257,_4258){
this.element=$(_4257);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _4259=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:_4258},arguments[2]||{});
this.start(_4259);
},setup:function(){
this.restoreAfterFinish=this.options.restoreAfterFinish||false;
this.elementPositioning=this.element.getStyle("position");
this.originalStyle={};
["top","left","width","height","fontSize"].each(function(k){
this.originalStyle[k]=this.element.style[k];
}.bind(this));
this.originalTop=this.element.offsetTop;
this.originalLeft=this.element.offsetLeft;
var _425b=this.element.getStyle("font-size")||"100%";
["em","px","%","pt"].each(function(_425c){
if(_425b.indexOf(_425c)>0){
this.fontSize=parseFloat(_425b);
this.fontSizeType=_425c;
}
}.bind(this));
this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;
this.dims=null;
if(this.options.scaleMode=="box"){
this.dims=[this.element.offsetHeight,this.element.offsetWidth];
}
if(/^content/.test(this.options.scaleMode)){
this.dims=[this.element.scrollHeight,this.element.scrollWidth];
}
if(!this.dims){
this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth];
}
},update:function(_425d){
var _425e=(this.options.scaleFrom/100)+(this.factor*_425d);
if(this.options.scaleContent&&this.fontSize){
this.element.setStyle({fontSize:this.fontSize*_425e+this.fontSizeType});
}
this.setDimensions(this.dims[0]*_425e,this.dims[1]*_425e);
},finish:function(_425f){
if(this.restoreAfterFinish){
this.element.setStyle(this.originalStyle);
}
},setDimensions:function(_4260,width){
var d={};
if(this.options.scaleX){
d.width=Math.round(width)+"px";
}
if(this.options.scaleY){
d.height=Math.round(_4260)+"px";
}
if(this.options.scaleFromCenter){
var topd=(_4260-this.dims[0])/2;
var leftd=(width-this.dims[1])/2;
if(this.elementPositioning=="absolute"){
if(this.options.scaleY){
d.top=this.originalTop-topd+"px";
}
if(this.options.scaleX){
d.left=this.originalLeft-leftd+"px";
}
}else{
if(this.options.scaleY){
d.top=-topd+"px";
}
if(this.options.scaleX){
d.left=-leftd+"px";
}
}
}
this.element.setStyle(d);
}});
Effect.Highlight=Class.create();
Object.extend(Object.extend(Effect.Highlight.prototype,Effect.Base.prototype),{initialize:function(_4265){
this.element=$(_4265);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _4266=Object.extend({startcolor:"#ffff99"},arguments[1]||{});
this.start(_4266);
},setup:function(){
if(this.element.getStyle("display")=="none"){
this.cancel();
return;
}
this.oldStyle={};
if(!this.options.keepBackgroundImage){
this.oldStyle.backgroundImage=this.element.getStyle("background-image");
this.element.setStyle({backgroundImage:"none"});
}
if(!this.options.endcolor){
this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff");
}
if(!this.options.restorecolor){
this.options.restorecolor=this.element.getStyle("background-color");
}
this._base=$R(0,2).map(function(i){
return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16);
}.bind(this));
this._delta=$R(0,2).map(function(i){
return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i];
}.bind(this));
},update:function(_4269){
this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(m,v,i){
return m+(Math.round(this._base[i]+(this._delta[i]*_4269)).toColorPart());
}.bind(this))});
},finish:function(){
this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}));
}});
Effect.ScrollTo=Class.create();
Object.extend(Object.extend(Effect.ScrollTo.prototype,Effect.Base.prototype),{initialize:function(_426d){
this.element=$(_426d);
this.start(arguments[1]||{});
},setup:function(){
Position.prepare();
var _426e=Position.cumulativeOffset(this.element);
if(this.options.offset){
_426e[1]+=this.options.offset;
}
var max=window.innerHeight?window.height-window.innerHeight:document.body.scrollHeight-(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight);
this.scrollStart=Position.deltaY;
this.delta=(_426e[1]>max?max:_426e[1])-this.scrollStart;
},update:function(_4270){
Position.prepare();
window.scrollTo(Position.deltaX,this.scrollStart+(_4270*this.delta));
}});
Effect.Fade=function(_4271){
_4271=$(_4271);
var _4272=_4271.getInlineOpacity();
var _4273=Object.extend({from:_4271.getOpacity()||1,to:0,afterFinishInternal:function(_4274){
if(_4274.options.to!=0){
return;
}
_4274.element.hide().setStyle({opacity:_4272});
}},arguments[1]||{});
return new Effect.Opacity(_4271,_4273);
};
Effect.Appear=function(_4275){
_4275=$(_4275);
var _4276=Object.extend({from:(_4275.getStyle("display")=="none"?0:_4275.getOpacity()||0),to:1,afterFinishInternal:function(_4277){
_4277.element.forceRerendering();
},beforeSetup:function(_4278){
_4278.element.setOpacity(_4278.options.from).show();
}},arguments[1]||{});
return new Effect.Opacity(_4275,_4276);
};
Effect.Puff=function(_4279){
_4279=$(_4279);
var _427a={opacity:_4279.getInlineOpacity(),position:_4279.getStyle("position"),top:_4279.style.top,left:_4279.style.left,width:_4279.style.width,height:_4279.style.height};
return new Effect.Parallel([new Effect.Scale(_4279,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(_4279,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(_427b){
Position.absolutize(_427b.effects[0].element);
},afterFinishInternal:function(_427c){
_427c.effects[0].element.hide().setStyle(_427a);
}},arguments[1]||{}));
};
Effect.BlindUp=function(_427d){
_427d=$(_427d);
_427d.makeClipping();
return new Effect.Scale(_427d,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(_427e){
_427e.element.hide().undoClipping();
}},arguments[1]||{}));
};
Effect.BlindDown=function(_427f){
_427f=$(_427f);
var _4280=_427f.getDimensions();
return new Effect.Scale(_427f,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:_4280.height,originalWidth:_4280.width},restoreAfterFinish:true,afterSetup:function(_4281){
_4281.element.makeClipping().setStyle({height:"0px"}).show();
},afterFinishInternal:function(_4282){
_4282.element.undoClipping();
}},arguments[1]||{}));
};
Effect.SwitchOff=function(_4283){
_4283=$(_4283);
var _4284=_4283.getInlineOpacity();
return new Effect.Appear(_4283,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(_4285){
new Effect.Scale(_4285.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(_4286){
_4286.element.makePositioned().makeClipping();
},afterFinishInternal:function(_4287){
_4287.element.hide().undoClipping().undoPositioned().setStyle({opacity:_4284});
}});
}},arguments[1]||{}));
};
Effect.DropOut=function(_4288){
_4288=$(_4288);
var _4289={top:_4288.getStyle("top"),left:_4288.getStyle("left"),opacity:_4288.getInlineOpacity()};
return new Effect.Parallel([new Effect.Move(_4288,{x:0,y:100,sync:true}),new Effect.Opacity(_4288,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(_428a){
_428a.effects[0].element.makePositioned();
},afterFinishInternal:function(_428b){
_428b.effects[0].element.hide().undoPositioned().setStyle(_4289);
}},arguments[1]||{}));
};
Effect.Shake=function(_428c){
_428c=$(_428c);
var _428d={top:_428c.getStyle("top"),left:_428c.getStyle("left")};
return new Effect.Move(_428c,{x:20,y:0,duration:0.05,afterFinishInternal:function(_428e){
new Effect.Move(_428e.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(_428f){
new Effect.Move(_428f.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(_4290){
new Effect.Move(_4290.element,{x:-40,y:0,duration:0.1,afterFinishInternal:function(_4291){
new Effect.Move(_4291.element,{x:40,y:0,duration:0.1,afterFinishInternal:function(_4292){
new Effect.Move(_4292.element,{x:-20,y:0,duration:0.05,afterFinishInternal:function(_4293){
_4293.element.undoPositioned().setStyle(_428d);
}});
}});
}});
}});
}});
}});
};
Effect.SlideDown=function(_4294){
_4294=$(_4294).cleanWhitespace();
var _4295=_4294.down().getStyle("bottom");
var _4296=_4294.getDimensions();
return new Effect.Scale(_4294,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:_4296.height,originalWidth:_4296.width},restoreAfterFinish:true,afterSetup:function(_4297){
_4297.element.makePositioned();
_4297.element.down().makePositioned();
if(window.opera){
_4297.element.setStyle({top:""});
}
_4297.element.makeClipping().setStyle({height:"0px"}).show();
},afterUpdateInternal:function(_4298){
_4298.element.down().setStyle({bottom:(_4298.dims[0]-_4298.element.clientHeight)+"px"});
},afterFinishInternal:function(_4299){
_4299.element.undoClipping().undoPositioned();
_4299.element.down().undoPositioned().setStyle({bottom:_4295});
}},arguments[1]||{}));
};
Effect.SlideUp=function(_429a){
_429a=$(_429a).cleanWhitespace();
var _429b=_429a.down().getStyle("bottom");
return new Effect.Scale(_429a,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,restoreAfterFinish:true,beforeStartInternal:function(_429c){
_429c.element.makePositioned();
_429c.element.down().makePositioned();
if(window.opera){
_429c.element.setStyle({top:""});
}
_429c.element.makeClipping().show();
},afterUpdateInternal:function(_429d){
_429d.element.down().setStyle({bottom:(_429d.dims[0]-_429d.element.clientHeight)+"px"});
},afterFinishInternal:function(_429e){
_429e.element.hide().undoClipping().undoPositioned().setStyle({bottom:_429b});
_429e.element.down().undoPositioned();
}},arguments[1]||{}));
};
Effect.Squish=function(_429f){
return new Effect.Scale(_429f,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(_42a0){
_42a0.element.makeClipping();
},afterFinishInternal:function(_42a1){
_42a1.element.hide().undoClipping();
}});
};
Effect.Grow=function(_42a2){
_42a2=$(_42a2);
var _42a3=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});
var _42a4={top:_42a2.style.top,left:_42a2.style.left,height:_42a2.style.height,width:_42a2.style.width,opacity:_42a2.getInlineOpacity()};
var dims=_42a2.getDimensions();
var _42a6,initialMoveY;
var moveX,moveY;
switch(_42a3.direction){
case "top-left":
_42a6=initialMoveY=moveX=moveY=0;
break;
case "top-right":
_42a6=dims.width;
initialMoveY=moveY=0;
moveX=-dims.width;
break;
case "bottom-left":
_42a6=moveX=0;
initialMoveY=dims.height;
moveY=-dims.height;
break;
case "bottom-right":
_42a6=dims.width;
initialMoveY=dims.height;
moveX=-dims.width;
moveY=-dims.height;
break;
case "center":
_42a6=dims.width/2;
initialMoveY=dims.height/2;
moveX=-dims.width/2;
moveY=-dims.height/2;
break;
}
return new Effect.Move(_42a2,{x:_42a6,y:initialMoveY,duration:0.01,beforeSetup:function(_42a8){
_42a8.element.hide().makeClipping().makePositioned();
},afterFinishInternal:function(_42a9){
new Effect.Parallel([new Effect.Opacity(_42a9.element,{sync:true,to:1,from:0,transition:_42a3.opacityTransition}),new Effect.Move(_42a9.element,{x:moveX,y:moveY,sync:true,transition:_42a3.moveTransition}),new Effect.Scale(_42a9.element,100,{scaleMode:{originalHeight:dims.height,originalWidth:dims.width},sync:true,scaleFrom:window.opera?1:0,transition:_42a3.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(_42aa){
_42aa.effects[0].element.setStyle({height:"0px"}).show();
},afterFinishInternal:function(_42ab){
_42ab.effects[0].element.undoClipping().undoPositioned().setStyle(_42a4);
}},_42a3));
}});
};
Effect.Shrink=function(_42ac){
_42ac=$(_42ac);
var _42ad=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});
var _42ae={top:_42ac.style.top,left:_42ac.style.left,height:_42ac.style.height,width:_42ac.style.width,opacity:_42ac.getInlineOpacity()};
var dims=_42ac.getDimensions();
var moveX,moveY;
switch(_42ad.direction){
case "top-left":
moveX=moveY=0;
break;
case "top-right":
moveX=dims.width;
moveY=0;
break;
case "bottom-left":
moveX=0;
moveY=dims.height;
break;
case "bottom-right":
moveX=dims.width;
moveY=dims.height;
break;
case "center":
moveX=dims.width/2;
moveY=dims.height/2;
break;
}
return new Effect.Parallel([new Effect.Opacity(_42ac,{sync:true,to:0,from:1,transition:_42ad.opacityTransition}),new Effect.Scale(_42ac,window.opera?1:0,{sync:true,transition:_42ad.scaleTransition,restoreAfterFinish:true}),new Effect.Move(_42ac,{x:moveX,y:moveY,sync:true,transition:_42ad.moveTransition})],Object.extend({beforeStartInternal:function(_42b1){
_42b1.effects[0].element.makePositioned().makeClipping();
},afterFinishInternal:function(_42b2){
_42b2.effects[0].element.hide().undoClipping().undoPositioned().setStyle(_42ae);
}},_42ad));
};
Effect.Pulsate=function(_42b3){
_42b3=$(_42b3);
var _42b4=arguments[1]||{};
var _42b5=_42b3.getInlineOpacity();
var _42b6=_42b4.transition||Effect.Transitions.sinoidal;
var _42b7=function(pos){
return _42b6(1-Effect.Transitions.pulse(pos,_42b4.pulses));
};
_42b7.bind(_42b6);
return new Effect.Opacity(_42b3,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(_42b9){
_42b9.element.setStyle({opacity:_42b5});
}},_42b4),{transition:_42b7}));
};
Effect.Fold=function(_42ba){
_42ba=$(_42ba);
var _42bb={top:_42ba.style.top,left:_42ba.style.left,width:_42ba.style.width,height:_42ba.style.height};
_42ba.makeClipping();
return new Effect.Scale(_42ba,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(_42bc){
new Effect.Scale(_42ba,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(_42bd){
_42bd.element.hide().undoClipping().setStyle(_42bb);
}});
}},arguments[1]||{}));
};
Effect.Morph=Class.create();
Object.extend(Object.extend(Effect.Morph.prototype,Effect.Base.prototype),{initialize:function(_42be){
this.element=$(_42be);
if(!this.element){
throw (Effect._elementDoesNotExistError);
}
var _42bf=Object.extend({style:{}},arguments[1]||{});
if(typeof _42bf.style=="string"){
if(_42bf.style.indexOf(":")==-1){
var _42c0="",selector="."+_42bf.style;
$A(document.styleSheets).reverse().each(function(_42c1){
if(_42c1.cssRules){
cssRules=_42c1.cssRules;
}else{
if(_42c1.rules){
cssRules=_42c1.rules;
}
}
$A(cssRules).reverse().each(function(rule){
if(selector==rule.selectorText){
_42c0=rule.style.cssText;
throw $break;
}
});
if(_42c0){
throw $break;
}
});
this.style=_42c0.parseStyle();
_42bf.afterFinishInternal=function(_42c3){
_42c3.element.addClassName(_42c3.options.style);
_42c3.transforms.each(function(_42c4){
if(_42c4.style!="opacity"){
_42c3.element.style[_42c4.style.camelize()]="";
}
});
};
}else{
this.style=_42bf.style.parseStyle();
}
}else{
this.style=$H(_42bf.style);
}
this.start(_42bf);
},setup:function(){
function parseColor(color){
if(!color||["rgba(0, 0, 0, 0)","transparent"].include(color)){
color="#ffffff";
}
color=color.parseColor();
return $R(0,2).map(function(i){
return parseInt(color.slice(i*2+1,i*2+3),16);
});
}
this.transforms=this.style.map(function(pair){
var _42c8=pair[0].underscore().dasherize(),value=pair[1],unit=null;
if(value.parseColor("#zzzzzz")!="#zzzzzz"){
value=value.parseColor();
unit="color";
}else{
if(_42c8=="opacity"){
value=parseFloat(value);
if(/MSIE/.test(navigator.userAgent)&&!window.opera&&(!this.element.currentStyle.hasLayout)){
this.element.setStyle({zoom:1});
}
}else{
if(Element.CSS_LENGTH.test(value)){
var _42c9=value.match(/^([\+\-]?[0-9\.]+)(.*)$/),value=parseFloat(_42c9[1]),unit=(_42c9.length==3)?_42c9[2]:null;
}
}
}
var _42ca=this.element.getStyle(_42c8);
return $H({style:_42c8,originalValue:unit=="color"?parseColor(_42ca):parseFloat(_42ca||0),targetValue:unit=="color"?parseColor(value):value,unit:unit});
}.bind(this)).reject(function(_42cb){
return ((_42cb.originalValue==_42cb.targetValue)||(_42cb.unit!="color"&&(isNaN(_42cb.originalValue)||isNaN(_42cb.targetValue))));
});
},update:function(_42cc){
var style=$H(),value=null;
this.transforms.each(function(_42ce){
value=_42ce.unit=="color"?$R(0,2).inject("#",function(m,v,i){
return m+(Math.round(_42ce.originalValue[i]+(_42ce.targetValue[i]-_42ce.originalValue[i])*_42cc)).toColorPart();
}):_42ce.originalValue+Math.round(((_42ce.targetValue-_42ce.originalValue)*_42cc)*1000)/1000+_42ce.unit;
style[_42ce.style]=value;
});
this.element.setStyle(style);
}});
Effect.Transform=Class.create();
Object.extend(Effect.Transform.prototype,{initialize:function(_42d2){
this.tracks=[];
this.options=arguments[1]||{};
this.addTracks(_42d2);
},addTracks:function(_42d3){
_42d3.each(function(track){
var data=$H(track).values().first();
this.tracks.push($H({ids:$H(track).keys().first(),effect:Effect.Morph,options:{style:data}}));
}.bind(this));
return this;
},play:function(){
return new Effect.Parallel(this.tracks.map(function(track){
var _42d7=[$(track.ids)||$$(track.ids)].flatten();
return _42d7.map(function(e){
return new track.effect(e,Object.extend({sync:true},track.options));
});
}).flatten(),this.options);
}});
Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle "+"borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth "+"borderRightColor borderRightStyle borderRightWidth borderSpacing "+"borderTopColor borderTopStyle borderTopWidth bottom clip color "+"fontSize fontWeight height left letterSpacing lineHeight "+"marginBottom marginLeft marginRight marginTop markerOffset maxHeight "+"maxWidth minHeight minWidth opacity outlineColor outlineOffset "+"outlineWidth paddingBottom paddingLeft paddingRight paddingTop "+"right textIndent top width wordSpacing zIndex");
Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;
String.prototype.parseStyle=function(){
var _42d9=Element.extend(document.createElement("div"));
_42d9.innerHTML="<div style=\""+this+"\"></div>";
var style=_42d9.down().style,styleRules=$H();
Element.CSS_PROPERTIES.each(function(_42db){
if(style[_42db]){
styleRules[_42db]=style[_42db];
}
});
if(/MSIE/.test(navigator.userAgent)&&!window.opera&&this.indexOf("opacity")>-1){
styleRules.opacity=this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1];
}
return styleRules;
};
Element.morph=function(_42dc,style){
new Effect.Morph(_42dc,Object.extend({style:style},arguments[2]||{}));
return _42dc;
};
["setOpacity","getOpacity","getInlineOpacity","forceRerendering","setContentZoom","collectTextNodes","collectTextNodesIgnoreClass","morph"].each(function(f){
Element.Methods[f]=Element[f];
});
Element.Methods.visualEffect=function(_42df,_42e0,_42e1){
s=_42e0.gsub(/_/,"-").camelize();
effect_class=s.charAt(0).toUpperCase()+s.substring(1);
new Effect[effect_class](_42df,_42e1);
return $(_42df);
};
Element.addMethods();
