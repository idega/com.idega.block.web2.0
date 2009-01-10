/*
 * FancyBox - simple jQuery plugin for fancy image zooming
 * Examples and documentation at: http://fancy.klade.lv/
 * Version: 1.0.0 (29/04/2008)
 * Copyright (c) 2008 Janis Skarnelis
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery v1.2.1 or later
*/
(function(jQuery) {
	var opts = {}, 
		imgPreloader = new Image, imgTypes = ['png', 'jpg', 'jpeg', 'gif'], 
		loadingTimer, loadingFrame = 1;

   jQuery.fn.fancybox = function(settings) {
		opts.settings = jQuery.extend({}, jQuery.fn.fancybox.defaults, settings);

		jQuery.fn.fancybox.init();

		return this.each(function() {
			var jQuerythis = jQuery(this);
			var o = jQuery.metadata ? jQuery.extend({}, opts.settings, jQuerythis.metadata()) : opts.settings;

			jQuerythis.unbind('click').click(function() {
				jQuery.fn.fancybox.start(this, o); return false;
			});
		});
	};

	jQuery.fn.fancybox.start = function(el, o) {
		if (opts.animating) return false;

		if (o.overlayShow) {
			jQuery("#fancy_wrap").prepend('<div id="fancy_overlay"></div>');
			jQuery("#fancy_overlay").css({'width': jQuery(window).width(), 'height': jQuery(document).height(), 'opacity': o.overlayOpacity});

			if (jQuery.browser.msie) {
				jQuery("#fancy_wrap").prepend('<iframe id="fancy_bigIframe" scrolling="no" frameborder="0"></iframe>');
				jQuery("#fancy_bigIframe").css({'width': jQuery(window).width(), 'height': jQuery(document).height(), 'opacity': 0});
			}

			jQuery("#fancy_overlay").click(jQuery.fn.fancybox.close);
		}

		opts.itemArray	= [];
		opts.itemNum	= 0;

		if (jQuery.isFunction(o.itemLoadCallback)) {
		   o.itemLoadCallback.apply(this, [opts]);

			var c	= jQuery(el).children("img:first").length ? jQuery(el).children("img:first") : jQuery(el);
			var tmp	= {'width': c.width(), 'height': c.height(), 'pos': jQuery.fn.fancybox.getPosition(c)}

		   for (var i = 0; i < opts.itemArray.length; i++) {
				opts.itemArray[i].o = jQuery.extend({}, o, opts.itemArray[i].o);
				
				if (o.zoomSpeedIn > 0 || o.zoomSpeedOut > 0) {
					opts.itemArray[i].orig = tmp;
				}
		   }

		} else {
			if (!el.rel || el.rel == '') {
				var item = {url: el.href, title: el.title, o: o};

				if (o.zoomSpeedIn > 0 || o.zoomSpeedOut > 0) {
					var c = jQuery(el).children("img:first").length ? jQuery(el).children("img:first") : jQuery(el);
					item.orig = {'width': c.width(), 'height': c.height(), 'pos': jQuery.fn.fancybox.getPosition(c)}
				}

				opts.itemArray.push(item);

			} else {
				var arr	= jQuery("a[@rel=" + el.rel + "]").get();

				for (var i = 0; i < arr.length; i++) {
					var tmp		= jQuery.metadata ? jQuery.extend({}, o, jQuery(arr[i]).metadata()) : o;
   					var item	= {url: arr[i].href, title: arr[i].title, o: tmp};

   					if (o.zoomSpeedIn > 0 || o.zoomSpeedOut > 0) {
						var c = jQuery(arr[i]).children("img:first").length ? jQuery(arr[i]).children("img:first") : jQuery(el);

						item.orig = {'width': c.width(), 'height': c.height(), 'pos': jQuery.fn.fancybox.getPosition(c)}
					}

					if (arr[i].href == el.href) opts.itemNum = i;

					opts.itemArray.push(item);
				}
			}
		}

		jQuery.fn.fancybox.changeItem(opts.itemNum);
	};

	jQuery.fn.fancybox.changeItem = function(n) {
		jQuery.fn.fancybox.showLoading();

		opts.itemNum = n;

		jQuery("#fancy_nav").empty();
		jQuery("#fancy_outer").stop();
		jQuery("#fancy_title").hide();
		jQuery(document).unbind("keydown");

		imgRegExp = imgTypes.join('|');
    	imgRegExp = new RegExp('\.' + imgRegExp + '$', 'i');

		var url = opts.itemArray[n].url;

		if (url.match(/#/)) {
			var target = window.location.href.split('#')[0]; target = url.replace(target,'');

	        jQuery.fn.fancybox.showItem('<div id="fancy_div">' + jQuery(target).html() + '</div>');

	        jQuery("#fancy_loading").hide();

		} else if (url.match(imgRegExp)) {
			jQuery(imgPreloader).unbind('load').bind('load', function() {
				jQuery("#fancy_loading").hide();

				opts.itemArray[n].o.frameWidth	= imgPreloader.width;
				opts.itemArray[n].o.frameHeight	= imgPreloader.height;

				jQuery.fn.fancybox.showItem('<img id="fancy_img" src="' + imgPreloader.src + '" />');

			}).attr('src', url + '?rand=' + Math.floor(Math.random() * 999999999) );

		} else {
			jQuery.fn.fancybox.showItem('<iframe id="fancy_frame" onload="jQuery.fn.fancybox.showIframe()" name="fancy_iframe' + Math.round(Math.random()*1000) + '" frameborder="0" hspace="0" src="' + url + '"></iframe>');
		}
	};

	jQuery.fn.fancybox.showIframe = function() {
		jQuery("#fancy_loading").hide();
		jQuery("#fancy_frame").show();
	};

	jQuery.fn.fancybox.showItem = function(val) {
		jQuery.fn.fancybox.preloadNeighborImages();

		var viewportPos	= jQuery.fn.fancybox.getViewport();
		var itemSize	= jQuery.fn.fancybox.getMaxSize(viewportPos[0] - 50, viewportPos[1] - 100, opts.itemArray[opts.itemNum].o.frameWidth, opts.itemArray[opts.itemNum].o.frameHeight);

		var itemLeft	= viewportPos[2] + Math.round((viewportPos[0] - itemSize[0]) / 2) - 20;
		var itemTop		= viewportPos[3] + Math.round((viewportPos[1] - itemSize[1]) / 2) - 40;

		var itemOpts = {
			'left':		itemLeft, 
			'top':		itemTop, 
			'width':	itemSize[0] + 'px', 
			'height':	itemSize[1] + 'px'	
		}

		if (opts.active) {
			jQuery('#fancy_content').fadeOut("normal", function() {
				jQuery("#fancy_content").empty();
				
				jQuery("#fancy_outer").animate(itemOpts, "normal", function() {
					jQuery("#fancy_content").append(jQuery(val)).fadeIn("normal");
					jQuery.fn.fancybox.updateDetails();
				});
			});

		} else {
			opts.active = true;

			jQuery("#fancy_content").empty();

			if (jQuery("#fancy_content").is(":animated")) {
				console.info('animated!');
			}

			if (opts.itemArray[opts.itemNum].o.zoomSpeedIn > 0) {
				opts.animating		= true;
				itemOpts.opacity	= "show";

				jQuery("#fancy_outer").css({
					'top':		opts.itemArray[opts.itemNum].orig.pos.top - 18,
					'left':		opts.itemArray[opts.itemNum].orig.pos.left - 18,
					'height':	opts.itemArray[opts.itemNum].orig.height,
					'width':	opts.itemArray[opts.itemNum].orig.width
				});

				jQuery("#fancy_content").append(jQuery(val)).show();

				jQuery("#fancy_outer").animate(itemOpts, opts.itemArray[opts.itemNum].o.zoomSpeedIn, function() {
					opts.animating = false;
					jQuery.fn.fancybox.updateDetails();
				});

			} else {
				jQuery("#fancy_content").append(jQuery(val)).show();
				jQuery("#fancy_outer").css(itemOpts).show();
				jQuery.fn.fancybox.updateDetails();
			}
		 }
	};

	jQuery.fn.fancybox.updateDetails = function() {
		jQuery("#fancy_bg,#fancy_close").show();

		if (opts.itemArray[opts.itemNum].title !== undefined && opts.itemArray[opts.itemNum].title !== '') {
			jQuery('#fancy_title div').html(opts.itemArray[opts.itemNum].title);
			jQuery('#fancy_title').show();
		}

		if (opts.itemArray[opts.itemNum].o.hideOnContentClick) {
			jQuery("#fancy_content").click(jQuery.fn.fancybox.close);
		} else {
			jQuery("#fancy_content").unbind('click');
		}

		if (opts.itemNum != 0) {
			jQuery("#fancy_nav").append('<a id="fancy_left" href="javascript:;"></a>');

			jQuery('#fancy_left').click(function() {
				jQuery.fn.fancybox.changeItem(opts.itemNum - 1); return false;
			});
		}

		if (opts.itemNum != (opts.itemArray.length - 1)) {
			jQuery("#fancy_nav").append('<a id="fancy_right" href="javascript:;"></a>');
			
			jQuery('#fancy_right').click(function(){
				jQuery.fn.fancybox.changeItem(opts.itemNum + 1); return false;
			});
		}

		jQuery(document).keydown(function(event) {
			if (event.keyCode == 27) {
            	jQuery.fn.fancybox.close();

			} else if(event.keyCode == 37 && opts.itemNum != 0) {
            	jQuery.fn.fancybox.changeItem(opts.itemNum - 1);

			} else if(event.keyCode == 39 && opts.itemNum != (opts.itemArray.length - 1)) {
            	jQuery.fn.fancybox.changeItem(opts.itemNum + 1);
			}
		});
	};

	jQuery.fn.fancybox.preloadNeighborImages = function() {
		if ((opts.itemArray.length - 1) > opts.itemNum) {
			preloadNextImage = new Image();
			preloadNextImage.src = opts.itemArray[opts.itemNum + 1].url;
		}

		if (opts.itemNum > 0) {
			preloadPrevImage = new Image();
			preloadPrevImage.src = opts.itemArray[opts.itemNum - 1].url;
		}
	};

	jQuery.fn.fancybox.close = function() {
		if (opts.animating) return false;

		jQuery(imgPreloader).unbind('load');
		jQuery(document).unbind("keydown");

		jQuery("#fancy_loading,#fancy_title,#fancy_close,#fancy_bg").hide();

		jQuery("#fancy_nav").empty();

		opts.active	= false;

		if (opts.itemArray[opts.itemNum].o.zoomSpeedOut > 0) {
			var itemOpts = {
				'top':		opts.itemArray[opts.itemNum].orig.pos.top - 18,
				'left':		opts.itemArray[opts.itemNum].orig.pos.left - 18,
				'height':	opts.itemArray[opts.itemNum].orig.height,
				'width':	opts.itemArray[opts.itemNum].orig.width,
				'opacity':	'hide'
			};

			opts.animating = true;

			jQuery("#fancy_outer").animate(itemOpts, opts.itemArray[opts.itemNum].o.zoomSpeedOut, function() {
				jQuery("#fancy_content").hide().empty();
				jQuery("#fancy_overlay,#fancy_bigIframe").remove();
				opts.animating = false;
			});

		} else {
			jQuery("#fancy_outer").hide();
			jQuery("#fancy_content").hide().empty();
			jQuery("#fancy_overlay,#fancy_bigIframe").fadeOut("fast").remove();
		}
		
		if (opts.settings.onCloseCallback) {
			opts.settings.onCloseCallback();
		}
	};

	jQuery.fn.fancybox.showLoading = function() {
		clearInterval(loadingTimer);

		var pos = jQuery.fn.fancybox.getViewport();

		jQuery("#fancy_loading").css({'left': ((pos[0] - 40) / 2 + pos[2]), 'top': ((pos[1] - 40) / 2 + pos[3])}).show();
		jQuery("#fancy_loading").bind('click', jQuery.fn.fancybox.close);
		
		loadingTimer = setInterval(jQuery.fn.fancybox.animateLoading, 66);
	};

	jQuery.fn.fancybox.animateLoading = function(el, o) {
		if (!jQuery("#fancy_loading").is(':visible')){
			clearInterval(loadingTimer);
			return;
		}

		jQuery("#fancy_loading > div").css('top', (loadingFrame * -40) + 'px');

		loadingFrame = (loadingFrame + 1) % 12;
	};

	jQuery.fn.fancybox.init = function() {
		if (!jQuery('#fancy_wrap').length) {
			jQuery('<div id="fancy_wrap"><div id="fancy_loading"><div></div></div><div id="fancy_outer"><div id="fancy_inner"><div id="fancy_nav"></div><div id="fancy_close"></div><div id="fancy_content"></div><div id="fancy_title"></div></div></div></div>').appendTo("body");
			jQuery('<div id="fancy_bg"><div class="fancy_bg fancy_bg_n"></div><div class="fancy_bg fancy_bg_ne"></div><div class="fancy_bg fancy_bg_e"></div><div class="fancy_bg fancy_bg_se"></div><div class="fancy_bg fancy_bg_s"></div><div class="fancy_bg fancy_bg_sw"></div><div class="fancy_bg fancy_bg_w"></div><div class="fancy_bg fancy_bg_nw"></div></div>').prependTo("#fancy_inner");
			
			jQuery('<table cellspacing="0" cellpadding="0" border="0"><tr><td id="fancy_title_left"></td><td id="fancy_title_main"><div></div></td><td id="fancy_title_right"></td></tr></table>').appendTo('#fancy_title');
		}

		if (jQuery.browser.msie) {
			jQuery("#fancy_inner").prepend('<iframe id="fancy_freeIframe" scrolling="no" frameborder="0"></iframe>');
		}

		if (jQuery.fn.pngFix) jQuery(document).pngFix();

    	jQuery("#fancy_close").click(jQuery.fn.fancybox.close);
	};

	jQuery.fn.fancybox.getPosition = function(el) {
		var pos = el.offset();

		pos.top	+= jQuery.fn.fancybox.num(el, 'paddingTop');
		pos.top	+= jQuery.fn.fancybox.num(el, 'borderTopWidth');

 		pos.left += jQuery.fn.fancybox.num(el, 'paddingLeft');
		pos.left += jQuery.fn.fancybox.num(el, 'borderLeftWidth');

		return pos;
	};

	jQuery.fn.fancybox.num = function (el, prop) {
		return parseInt(jQuery.curCSS(el.jquery?el[0]:el,prop,true))||0;
	};

	jQuery.fn.fancybox.getPageScroll = function() {
		var xScroll, yScroll;

		if (self.pageYOffset) {
			yScroll = self.pageYOffset;
			xScroll = self.pageXOffset;
		} else if (document.documentElement && document.documentElement.scrollTop) {
			yScroll = document.documentElement.scrollTop;
			xScroll = document.documentElement.scrollLeft;
		} else if (document.body) {
			yScroll = document.body.scrollTop;
			xScroll = document.body.scrollLeft;	
		}

		return [xScroll, yScroll]; 
	};

	jQuery.fn.fancybox.getViewport = function() {
		var scroll = jQuery.fn.fancybox.getPageScroll();

		return [jQuery(window).width(), jQuery(window).height(), scroll[0], scroll[1]];
	};

	jQuery.fn.fancybox.getMaxSize = function(maxWidth, maxHeight, imageWidth, imageHeight) {
		var r = Math.min(Math.min(maxWidth, imageWidth) / imageWidth, Math.min(maxHeight, imageHeight) / imageHeight);

		return [Math.round(r * imageWidth), Math.round(r * imageHeight)];
	};

	jQuery.fn.fancybox.defaults = {
		hideOnContentClick:	false,
		zoomSpeedIn:		500,
		zoomSpeedOut:		500,
		frameWidth:			600,
		frameHeight:		400,
		overlayShow:		false,
		overlayOpacity:		0.4,
		itemLoadCallback:	null,
		onCloseCallback:	null
	};
})(jQuery);