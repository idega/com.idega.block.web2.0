/*
 * jqModal - Minimalist Modaling with jQuery
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.08.17 +r11
 * 
 */
(function(jQuery) {
jQuery.fn.jqm=function(o){
var _o = {
zIndex: 3000,
overlay: 50,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: false,
target: false,
modal: false,
toTop: false,
onShow: false,
onHide: false,
onLoad: false
};
return this.each(function(){if(this._jqm)return; s++; this._jqm=s;
H[s]={c:jQuery.extend(_o, o),a:false,w:jQuery(this).addClass('jqmID'+s),s:s};
if(_o.trigger)jQuery(this).jqmAddTrigger(_o.trigger);
});};

jQuery.fn.jqmAddClose=function(e){hs(this,e,'jqmHide'); return this;};
jQuery.fn.jqmAddTrigger=function(e){hs(this,e,'jqmShow'); return this;};
jQuery.fn.jqmShow=function(t){return this.each(function(){if(!H[this._jqm].a)jQuery.jqm.open(this._jqm,t)});};
jQuery.fn.jqmHide=function(t){return this.each(function(){if(H[this._jqm].a)jQuery.jqm.close(this._jqm,t)});};

jQuery.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(/^\d+$/.test(h.w.css('z-index')))?h.w.css('z-index'):c.zIndex,o=jQuery('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])F('bind');A.push(s);o.css('cursor','wait');}
 else if(c.overlay > 0)h.w.jqmAddClose(o);
 else o=false;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):false;
 if(ie6){jQuery('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?jQuery(r,h.w):jQuery(r),u=(u.substr(0,1) == '@')?jQuery(t).attr(u.substring(1)):u;
  r.load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose(jQuery(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose(jQuery(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
 (c.onShow)?c.onShow(h):h.w.show();e(h);return false;
},
close:function(s){var h=H[s];h.a=false;
 if(A[0]){A.pop();if(!A[0])F('unbind');}
 if(h.c.toTop&&h.o)jQuery('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return false;
}};
var s=0,H=jQuery.jqm.hash,A=[],ie6=jQuery.browser.msie&&(jQuery.browser.version == "6.0"),
i=jQuery('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),
e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!jQuery('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
f=function(h){try{jQuery(':input:visible',h.w)[0].focus();}catch(e){}},
F=function(t){jQuery()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!jQuery(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
hs=function(w,e,y){var s=[];w.each(function(){s.push(this._jqm)});
 jQuery(e).each(function(){if(this[y])jQuery.extend(this[y],s);else{this[y]=s;jQuery(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return false;});}});};
})(jQuery);