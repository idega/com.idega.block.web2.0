if(typeof window.jQuery=="undefined"){
window.undefined=window.undefined;
var jQuery=function(a,c){
if(window==this){
return new jQuery(a,c);
}
a=a||document;
if(jQuery.isFunction(a)){
return new jQuery(document)[jQuery.fn.ready?"ready":"load"](a);
}
if(typeof a=="string"){
var m=/^[^<]*(<(.|\n)+>)[^>]*$/.exec(a);
if(m){
a=jQuery.clean([m[1]]);
}else{
return new jQuery(c).find(a);
}
}
return this.setArray(a.constructor==Array&&a||(a.jquery||a.length&&a!=window&&!a.nodeType&&a[0]!=undefined&&a[0].nodeType)&&jQuery.makeArray(a)||[a]);
};
if(typeof $!="undefined"){
jQuery._$=$;
}
var $=jQuery;
jQuery.fn=jQuery.prototype={jquery:"1.1.1",size:function(){
return this.length;
},length:0,get:function(num){
return num==undefined?jQuery.makeArray(this):this[num];
},pushStack:function(a){
var ret=jQuery(this);
ret.prevObject=this;
return ret.setArray(a);
},setArray:function(a){
this.length=0;
[].push.apply(this,a);
return this;
},each:function(fn,args){
return jQuery.each(this,fn,args);
},index:function(obj){
var pos=-1;
this.each(function(i){
if(this==obj){
pos=i;
}
});
return pos;
},attr:function(key,value,type){
var obj=key;
if(key.constructor==String){
if(value==undefined){
return this.length&&jQuery[type||"attr"](this[0],key)||undefined;
}else{
obj={};
obj[key]=value;
}
}
return this.each(function(index){
for(var prop in obj){
jQuery.attr(type?this.style:this,prop,jQuery.prop(this,obj[prop],type,index,prop));
}
});
},css:function(key,value){
return this.attr(key,value,"curCSS");
},text:function(e){
if(typeof e=="string"){
return this.empty().append(document.createTextNode(e));
}
var t="";
jQuery.each(e||this,function(){
jQuery.each(this.childNodes,function(){
if(this.nodeType!=8){
t+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this]);
}
});
});
return t;
},wrap:function(){
var a=jQuery.clean(arguments);
return this.each(function(){
var b=a[0].cloneNode(true);
this.parentNode.insertBefore(b,this);
while(b.firstChild){
b=b.firstChild;
}
b.appendChild(this);
});
},append:function(){
return this.domManip(arguments,true,1,function(a){
this.appendChild(a);
});
},prepend:function(){
return this.domManip(arguments,true,-1,function(a){
this.insertBefore(a,this.firstChild);
});
},before:function(){
return this.domManip(arguments,false,1,function(a){
this.parentNode.insertBefore(a,this);
});
},after:function(){
return this.domManip(arguments,false,-1,function(a){
this.parentNode.insertBefore(a,this.nextSibling);
});
},end:function(){
return this.prevObject||jQuery([]);
},find:function(t){
return this.pushStack(jQuery.map(this,function(a){
return jQuery.find(t,a);
}));
},clone:function(deep){
return this.pushStack(jQuery.map(this,function(a){
return a.cloneNode(deep!=undefined?deep:true);
}));
},filter:function(t){
return this.pushStack(jQuery.isFunction(t)&&jQuery.grep(this,function(el,index){
return t.apply(el,[index]);
})||jQuery.multiFilter(t,this));
},not:function(t){
return this.pushStack(t.constructor==String&&jQuery.multiFilter(t,this,true)||jQuery.grep(this,function(a){
if(t.constructor==Array||t.jquery){
return jQuery.inArray(t,a)<0;
}else{
return a!=t;
}
}));
},add:function(t){
return this.pushStack(jQuery.merge(this.get(),t.constructor==String?jQuery(t).get():t.length!=undefined&&!t.nodeName?t:[t]));
},is:function(expr){
return expr?jQuery.filter(expr,this).r.length>0:false;
},val:function(val){
return val==undefined?(this.length?this[0].value:null):this.attr("value",val);
},html:function(val){
return val==undefined?(this.length?this[0].innerHTML:null):this.empty().append(val);
},domManip:function(args,table,dir,fn){
var clone=this.length>1;
var a=jQuery.clean(args);
if(dir<0){
a.reverse();
}
return this.each(function(){
var obj=this;
if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(a[0],"tr")){
obj=this.getElementsByTagName("tbody")[0]||this.appendChild(document.createElement("tbody"));
}
jQuery.each(a,function(){
fn.apply(obj,[clone?this.cloneNode(true):this]);
});
});
}};
jQuery.extend=jQuery.fn.extend=function(){
var _3892=arguments[0],a=1;
if(arguments.length==1){
_3892=this;
a=0;
}
var prop;
while(prop=arguments[a++]){
for(var i in prop){
_3892[i]=prop[i];
}
}
return _3892;
};
jQuery.extend({noConflict:function(){
if(jQuery._$){
$=jQuery._$;
}
return jQuery;
},isFunction:function(fn){
return !!fn&&typeof fn!="string"&&typeof fn[0]=="undefined"&&/function/i.test(fn+"");
},nodeName:function(elem,name){
return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase();
},each:function(obj,fn,args){
if(obj.length==undefined){
for(var i in obj){
fn.apply(obj[i],args||[i,obj[i]]);
}
}else{
for(var i=0,ol=obj.length;i<ol;i++){
if(fn.apply(obj[i],args||[i,obj[i]])===false){
break;
}
}
}
return obj;
},prop:function(elem,value,type,index,prop){
if(jQuery.isFunction(value)){
return value.call(elem,[index]);
}
var _38a1=/z-?index|font-?weight|opacity|zoom|line-?height/i;
if(value.constructor==Number&&type=="curCSS"&&!_38a1.test(prop)){
return value+"px";
}
return value;
},className:{add:function(elem,c){
jQuery.each(c.split(/\s+/),function(i,cur){
if(!jQuery.className.has(elem.className,cur)){
elem.className+=(elem.className?" ":"")+cur;
}
});
},remove:function(elem,c){
elem.className=c?jQuery.grep(elem.className.split(/\s+/),function(cur){
return !jQuery.className.has(c,cur);
}).join(" "):"";
},has:function(t,c){
t=t.className||t;
return t&&new RegExp("(^|\\s)"+c+"(\\s|$)").test(t);
}},swap:function(e,o,f){
for(var i in o){
e.style["old"+i]=e.style[i];
e.style[i]=o[i];
}
f.apply(e,[]);
for(var i in o){
e.style[i]=e.style["old"+i];
}
},css:function(e,p){
if(p=="height"||p=="width"){
var old={},oHeight,oWidth,d=["Top","Bottom","Right","Left"];
jQuery.each(d,function(){
old["padding"+this]=0;
old["border"+this+"Width"]=0;
});
jQuery.swap(e,old,function(){
if(jQuery.css(e,"display")!="none"){
oHeight=e.offsetHeight;
oWidth=e.offsetWidth;
}else{
e=jQuery(e.cloneNode(true)).find(":radio").removeAttr("checked").end().css({visibility:"hidden",position:"absolute",display:"block",right:"0",left:"0"}).appendTo(e.parentNode)[0];
var _38b2=jQuery.css(e.parentNode,"position");
if(_38b2==""||_38b2=="static"){
e.parentNode.style.position="relative";
}
oHeight=e.clientHeight;
oWidth=e.clientWidth;
if(_38b2==""||_38b2=="static"){
e.parentNode.style.position="static";
}
e.parentNode.removeChild(e);
}
});
return p=="height"?oHeight:oWidth;
}
return jQuery.curCSS(e,p);
},curCSS:function(elem,prop,force){
var ret;
if(prop=="opacity"&&jQuery.browser.msie){
return jQuery.attr(elem.style,"opacity");
}
if(prop=="float"||prop=="cssFloat"){
prop=jQuery.browser.msie?"styleFloat":"cssFloat";
}
if(!force&&elem.style[prop]){
ret=elem.style[prop];
}else{
if(document.defaultView&&document.defaultView.getComputedStyle){
if(prop=="cssFloat"||prop=="styleFloat"){
prop="float";
}
prop=prop.replace(/([A-Z])/g,"-$1").toLowerCase();
var cur=document.defaultView.getComputedStyle(elem,null);
if(cur){
ret=cur.getPropertyValue(prop);
}else{
if(prop=="display"){
ret="none";
}else{
jQuery.swap(elem,{display:"block"},function(){
var c=document.defaultView.getComputedStyle(this,"");
ret=c&&c.getPropertyValue(prop)||"";
});
}
}
}else{
if(elem.currentStyle){
var _38b9=prop.replace(/\-(\w)/g,function(m,c){
return c.toUpperCase();
});
ret=elem.currentStyle[prop]||elem.currentStyle[_38b9];
}
}
}
return ret;
},clean:function(a){
var r=[];
jQuery.each(a,function(i,arg){
if(!arg){
return;
}
if(arg.constructor==Number){
arg=arg.toString();
}
if(typeof arg=="string"){
var s=jQuery.trim(arg),div=document.createElement("div"),tb=[];
var wrap=!s.indexOf("<opt")&&[1,"<select>","</select>"]||(!s.indexOf("<thead")||!s.indexOf("<tbody")||!s.indexOf("<tfoot"))&&[1,"<table>","</table>"]||!s.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!s.indexOf("<td")||!s.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];
div.innerHTML=wrap[1]+s+wrap[2];
while(wrap[0]--){
div=div.firstChild;
}
if(jQuery.browser.msie){
if(!s.indexOf("<table")&&s.indexOf("<tbody")<0){
tb=div.firstChild&&div.firstChild.childNodes;
}else{
if(wrap[1]=="<table>"&&s.indexOf("<tbody")<0){
tb=div.childNodes;
}
}
for(var n=tb.length-1;n>=0;--n){
if(jQuery.nodeName(tb[n],"tbody")&&!tb[n].childNodes.length){
tb[n].parentNode.removeChild(tb[n]);
}
}
}
arg=div.childNodes;
}
if(arg.length===0){
return;
}
if(arg[0]==undefined){
r.push(arg);
}else{
r=jQuery.merge(r,arg);
}
});
return r;
},attr:function(elem,name,value){
var fix={"for":"htmlFor","class":"className","float":jQuery.browser.msie?"styleFloat":"cssFloat",cssFloat:jQuery.browser.msie?"styleFloat":"cssFloat",innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled",checked:"checked",readonly:"readOnly",selected:"selected"};
if(name=="opacity"&&jQuery.browser.msie&&value!=undefined){
elem.zoom=1;
return elem.filter=elem.filter.replace(/alpha\([^\)]*\)/gi,"")+(value==1?"":"alpha(opacity="+value*100+")");
}else{
if(name=="opacity"&&jQuery.browser.msie){
return elem.filter?parseFloat(elem.filter.match(/alpha\(opacity=(.*)\)/)[1])/100:1;
}
}
if(name=="opacity"&&jQuery.browser.mozilla&&value==1){
value=0.9999;
}
if(fix[name]){
if(value!=undefined){
elem[fix[name]]=value;
}
return elem[fix[name]];
}else{
if(value==undefined&&jQuery.browser.msie&&jQuery.nodeName(elem,"form")&&(name=="action"||name=="method")){
return elem.getAttributeNode(name).nodeValue;
}else{
if(elem.tagName){
if(value!=undefined){
elem.setAttribute(name,value);
}
return elem.getAttribute(name);
}else{
name=name.replace(/-([a-z])/ig,function(z,b){
return b.toUpperCase();
});
if(value!=undefined){
elem[name]=value;
}
return elem[name];
}
}
}
},trim:function(t){
return t.replace(/^\s+|\s+$/g,"");
},makeArray:function(a){
var r=[];
if(a.constructor!=Array){
for(var i=0,al=a.length;i<al;i++){
r.push(a[i]);
}
}else{
r=a.slice(0);
}
return r;
},inArray:function(b,a){
for(var i=0,al=a.length;i<al;i++){
if(a[i]==b){
return i;
}
}
return -1;
},merge:function(first,_38d1){
var r=[].slice.call(first,0);
for(var i=0,sl=_38d1.length;i<sl;i++){
if(jQuery.inArray(_38d1[i],r)==-1){
first.push(_38d1[i]);
}
}
return first;
},grep:function(elems,fn,inv){
if(typeof fn=="string"){
fn=new Function("a","i","return "+fn);
}
var _38d7=[];
for(var i=0,el=elems.length;i<el;i++){
if(!inv&&fn(elems[i],i)||inv&&!fn(elems[i],i)){
_38d7.push(elems[i]);
}
}
return _38d7;
},map:function(elems,fn){
if(typeof fn=="string"){
fn=new Function("a","return "+fn);
}
var _38db=[],r=[];
for(var i=0,el=elems.length;i<el;i++){
var val=fn(elems[i],i);
if(val!==null&&val!=undefined){
if(val.constructor!=Array){
val=[val];
}
_38db=_38db.concat(val);
}
}
var r=_38db.length?[_38db[0]]:[];
check:
for(var i=1,rl=_38db.length;i<rl;i++){
for(var j=0;j<i;j++){
if(_38db[i]==r[j]){
continue check;
}
}
r.push(_38db[i]);
}
return r;
}});
new function(){
var b=navigator.userAgent.toLowerCase();
jQuery.browser={safari:/webkit/.test(b),opera:/opera/.test(b),msie:/msie/.test(b)&&!/opera/.test(b),mozilla:/mozilla/.test(b)&&!/(compatible|webkit)/.test(b)};
jQuery.boxModel=!jQuery.browser.msie||document.compatMode=="CSS1Compat";
};
jQuery.each({parent:"a.parentNode",parents:"jQuery.parents(a)",next:"jQuery.nth(a,2,'nextSibling')",prev:"jQuery.nth(a,2,'previousSibling')",siblings:"jQuery.sibling(a.parentNode.firstChild,a)",children:"jQuery.sibling(a.firstChild)"},function(i,n){
jQuery.fn[i]=function(a){
var ret=jQuery.map(this,n);
if(a&&typeof a=="string"){
ret=jQuery.multiFilter(a,ret);
}
return this.pushStack(ret);
};
});
jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after"},function(i,n){
jQuery.fn[i]=function(){
var a=arguments;
return this.each(function(){
for(var j=0,al=a.length;j<al;j++){
jQuery(a[j])[n](this);
}
});
};
});
jQuery.each({removeAttr:function(key){
jQuery.attr(this,key,"");
this.removeAttribute(key);
},addClass:function(c){
jQuery.className.add(this,c);
},removeClass:function(c){
jQuery.className.remove(this,c);
},toggleClass:function(c){
jQuery.className[jQuery.className.has(this,c)?"remove":"add"](this,c);
},remove:function(a){
if(!a||jQuery.filter(a,[this]).r.length){
this.parentNode.removeChild(this);
}
},empty:function(){
while(this.firstChild){
this.removeChild(this.firstChild);
}
}},function(i,n){
jQuery.fn[i]=function(){
return this.each(n,arguments);
};
});
jQuery.each(["eq","lt","gt","contains"],function(i,n){
jQuery.fn[n]=function(num,fn){
return this.filter(":"+n+"("+num+")",fn);
};
});
jQuery.each(["height","width"],function(i,n){
jQuery.fn[n]=function(h){
return h==undefined?(this.length?jQuery.css(this[0],n):null):this.css(n,h.constructor==String?h:h+"px");
};
});
jQuery.extend({expr:{"":"m[2]=='*'||jQuery.nodeName(a,m[2])","#":"a.getAttribute('id')==m[2]",":":{lt:"i<m[3]-0",gt:"i>m[3]-0",nth:"m[3]-0==i",eq:"m[3]-0==i",first:"i==0",last:"i==r.length-1",even:"i%2==0",odd:"i%2","nth-child":"jQuery.nth(a.parentNode.firstChild,m[3],'nextSibling',a)==a","first-child":"jQuery.nth(a.parentNode.firstChild,1,'nextSibling')==a","last-child":"jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a","only-child":"jQuery.sibling(a.parentNode.firstChild).length==1",parent:"a.firstChild",empty:"!a.firstChild",contains:"jQuery.fn.text.apply([a]).indexOf(m[3])>=0",visible:"a.type!=\"hidden\"&&jQuery.css(a,\"display\")!=\"none\"&&jQuery.css(a,\"visibility\")!=\"hidden\"",hidden:"a.type==\"hidden\"||jQuery.css(a,\"display\")==\"none\"||jQuery.css(a,\"visibility\")==\"hidden\"",enabled:"!a.disabled",disabled:"a.disabled",checked:"a.checked",selected:"a.selected||jQuery.attr(a,'selected')",text:"a.type=='text'",radio:"a.type=='radio'",checkbox:"a.type=='checkbox'",file:"a.type=='file'",password:"a.type=='password'",submit:"a.type=='submit'",image:"a.type=='image'",reset:"a.type=='reset'",button:"a.type==\"button\"||jQuery.nodeName(a,\"button\")",input:"/input|select|textarea|button/i.test(a.nodeName)"},".":"jQuery.className.has(a,m[2])","@":{"=":"z==m[4]","!=":"z!=m[4]","^=":"z&&!z.indexOf(m[4])","$=":"z&&z.substr(z.length - m[4].length,m[4].length)==m[4]","*=":"z&&z.indexOf(m[4])>=0","":"z",_resort:function(m){
return ["",m[1],m[3],m[2],m[5]];
},_prefix:"z=a[m[3]]||jQuery.attr(a,m[3]);"},"[":"jQuery.find(m[2],a).length"},parse:[/^\[ *(@)([a-z0-9_-]*) *([!*$^=]*) *('?"?)(.*?)\4 *\]/i,/^(\[)\s*(.*?(\[.*?\])?[^[]*?)\s*\]/,/^(:)([a-z0-9_-]*)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/i,/^([:.#]*)([a-z0-9_*-]*)/i],token:[/^(\/?\.\.)/,"a.parentNode",/^(>|\/)/,"jQuery.sibling(a.firstChild)",/^(\+)/,"jQuery.nth(a,2,'nextSibling')",/^(~)/,function(a){
var s=jQuery.sibling(a.parentNode.firstChild);
return s.slice(0,jQuery.inArray(a,s));
}],multiFilter:function(expr,elems,not){
var old,cur=[];
while(expr&&expr!=old){
old=expr;
var f=jQuery.filter(expr,elems,not);
expr=f.t.replace(/^\s*,\s*/,"");
cur=not?elems=f.r:jQuery.merge(cur,f.r);
}
return cur;
},find:function(t,_3900){
if(typeof t!="string"){
return [t];
}
if(_3900&&!_3900.nodeType){
_3900=null;
}
_3900=_3900||document;
if(!t.indexOf("//")){
_3900=_3900.documentElement;
t=t.substr(2,t.length);
}else{
if(!t.indexOf("/")){
_3900=_3900.documentElement;
t=t.substr(1,t.length);
if(t.indexOf("/")>=1){
t=t.substr(t.indexOf("/"),t.length);
}
}
}
var ret=[_3900],done=[],last=null;
while(t&&last!=t){
var r=[];
last=t;
t=jQuery.trim(t).replace(/^\/\//i,"");
var _3903=false;
var re=/^[\/>]\s*([a-z0-9*-]+)/i;
var m=re.exec(t);
if(m){
jQuery.each(ret,function(){
for(var c=this.firstChild;c;c=c.nextSibling){
if(c.nodeType==1&&(jQuery.nodeName(c,m[1])||m[1]=="*")){
r.push(c);
}
}
});
ret=r;
t=t.replace(re,"");
if(t.indexOf(" ")==0){
continue;
}
_3903=true;
}else{
for(var i=0;i<jQuery.token.length;i+=2){
var re=jQuery.token[i];
var m=re.exec(t);
if(m){
r=ret=jQuery.map(ret,jQuery.isFunction(jQuery.token[i+1])?jQuery.token[i+1]:function(a){
return eval(jQuery.token[i+1]);
});
t=jQuery.trim(t.replace(re,""));
_3903=true;
break;
}
}
}
if(t&&!_3903){
if(!t.indexOf(",")){
if(ret[0]==_3900){
ret.shift();
}
jQuery.merge(done,ret);
r=ret=[_3900];
t=" "+t.substr(1,t.length);
}else{
var re2=/^([a-z0-9_-]+)(#)([a-z0-9\\*_-]*)/i;
var m=re2.exec(t);
if(m){
m=[0,m[2],m[3],m[1]];
}else{
re2=/^([#.]?)([a-z0-9\\*_-]*)/i;
m=re2.exec(t);
}
if(m[1]=="#"&&ret[ret.length-1].getElementById){
var oid=ret[ret.length-1].getElementById(m[2]);
ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[];
}else{
if(m[1]=="."){
var rec=new RegExp("(^|\\s)"+m[2]+"(\\s|$)");
}
jQuery.each(ret,function(){
var tag=m[1]!=""||m[0]==""?"*":m[2];
if(jQuery.nodeName(this,"object")&&tag=="*"){
tag="param";
}
jQuery.merge(r,m[1]!=""&&ret.length!=1?jQuery.getAll(this,[],m[1],m[2],rec):this.getElementsByTagName(tag));
});
if(m[1]=="."&&ret.length==1){
r=jQuery.grep(r,function(e){
return rec.test(e.className);
});
}
if(m[1]=="#"&&ret.length==1){
var tmp=r;
r=[];
jQuery.each(tmp,function(){
if(this.getAttribute("id")==m[2]){
r=[this];
return false;
}
});
}
ret=r;
}
t=t.replace(re2,"");
}
}
if(t){
var val=jQuery.filter(t,r);
ret=r=val.r;
t=jQuery.trim(val.t);
}
}
if(ret&&ret[0]==_3900){
ret.shift();
}
jQuery.merge(done,ret);
return done;
},filter:function(t,r,not){
while(t&&/^[a-z[({<*:.#]/i.test(t)){
var p=jQuery.parse,m;
jQuery.each(p,function(i,re){
m=re.exec(t);
if(m){
t=t.substring(m[0].length);
if(jQuery.expr[m[1]]._resort){
m=jQuery.expr[m[1]]._resort(m);
}
return false;
}
});
if(m[1]==":"&&m[2]=="not"){
r=jQuery.filter(m[3],r,true).r;
}else{
if(m[1]=="."){
var re=new RegExp("(^|\\s)"+m[2]+"(\\s|$)");
r=jQuery.grep(r,function(e){
return re.test(e.className||"");
},not);
}else{
var f=jQuery.expr[m[1]];
if(typeof f!="string"){
f=jQuery.expr[m[1]][m[2]];
}
eval("f = function(a,i){"+(jQuery.expr[m[1]]._prefix||"")+"return "+f+"}");
r=jQuery.grep(r,f,not);
}
}
}
return {r:r,t:t};
},getAll:function(o,r,token,name,re){
for(var s=o.firstChild;s;s=s.nextSibling){
if(s.nodeType==1){
var add=true;
if(token=="."){
add=s.className&&re.test(s.className);
}else{
if(token=="#"){
add=s.getAttribute("id")==name;
}
}
if(add){
r.push(s);
}
if(token=="#"&&r.length){
break;
}
if(s.firstChild){
jQuery.getAll(s,r,token,name,re);
}
}
}
return r;
},parents:function(elem){
var _3921=[];
var cur=elem.parentNode;
while(cur&&cur!=document){
_3921.push(cur);
cur=cur.parentNode;
}
return _3921;
},nth:function(cur,_3924,dir,elem){
_3924=_3924||1;
var num=0;
for(;cur;cur=cur[dir]){
if(cur.nodeType==1){
num++;
}
if(num==_3924||_3924=="even"&&num%2==0&&num>1&&cur==elem||_3924=="odd"&&num%2==1&&cur==elem){
return cur;
}
}
},sibling:function(n,elem){
var r=[];
for(;n;n=n.nextSibling){
if(n.nodeType==1&&(!elem||n!=elem)){
r.push(n);
}
}
return r;
}});
jQuery.event={add:function(_392b,type,_392d,data){
if(jQuery.browser.msie&&_392b.setInterval!=undefined){
_392b=window;
}
if(data){
_392d.data=data;
}
if(!_392d.guid){
_392d.guid=this.guid++;
}
if(!_392b.events){
_392b.events={};
}
var _392f=_392b.events[type];
if(!_392f){
_392f=_392b.events[type]={};
if(_392b["on"+type]){
_392f[0]=_392b["on"+type];
}
}
_392f[_392d.guid]=_392d;
_392b["on"+type]=this.handle;
if(!this.global[type]){
this.global[type]=[];
}
this.global[type].push(_392b);
},guid:1,global:{},remove:function(_3930,type,_3932){
if(_3930.events){
if(type&&type.type){
delete _3930.events[type.type][type.handler.guid];
}else{
if(type&&_3930.events[type]){
if(_3932){
delete _3930.events[type][_3932.guid];
}else{
for(var i in _3930.events[type]){
delete _3930.events[type][i];
}
}
}else{
for(var j in _3930.events){
this.remove(_3930,j);
}
}
}
}
},trigger:function(type,data,_3937){
data=jQuery.makeArray(data||[]);
if(!_3937){
jQuery.each(this.global[type]||[],function(){
jQuery.event.trigger(type,data,this);
});
}else{
var _3938=_3937["on"+type],val,fn=jQuery.isFunction(_3937[type]);
if(_3938){
data.unshift(this.fix({type:type,target:_3937}));
if((val=_3938.apply(_3937,data))!==false){
this.triggered=true;
}
}
if(fn&&val!==false){
_3937[type]();
}
this.triggered=false;
}
},handle:function(event){
if(typeof jQuery=="undefined"||jQuery.event.triggered){
return;
}
event=jQuery.event.fix(event||window.event||{});
var _393a;
var c=this.events[event.type];
var args=[].slice.call(arguments,1);
args.unshift(event);
for(var j in c){
args[0].handler=c[j];
args[0].data=c[j].data;
if(c[j].apply(this,args)===false){
event.preventDefault();
event.stopPropagation();
_393a=false;
}
}
if(jQuery.browser.msie){
event.target=event.preventDefault=event.stopPropagation=event.handler=event.data=null;
}
return _393a;
},fix:function(event){
if(!event.target&&event.srcElement){
event.target=event.srcElement;
}
if(event.pageX==undefined&&event.clientX!=undefined){
var e=document.documentElement,b=document.body;
event.pageX=event.clientX+(e.scrollLeft||b.scrollLeft);
event.pageY=event.clientY+(e.scrollTop||b.scrollTop);
}
if(jQuery.browser.safari&&event.target.nodeType==3){
var _3940=event;
event=jQuery.extend({},_3940);
event.target=_3940.target.parentNode;
event.preventDefault=function(){
return _3940.preventDefault();
};
event.stopPropagation=function(){
return _3940.stopPropagation();
};
}
if(!event.preventDefault){
event.preventDefault=function(){
this.returnValue=false;
};
}
if(!event.stopPropagation){
event.stopPropagation=function(){
this.cancelBubble=true;
};
}
return event;
}};
jQuery.fn.extend({bind:function(type,data,fn){
return this.each(function(){
jQuery.event.add(this,type,fn||data,data);
});
},one:function(type,data,fn){
return this.each(function(){
jQuery.event.add(this,type,function(event){
jQuery(this).unbind(event);
return (fn||data).apply(this,arguments);
},data);
});
},unbind:function(type,fn){
return this.each(function(){
jQuery.event.remove(this,type,fn);
});
},trigger:function(type,data){
return this.each(function(){
jQuery.event.trigger(type,data,this);
});
},toggle:function(){
var a=arguments;
return this.click(function(e){
this.lastToggle=this.lastToggle==0?1:0;
e.preventDefault();
return a[this.lastToggle].apply(this,[e])||false;
});
},hover:function(f,g){
function handleHover(e){
var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;
while(p&&p!=this){
try{
p=p.parentNode;
}
catch(e){
p=this;
}
}
if(p==this){
return false;
}
return (e.type=="mouseover"?f:g).apply(this,[e]);
}
return this.mouseover(handleHover).mouseout(handleHover);
},ready:function(f){
if(jQuery.isReady){
f.apply(document,[jQuery]);
}else{
jQuery.readyList.push(function(){
return f.apply(this,[jQuery]);
});
}
return this;
}});
jQuery.extend({isReady:false,readyList:[],ready:function(){
if(!jQuery.isReady){
jQuery.isReady=true;
if(jQuery.readyList){
jQuery.each(jQuery.readyList,function(){
this.apply(document);
});
jQuery.readyList=null;
}
if(jQuery.browser.mozilla||jQuery.browser.opera){
document.removeEventListener("DOMContentLoaded",jQuery.ready,false);
}
}
}});
new function(){
jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,o){
jQuery.fn[o]=function(f){
return f?this.bind(o,f):this.trigger(o);
};
});
if(jQuery.browser.mozilla||jQuery.browser.opera){
document.addEventListener("DOMContentLoaded",jQuery.ready,false);
}else{
if(jQuery.browser.msie){
document.write("<scr"+"ipt id=__ie_init defer=true "+"src=//:></script>");
var _3956=document.getElementById("__ie_init");
if(_3956){
_3956.onreadystatechange=function(){
if(this.readyState!="complete"){
return;
}
this.parentNode.removeChild(this);
jQuery.ready();
};
}
_3956=null;
}else{
if(jQuery.browser.safari){
jQuery.safariTimer=setInterval(function(){
if(document.readyState=="loaded"||document.readyState=="complete"){
clearInterval(jQuery.safariTimer);
jQuery.safariTimer=null;
jQuery.ready();
}
},10);
}
}
}
jQuery.event.add(window,"load",jQuery.ready);
};
if(jQuery.browser.msie){
jQuery(window).one("unload",function(){
var _3957=jQuery.event.global;
for(var type in _3957){
var els=_3957[type],i=els.length;
if(i&&type!="unload"){
do{
jQuery.event.remove(els[i-1],type);
}while(--i);
}
}
});
}
jQuery.fn.extend({show:function(speed,_395b){
var _395c=this.filter(":hidden");
speed?_395c.animate({height:"show",width:"show",opacity:"show"},speed,_395b):_395c.each(function(){
this.style.display=this.oldblock?this.oldblock:"";
if(jQuery.css(this,"display")=="none"){
this.style.display="block";
}
});
return this;
},hide:function(speed,_395e){
var _395f=this.filter(":visible");
speed?_395f.animate({height:"hide",width:"hide",opacity:"hide"},speed,_395e):_395f.each(function(){
this.oldblock=this.oldblock||jQuery.css(this,"display");
if(this.oldblock=="none"){
this.oldblock="block";
}
this.style.display="none";
});
return this;
},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){
var args=arguments;
return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle(fn,fn2):this.each(function(){
jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"].apply(jQuery(this),args);
});
},slideDown:function(speed,_3964){
return this.animate({height:"show"},speed,_3964);
},slideUp:function(speed,_3966){
return this.animate({height:"hide"},speed,_3966);
},slideToggle:function(speed,_3968){
return this.each(function(){
var state=jQuery(this).is(":hidden")?"show":"hide";
jQuery(this).animate({height:state},speed,_3968);
});
},fadeIn:function(speed,_396b){
return this.animate({opacity:"show"},speed,_396b);
},fadeOut:function(speed,_396d){
return this.animate({opacity:"hide"},speed,_396d);
},fadeTo:function(speed,to,_3970){
return this.animate({opacity:to},speed,_3970);
},animate:function(prop,speed,_3973,_3974){
return this.queue(function(){
this.curAnim=jQuery.extend({},prop);
var opt=jQuery.speed(speed,_3973,_3974);
for(var p in prop){
var e=new jQuery.fx(this,opt,p);
if(prop[p].constructor==Number){
e.custom(e.cur(),prop[p]);
}else{
e[prop[p]](prop);
}
}
});
},queue:function(type,fn){
if(!fn){
fn=type;
type="fx";
}
return this.each(function(){
if(!this.queue){
this.queue={};
}
if(!this.queue[type]){
this.queue[type]=[];
}
this.queue[type].push(fn);
if(this.queue[type].length==1){
fn.apply(this);
}
});
}});
jQuery.extend({speed:function(speed,_397b,fn){
var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&_397b||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&_397b||_397b&&_397b.constructor!=Function&&_397b};
opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:{slow:600,fast:200}[opt.duration])||400;
opt.old=opt.complete;
opt.complete=function(){
jQuery.dequeue(this,"fx");
if(jQuery.isFunction(opt.old)){
opt.old.apply(this);
}
};
return opt;
},easing:{},queue:{},dequeue:function(elem,type){
type=type||"fx";
if(elem.queue&&elem.queue[type]){
elem.queue[type].shift();
var f=elem.queue[type][0];
if(f){
f.apply(elem);
}
}
},fx:function(elem,_3982,prop){
var z=this;
var y=elem.style;
var _3986=jQuery.css(elem,"display");
y.display="block";
y.overflow="hidden";
z.a=function(){
if(_3982.step){
_3982.step.apply(elem,[z.now]);
}
if(prop=="opacity"){
jQuery.attr(y,"opacity",z.now);
}else{
if(parseInt(z.now)){
y[prop]=parseInt(z.now)+"px";
}
}
};
z.max=function(){
return parseFloat(jQuery.css(elem,prop));
};
z.cur=function(){
var r=parseFloat(jQuery.curCSS(elem,prop));
return r&&r>-10000?r:z.max();
};
z.custom=function(from,to){
z.startTime=(new Date()).getTime();
z.now=from;
z.a();
z.timer=setInterval(function(){
z.step(from,to);
},13);
};
z.show=function(){
if(!elem.orig){
elem.orig={};
}
elem.orig[prop]=this.cur();
_3982.show=true;
z.custom(0,elem.orig[prop]);
if(prop!="opacity"){
y[prop]="1px";
}
};
z.hide=function(){
if(!elem.orig){
elem.orig={};
}
elem.orig[prop]=this.cur();
_3982.hide=true;
z.custom(elem.orig[prop],0);
};
z.toggle=function(){
if(!elem.orig){
elem.orig={};
}
elem.orig[prop]=this.cur();
if(_3986=="none"){
_3982.show=true;
if(prop!="opacity"){
y[prop]="1px";
}
z.custom(0,elem.orig[prop]);
}else{
_3982.hide=true;
z.custom(elem.orig[prop],0);
}
};
z.step=function(_398a,_398b){
var t=(new Date()).getTime();
if(t>_3982.duration+z.startTime){
clearInterval(z.timer);
z.timer=null;
z.now=_398b;
z.a();
if(elem.curAnim){
elem.curAnim[prop]=true;
}
var done=true;
for(var i in elem.curAnim){
if(elem.curAnim[i]!==true){
done=false;
}
}
if(done){
y.overflow="";
y.display=_3986;
if(jQuery.css(elem,"display")=="none"){
y.display="block";
}
if(_3982.hide){
y.display="none";
}
if(_3982.hide||_3982.show){
for(var p in elem.curAnim){
if(p=="opacity"){
jQuery.attr(y,p,elem.orig[p]);
}else{
y[p]="";
}
}
}
}
if(done&&jQuery.isFunction(_3982.complete)){
_3982.complete.apply(elem);
}
}else{
var n=t-this.startTime;
var p=n/_3982.duration;
z.now=_3982.easing&&jQuery.easing[_3982.easing]?jQuery.easing[_3982.easing](p,n,_398a,(_398b-_398a),_3982.duration):((-Math.cos(p*Math.PI)/2)+0.5)*(_398b-_398a)+_398a;
z.a();
}
};
}});
jQuery.fn.extend({loadIfModified:function(url,_3992,_3993){
this.load(url,_3992,_3993,1);
},load:function(url,_3995,_3996,_3997){
if(jQuery.isFunction(url)){
return this.bind("load",url);
}
_3996=_3996||function(){
};
var type="GET";
if(_3995){
if(jQuery.isFunction(_3995)){
_3996=_3995;
_3995=null;
}else{
_3995=jQuery.param(_3995);
type="POST";
}
}
var self=this;
jQuery.ajax({url:url,type:type,data:_3995,ifModified:_3997,complete:function(res,_399b){
if(_399b=="success"||!_3997&&_399b=="notmodified"){
self.attr("innerHTML",res.responseText).evalScripts().each(_3996,[res.responseText,_399b,res]);
}else{
_3996.apply(self,[res.responseText,_399b,res]);
}
}});
return this;
},serialize:function(){
return jQuery.param(this);
},evalScripts:function(){
return this.find("script").each(function(){
if(this.src){
jQuery.getScript(this.src);
}else{
jQuery.globalEval(this.text||this.textContent||this.innerHTML||"");
}
}).end();
}});
if(!window.XMLHttpRequest){
XMLHttpRequest=function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
}
jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){
jQuery.fn[o]=function(f){
return this.bind(o,f);
};
});
jQuery.extend({get:function(url,data,_39a1,type,_39a3){
if(jQuery.isFunction(data)){
_39a1=data;
data=null;
}
return jQuery.ajax({url:url,data:data,success:_39a1,dataType:type,ifModified:_39a3});
},getIfModified:function(url,data,_39a6,type){
return jQuery.get(url,data,_39a6,type,1);
},getScript:function(url,_39a9){
return jQuery.get(url,null,_39a9,"script");
},getJSON:function(url,data,_39ac){
return jQuery.get(url,data,_39ac,"json");
},post:function(url,data,_39af,type){
if(jQuery.isFunction(data)){
_39af=data;
data={};
}
return jQuery.ajax({type:"POST",url:url,data:data,success:_39af,dataType:type});
},ajaxTimeout:function(_39b1){
jQuery.ajaxSettings.timeout=_39b1;
},ajaxSetup:function(_39b2){
jQuery.extend(jQuery.ajaxSettings,_39b2);
},ajaxSettings:{global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null},lastModified:{},ajax:function(s){
s=jQuery.extend({},jQuery.ajaxSettings,s);
if(s.data){
if(s.processData&&typeof s.data!="string"){
s.data=jQuery.param(s.data);
}
if(s.type.toLowerCase()=="get"){
s.url+=((s.url.indexOf("?")>-1)?"&":"?")+s.data;
}
}
if(s.global&&!jQuery.active++){
jQuery.event.trigger("ajaxStart");
}
var _39b4=false;
var xml=new XMLHttpRequest();
xml.open(s.type,s.url,s.async);
if(s.data){
xml.setRequestHeader("Content-Type",s.contentType);
}
if(s.ifModified){
xml.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");
}
xml.setRequestHeader("X-Requested-With","XMLHttpRequest");
if(xml.overrideMimeType){
xml.setRequestHeader("Connection","close");
}
if(s.beforeSend){
s.beforeSend(xml);
}
if(s.global){
jQuery.event.trigger("ajaxSend",[xml,s]);
}
var _39b6=function(_39b7){
if(xml&&(xml.readyState==4||_39b7=="timeout")){
_39b4=true;
var _39b8;
try{
_39b8=jQuery.httpSuccess(xml)&&_39b7!="timeout"?s.ifModified&&jQuery.httpNotModified(xml,s.url)?"notmodified":"success":"error";
if(_39b8!="error"){
var _39b9;
try{
_39b9=xml.getResponseHeader("Last-Modified");
}
catch(e){
}
if(s.ifModified&&_39b9){
jQuery.lastModified[s.url]=_39b9;
}
var data=jQuery.httpData(xml,s.dataType);
if(s.success){
s.success(data,_39b8);
}
if(s.global){
jQuery.event.trigger("ajaxSuccess",[xml,s]);
}
}else{
jQuery.handleError(s,xml,_39b8);
}
}
catch(e){
_39b8="error";
jQuery.handleError(s,xml,_39b8,e);
}
if(s.global){
jQuery.event.trigger("ajaxComplete",[xml,s]);
}
if(s.global&&!--jQuery.active){
jQuery.event.trigger("ajaxStop");
}
if(s.complete){
s.complete(xml,_39b8);
}
xml.onreadystatechange=function(){
};
xml=null;
}
};
xml.onreadystatechange=_39b6;
if(s.timeout>0){
setTimeout(function(){
if(xml){
xml.abort();
if(!_39b4){
_39b6("timeout");
}
}
},s.timeout);
}
var xml2=xml;
try{
xml2.send(s.data);
}
catch(e){
jQuery.handleError(s,xml,null,e);
}
if(!s.async){
_39b6();
}
return xml2;
},handleError:function(s,xml,_39be,e){
if(s.error){
s.error(xml,_39be,e);
}
if(s.global){
jQuery.event.trigger("ajaxError",[xml,s,e]);
}
},active:0,httpSuccess:function(r){
try{
return !r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||jQuery.browser.safari&&r.status==undefined;
}
catch(e){
}
return false;
},httpNotModified:function(xml,url){
try{
var _39c3=xml.getResponseHeader("Last-Modified");
return xml.status==304||_39c3==jQuery.lastModified[url]||jQuery.browser.safari&&xml.status==undefined;
}
catch(e){
}
return false;
},httpData:function(r,type){
var ct=r.getResponseHeader("content-type");
var data=!type&&ct&&ct.indexOf("xml")>=0;
data=type=="xml"||data?r.responseXML:r.responseText;
if(type=="script"){
jQuery.globalEval(data);
}
if(type=="json"){
eval("data = "+data);
}
if(type=="html"){
jQuery("<div>").html(data).evalScripts();
}
return data;
},param:function(a){
var s=[];
if(a.constructor==Array||a.jquery){
jQuery.each(a,function(){
s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value));
});
}else{
for(var j in a){
if(a[j]&&a[j].constructor==Array){
jQuery.each(a[j],function(){
s.push(encodeURIComponent(j)+"="+encodeURIComponent(this));
});
}else{
s.push(encodeURIComponent(j)+"="+encodeURIComponent(a[j]));
}
}
}
return s.join("&");
},globalEval:function(data){
if(window.execScript){
window.execScript(data);
}else{
if(jQuery.browser.safari){
window.setTimeout(data,0);
}else{
eval.call(window,data);
}
}
}});
}
