(function(e,t,n){function c(e,t){var n=e.keyCode,r=t.data("dropkick"),i=t.find(".dk_options"),s=t.hasClass("dk_open"),u=t.find(".dk_option_current"),a=i.find("li").first(),f=i.find("li").last(),l,c;switch(n){case o.enter:if(s){h(u.find("a"),t);v(t)}else{m(t)}e.preventDefault();break;case o.up:c=u.prev("li");if(s){if(c.length){p(c,t)}else{p(f,t)}}else{m(t)}e.preventDefault();break;case o.down:if(s){l=u.next("li").first();if(l.length){p(l,t)}else{p(a,t)}}else{m(t)}e.preventDefault();break;default:break}}function h(e,t,n){var r,i,s;r=e.attr("data-dk-dropdown-value");i=e.text();s=t.data("dropkick");$select=s.$select;$select.val(r);t.find(".dk_label").text(i);n=n||false;if(s.settings.change&&!n){s.settings.change.call($select,r,i)}}function p(e,t){t.find(".dk_option_current").removeClass("dk_option_current");e.addClass("dk_option_current");d(t,e)}function d(e,t){var n=t.prevAll("li").outerHeight()*t.prevAll("li").length;e.find(".dk_options_inner").animate({scrollTop:n+"px"},0)}function v(e){e.removeClass("dk_open")}function m(e){var t=e.data("dropkick");e.find(".dk_options").css({top:e.find(".dk_toggle").outerHeight()-1});e.toggleClass("dk_open")}function g(t,n){var r=t,i=[],s;r=r.replace("{{ id }}",n.id);r=r.replace("{{ label }}",n.label);r=r.replace("{{ tabindex }}",n.tabindex);if(n.options&&n.options.length){for(var o=0,u=n.options.length;o<u;o++){var f=e(n.options[o]),l="dk_option_current",c=a;c=c.replace("{{ value }}",f.val());c=c.replace("{{ current }}",y(f.val())===n.value?l:"");c=c.replace("{{ text }}",f.text());i[i.length]=c}}s=e(r);s.find(".dk_options_inner").html(i.join(""));return s}function y(t){return e.trim(t).length>0?t:false}var r=false;if(e.browser.msie&&e.browser.version.substr(0,1)<7){r=true}else{n.documentElement.className=n.documentElement.className+" dk_fouc"}var i={},s=[],o={left:37,up:38,right:39,down:40,enter:13},u=['<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">','<a class="dk_toggle">','<span class="dk_label">{{ label }}</span>',"</a>",'<div class="dk_options">','<ul class="dk_options_inner">',"</ul>","</div>","</div>"].join(""),a='<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}">{{ text }}</a></li>',f={startSpeed:1e3,theme:false,change:false},l=false;i.init=function(t){t=e.extend({},f,t);return this.each(function(){var n=e(this),r=n.find(":selected").first(),i=n.find("option"),o=n.data("dropkick")||{},a=n.attr("id")||n.attr("name"),f=t.width||n.outerWidth(),l=n.attr("tabindex")?n.attr("tabindex"):"",c=false,h;if(o.id){return n}else{o.settings=t;o.tabindex=l;o.id=a;o.$original=r;o.$select=n;o.value=y(n.val())||y(r.attr("value"));o.label=r.text();o.options=i}c=g(u,o);c.find(".dk_toggle").css({width:f+"px"});n.before(c);c=e("#dk_container_"+a).fadeIn(t.startSpeed);h=t.theme?t.theme:"default";c.addClass("dk_theme_"+h);o.theme=h;o.$dk=c;n.data("dropkick",o);c.data("dropkick",o);s[s.length]=n;c.bind("focus.dropkick",function(e){c.addClass("dk_focus")}).bind("blur.dropkick",function(e){c.removeClass("dk_open dk_focus")});setTimeout(function(){n.hide()},0)})};i.theme=function(t){var n=e(this),r=n.data("dropkick"),i=r.$dk,s="dk_theme_"+r.theme;i.removeClass(s).addClass("dk_theme_"+t);r.theme=t};i.reset=function(){for(var e=0,t=s.length;e<t;e++){var n=s[e].data("dropkick"),r=n.$dk,i=r.find("li").first();r.find(".dk_label").text(n.label);r.find(".dk_options_inner").animate({scrollTop:0},0);p(i,r);h(i,r,true)}};e.fn.dropkick=function(e){if(!r){if(i[e]){return i[e].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof e==="object"||!e){return i.init.apply(this,arguments)}}};e(function(){e(".dk_toggle").live("click",function(n){var r=e(this).parents(".dk_container").first();m(r);if("ontouchstart"in t){r.addClass("dk_touch");r.find(".dk_options_inner").addClass("scrollable vertical")}n.preventDefault();return false});e(".dk_options a").live(e.browser.msie?"mousedown":"click",function(t){var n=e(this),r=n.parents(".dk_container").first(),i=r.data("dropkick");v(r);h(n,r);p(n.parent(),r);t.preventDefault();return false});e(n).bind("keydown.dk_nav",function(t){var n=e(".dk_container.dk_open"),r=e(".dk_container.dk_focus"),i=null;if(n.length){i=n}else if(r.length&&!n.length){i=r}if(i){c(t,i)}})})})(jQuery,window,document)