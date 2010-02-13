/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Copyright (c) 20010 Janis Skarnelis
 * Examples and documentation at: http://fancybox.net
 *
 * Version: 1.3.0 (02/02/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function(jQuery) {

	var tmp, loading, overlay, wrap, outer, inner, content, close, nav_left, nav_right;

	var selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [];

	var ajaxLoader = null, imgPreloader = new Image, imageRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i;

	var loadingTimer, loadingFrame = 1;

	var start_pos, final_pos, busy = false, shadow = 20, fx = jQuery.extend(jQuery('<div/>')[0], { prop: 0 }), titleh = 0, isIE6 = !jQuery.support.opacity && !window.XMLHttpRequest;

	jQuery.fn.fixPNG = function() {
		return this.each(function () {
			var image = jQuery(this).css('backgroundImage');

			if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
				image = RegExp.$1;
				jQuery(this).css({
					'backgroundImage': 'none',
					'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + (jQuery(this).css('backgroundRepeat') == 'no-repeat' ? 'crop' : 'scale') + ", src='" + image + "')"
				}).each(function () {
					var position = jQuery(this).css('position');
					if (position != 'absolute' && position != 'relative')
						jQuery(this).css('position', 'relative');
				}).css('zoom', 1);
			}
		});
	};

	jQuery.fn.fancybox = function(options) {
		jQuery(this).data('fancybox', jQuery.extend({}, options));

		jQuery(this).unbind('click.fb').bind('click.fb', function(e) {
			e.preventDefault();

			if (busy) return;

			busy = true;

			jQuery(this).blur();

			selectedArray	= [];
			selectedIndex	= 0;

			var rel = jQuery(this).attr('rel') || '';

			if (!rel || rel == '' || rel === 'nofollow') {
				selectedArray.push(this);

			} else {
				selectedArray	= jQuery("a[rel=" + rel + "], area[rel=" + rel + "]");
				selectedIndex	= selectedArray.index( this );
			}

			fancybox_start();

			return false;
		});

		return this;
	};

	/*

	Public Methods

	*/

	jQuery.fancybox = function(obj, opts) {
		if (busy) return;

		busy = true;

		selectedArray	= [];
		selectedIndex	= 0;

		if (jQuery.isArray(obj)) {
			for (var i = 0, j = obj.length; i < j; i++) {
				if (typeof obj[i] == 'object') {
					jQuery(obj[i]).data('fancybox', jQuery.extend({}, opts, obj[i]));
				} else {
					obj[i] = jQuery({}).data('fancybox', jQuery.extend({content : obj[i]}, opts));
				}
			}

			selectedArray = jQuery.merge(selectedArray, obj);

		} else {
			if (typeof obj == 'object') {
				jQuery(obj).data('fancybox', jQuery.extend({}, opts, obj));
			} else {
				obj = jQuery({}).data('fancybox', jQuery.extend({content : obj}, opts));
			}

			selectedArray.push(obj);
		}

		fancybox_start();
	};

	jQuery.fancybox.showActivity = function() {
		clearInterval(loadingTimer);

		loading.show();
		loadingTimer = setInterval(fancybox_animate_loading, 66);
	};
	
	jQuery.fancybox.hideActivity = function() {
		loading.hide();
	};

	jQuery.fancybox.next = function() {
		return jQuery.fancybox.pos( currentIndex + 1);
	};
	
	jQuery.fancybox.prev = function() {
		return jQuery.fancybox.pos( currentIndex - 1);
	};

	jQuery.fancybox.pos = function(pos) {
		if (busy) return;

		pos = parseInt(pos);

		if (pos > -1 && currentArray.length > pos) {
			selectedIndex = pos;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos < 0) {
			selectedIndex = currentArray.length - 1;
			fancybox_start();
		}

		if (currentOpts.cyclic && currentArray.length > 1 && pos >= currentArray.length) {
			selectedIndex = 0;
			fancybox_start();
		}

		return;
	};

	jQuery.fancybox.cancel = function() {
		if (busy) return;

		busy = true;

		jQuery.event.trigger('fancybox-cancel');

		fancybox_abort();

		if (selectedOpts && jQuery.isFunction(selectedOpts.onCancel)) {
			selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);
		};

		busy = false;
	};

	// Note: within an iframe use - parent.jQuery.fancybox.close();
	jQuery.fancybox.close = function() {
		if (busy || wrap.is(':hidden')) return;

		busy = true;

		if (currentOpts && jQuery.isFunction(currentOpts.onCleanup)) {
			if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
				busy = false;
				return;
			}
		};

		fancybox_abort();

		jQuery(close.add( nav_left ).add( nav_right )).hide();

		jQuery('#fancybox-title').remove();

		wrap.add(inner).add(overlay).unbind();

		jQuery(window).unbind("resize.fb scroll.fb");
		jQuery(document).unbind('keydown.fb');

		function _cleanup() {
			overlay.fadeOut('fast');

			wrap.hide();

			jQuery.event.trigger('fancybox-cleanup');

			inner.empty();

			if (jQuery.isFunction(currentOpts.onClosed)) {
				currentOpts.onClosed(currentArray, currentIndex, currentOpts);
			}

			currentArray	= selectedOpts	= [];
			currentIndex	= selectedIndex	= 0;
			currentOpts		= selectedOpts	= {};

			busy = false;
		}

		inner.css('overflow', 'hidden');

		if (currentOpts.transitionOut == 'elastic') {
			start_pos = fancybox_get_zoom_from();

			var pos = wrap.position();

			final_pos = {
				top		:	pos.top ,
				left	:	pos.left,
				width	:	wrap.width(),
				height	:	wrap.height()
			};

			if (currentOpts.opacity) {
				final_pos.opacity = 1;
			}

			fx.prop = 1;

			jQuery(fx).animate({ prop: 0 }, {
				 duration	: currentOpts.speedOut,
				 easing		: currentOpts.easingOut,
				 step		: fancybox_draw,
				 complete	: _cleanup
			});

		} else {
			wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
		}
	};

	jQuery.fancybox.resize = function() {
		if (busy || wrap.is(':hidden')) return;

		busy = true;

		var c = inner.wrapInner("<div style='overflow:auto'></div>").children();
		var h = c.height();

		wrap.css({height:	h + (currentOpts.padding * 2) + titleh});
		inner.css({height:	h});

		c.replaceWith(c.children());

		jQuery.fancybox.center();
	};

	jQuery.fancybox.center = function() {
		busy = true;

		var view	= fancybox_get_viewport();
		var margin	= currentOpts.margin;
		var to		= {};

		to.top	= view[3] + ((view[1] - ((wrap.height() - titleh) + (shadow * 2 ))) * 0.5);
		to.left	= view[2] + ((view[0] - (wrap.width() + (shadow * 2 ))) * 0.5);

		to.top	= Math.max(view[3] + margin, to.top);
		to.left	= Math.max(view[2] + margin, to.left);

		wrap.css(to);

		busy = false;
	};

	/*
	
	Inner Methods

	*/

	function fancybox_abort() {
		loading.hide();

		imgPreloader.onerror = imgPreloader.onload = null;
		
		if (ajaxLoader) ajaxLoader.abort();

		tmp.empty();
	};

	function fancybox_error() {
		jQuery.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>', {
			'scrolling'		: 'no',
			'padding'		: 20,
			'transitionIn'	: 'none',
			'transitionOut'	: 'none'
		});
	};
	
	function fancybox_start() {
		fancybox_abort();

		var obj	= selectedArray[ selectedIndex ];

		selectedOpts = jQuery.extend({}, jQuery.fn.fancybox.defaults, (typeof jQuery(obj).data('fancybox') == 'undefined' ? selectedOpts : jQuery(obj).data('fancybox')));

		var href, type, title = obj.title || jQuery(obj).title || selectedOpts.title || '';

		if (obj.nodeName && !selectedOpts.orig) {
			selectedOpts.orig = jQuery(obj).children("img:first").length ? jQuery(obj).children("img:first") : jQuery(obj);
		}

		if (title == '' && selectedOpts.orig) title = selectedOpts.orig.attr('alt');

		if (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href)) {
			href = selectedOpts.href || null;
		} else {
			href = selectedOpts.href || obj.href || null;
		}

		if (selectedOpts.type) {
			type = selectedOpts.type;

			if (!href) href = selectedOpts.content;
			
		} else if (selectedOpts.content) {
			type	= 'html';

		} else if (href) {
			if (href.match(imageRegExp)) {
				type = 'image';

			} else if (href.match(swfRegExp)) {
				type = 'swf';

			} else if (jQuery(obj).hasClass("iframe")) {
				type = 'iframe';

			} else if (href.match(/#/)) {
				obj = href.substr(href.indexOf("#"));

				type = jQuery(obj).length > 0 ? 'inline' : 'ajax';
			} else {
				type = 'ajax';
			}
		} else {
			type = 'inline';
		}

		selectedOpts.type	= type;
		selectedOpts.href	= href;
		selectedOpts.title	= title;

		if (selectedOpts.autoDimensions && selectedOpts.type !== 'iframe' && selectedOpts.type !== 'swf') {
			selectedOpts.width		= 'auto';
			selectedOpts.height		= 'auto';
		}

		if (selectedOpts.modal) {
			selectedOpts.overlayShow		= true;
			selectedOpts.hideOnOverlayClick	= false;
			selectedOpts.hideOnContentClick	= false;
			selectedOpts.enableEscapeButton	= false;
			selectedOpts.showCloseButton	= false;
		}

		if (jQuery.isFunction(selectedOpts.onStart)) {
			if (selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts) === false) {
				busy = false;
				return;
			}
		};

		tmp.css('padding', (shadow + selectedOpts.padding + selectedOpts.margin));

		jQuery('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
			jQuery(this).replaceWith(inner.children());
		});

		switch (type) {
			case 'html' :
				tmp.html( selectedOpts.content );

				fancybox_process_inline();
			break;

			case 'inline' :
				jQuery('<div class="fancybox-inline-tmp" />').hide().insertBefore( jQuery(obj) ).bind('fancybox-cleanup', function() {
					jQuery(this).replaceWith(inner.children());
				}).bind('fancybox-cancel', function() {
					jQuery(this).replaceWith(tmp.children());
				});

				jQuery(obj).appendTo(tmp);

				fancybox_process_inline();
			break;

			case 'image':
				busy = false;

				jQuery.fancybox.showActivity();

				imgPreloader = new Image;

				imgPreloader.onerror = function() {
					fancybox_error();
				}

				imgPreloader.onload = function() {
					imgPreloader.onerror = null;
					imgPreloader.onload = null;
					fancybox_process_image();
				}

				imgPreloader.src = href;
	
			break;

			case 'swf':
				var str = '';
				var emb = '';

				str += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';

				jQuery.each(selectedOpts.swf, function(name, val) {
					str += '<param name="' + name + '" value="' + val + '"></param>';
					emb += ' ' + name + '="' + val + '"';
				});

				str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

				tmp.html(str);

				fancybox_process_inline();
			break;

			case 'ajax':
				var selector	= href.split('#', 2);
				var data		= selectedOpts.ajax.data || {};

				if (selector.length > 1) {
					href = selector[0];

					typeof data == "string" ? data += '&selector=' + selector[1] : data['selector'] = selector[1];
				}

				busy = false;
				jQuery.fancybox.showActivity();

				ajaxLoader = jQuery.ajax(jQuery.extend(selectedOpts.ajax, {
					url		: href,
					data	: data,
					error	: fancybox_error,
					success : function(data, textStatus, XMLHttpRequest) {
						if (ajaxLoader.status == 200) {
							tmp.html( data );
							fancybox_process_inline();
						}
					}
				}));

			break;

			case 'iframe' :
				jQuery('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" scrolling="' + selectedOpts.scrolling + '" src="' + selectedOpts.href + '"></iframe>').appendTo(tmp);

				fancybox_show();
			break;
		}
	};

	function fancybox_process_image() {
		busy = true;

		selectedOpts.width	= imgPreloader.width;
		selectedOpts.height	= imgPreloader.height;

		jQuery("<img />").attr({
			'id'	: 'fancybox-img',
			'src'	: imgPreloader.src,
			'alt'	: selectedOpts.title
		}).appendTo( tmp );

		fancybox_show();
	};

	function fancybox_process_inline() {
		tmp.width(	selectedOpts.width );
		tmp.height(	selectedOpts.height );

		if (selectedOpts.width	== 'auto') selectedOpts.width	= tmp.width();
		if (selectedOpts.height	== 'auto') selectedOpts.height	= tmp.height();

		fancybox_show();
	};

	function fancybox_show() {
		loading.hide();

		if (wrap.is(":visible") && jQuery.isFunction(currentOpts.onCleanup)) {
			if (currentOpts.onCleanup(currentArray, currentIndex, currentOpts) === false) {
				jQuery.event.trigger('fancybox-cancel');

				busy = false;
				return;
			}
		};

		currentArray	= selectedArray;
		currentIndex	= selectedIndex;
		currentOpts		= selectedOpts;

		inner.get(0).scrollTop	= 0;
		inner.get(0).scrollLeft	= 0;

		if (currentOpts.overlayShow) {
			if (isIE6) {
				jQuery('select:not(#fancybox-tmp select)').filter(function() {
					return this.style.visibility !== 'hidden';
				}).css({'visibility':'hidden'}).one('fancybox-cleanup', function() {
					this.style.visibility = 'inherit';
				});
			}

			overlay.css({
				'background-color'	: currentOpts.overlayColor,
				'opacity'			: currentOpts.overlayOpacity
			}).unbind().show();
		}

		final_pos = fancybox_get_zoom_to();

		fancybox_process_title();

		if (wrap.is(":visible")) {
			jQuery( close.add( nav_left ).add( nav_right ) ).hide();

			var pos = wrap.position();

			start_pos = {
				top		:	pos.top ,
				left	:	pos.left,
				width	:	wrap.width(),
				height	:	wrap.height()
			};

			var equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

			inner.fadeOut(currentOpts.changeFade, function() {
				jQuery.event.trigger('fancybox-change');

				inner.css({
						top			: currentOpts.padding,
						left		: currentOpts.padding,
						width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
						height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
					})
					.empty()
					.css('overflow', 'hidden');

				function finish_resizing() {
					inner.html( tmp.contents() ).fadeIn(currentOpts.changeFade, _finish);
				}

				fx.prop = 0;

				jQuery(fx).animate({ prop: 1 }, {
					 duration	: equal ? 0 : currentOpts.changeSpeed,
					 easing		: currentOpts.easingChange,
					 step		: fancybox_draw,
					 complete	: finish_resizing
				});
			});

			return;
		}

		wrap.css('opacity', 1);

		if (currentOpts.transitionIn == 'elastic') {
			start_pos = fancybox_get_zoom_from();

			inner.css({
					top			: currentOpts.padding,
					left		: currentOpts.padding,
					width		: Math.max(start_pos.width	- (currentOpts.padding * 2), 1),
					height		: Math.max(start_pos.height	- (currentOpts.padding * 2), 1)
				})
				.html( tmp.contents() );

			wrap.css(start_pos).show();

			if (currentOpts.opacity) final_pos.opacity = 0;

			fx.prop = 0;

			jQuery(fx).animate({ prop: 1 }, {
				 duration	: currentOpts.speedIn,
				 easing		: currentOpts.easingIn,
				 step		: fancybox_draw,
				 complete	: _finish
			});

		} else {
			inner.css({
					top			: currentOpts.padding,
					left		: currentOpts.padding,
					width		: Math.max(final_pos.width	- (currentOpts.padding * 2), 1),
					height		: Math.max(final_pos.height	- (currentOpts.padding * 2) - titleh, 1)
				})
				.html( tmp.contents() );

			wrap.css( final_pos ).fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
		}
	};

	function fancybox_draw(pos) {
		var width	= Math.round(start_pos.width	+ (final_pos.width	- start_pos.width)	* pos);
		var height	= Math.round(start_pos.height	+ (final_pos.height	- start_pos.height)	* pos);

		var top		= Math.round(start_pos.top	+ (final_pos.top	- start_pos.top)	* pos);
		var left	= Math.round(start_pos.left	+ (final_pos.left	- start_pos.left)	* pos);

		wrap.css({
			'width'		: width		+ 'px',
			'height'	: height	+ 'px',
			'top'		: top		+ 'px',
			'left'		: left		+ 'px'
		});

		width	= Math.max(width - currentOpts.padding * 2, 0);
		height	= Math.max(height - (currentOpts.padding * 2 + (titleh * pos)), 0);

		inner.css({
			'width'		: width		+ 'px',
			'height'	: height	+ 'px'
		});

		if (typeof final_pos.opacity !== 'undefined') wrap.css('opacity', (pos < 0.5 ? 0.5 : pos));
	};

	function _finish() {
		inner.css('overflow', overflow = (currentOpts.scrolling == 'auto' ? (currentOpts.type == 'image' || currentOpts.type == 'iframe' || currentOpts.type == 'swf' ? 'hidden' : 'auto') : (currentOpts.scrolling == 'yes' ? 'auto' : 'visible')));

		if (!jQuery.support.opacity) {
			inner.get(0).style.removeAttribute('filter');
			wrap.get(0).style.removeAttribute('filter');
		}

		jQuery('#fancybox-title').show();

		if (currentOpts.hideOnContentClick)	inner.one('click',		jQuery.fancybox.close);
		if (currentOpts.hideOnOverlayClick)	overlay.one('click',	jQuery.fancybox.close);

		if (currentOpts.showCloseButton) close.show();

		fancybox_set_navigation();

		jQuery(window).bind("resize.fb", jQuery.fancybox.center);

		currentOpts.centerOnScroll ? jQuery(window).bind("scroll.fb", jQuery.fancybox.center) : jQuery(window).unbind("scroll.fb");

		if (jQuery.isFunction(currentOpts.onComplete)) currentOpts.onComplete(currentArray, currentIndex, currentOpts);

		busy = false;

		fancybox_preload_images();
	};

	function fancybox_get_zoom_to() {
		var view	= fancybox_get_viewport();
		var to		= {};

		var margin = currentOpts.margin;
		var resize = currentOpts.autoScale;

		var horizontal_space	= (shadow + margin) * 2 ;
		var vertical_space		= (shadow + margin) * 2 ;
		var double_padding		= (currentOpts.padding * 2);

		if (currentOpts.width.toString().indexOf('%') > -1) {
			to.width = ((view[0] * parseFloat(currentOpts.width)) / 100) - (shadow * 2) ;
			resize = false;

		} else {
			to.width = currentOpts.width + double_padding;
		}

		if (currentOpts.height.toString().indexOf('%') > -1) {
			to.height = ((view[1] * parseFloat(currentOpts.height)) / 100) - (shadow * 2);
			resize = false;

		} else {
			to.height = currentOpts.height + double_padding;
		}

		if (resize && (to.width > (view[0] - horizontal_space) || to.height > (view[1] - vertical_space))) {
			if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
				horizontal_space	+= double_padding;
				vertical_space		+= double_padding;

				var ratio = Math.min(Math.min( view[0] - horizontal_space, currentOpts.width) / currentOpts.width, Math.min( view[1] - vertical_space, currentOpts.height) / currentOpts.height);

				to.width	= Math.round(ratio * (to.width	- double_padding)) + double_padding;
				to.height	= Math.round(ratio * (to.height	- double_padding)) + double_padding;

			} else {
				to.width	= Math.min(to.width,	(view[0] - horizontal_space));
				to.height	= Math.min(to.height,	(view[1] - vertical_space));
			}
		}

		to.top	= view[3] + ((view[1] - (to.height	+ (shadow * 2 ))) * 0.5);
		to.left	= view[2] + ((view[0] - (to.width	+ (shadow * 2 ))) * 0.5);

		if (currentOpts.autoScale == false) {
			to.top	= Math.max(view[3] + margin, to.top);
			to.left	= Math.max(view[2] + margin, to.left);
		}

		return to;
	};

	function fancybox_get_zoom_from() {
		var orig	= selectedOpts.orig ? jQuery(selectedOpts.orig) : false;
		var from 	= {};

		if (orig && orig.length) {
			var pos = fancybox_get_obj_pos(orig);

			from = {
				width	: (pos.width	+ (currentOpts.padding * 2)),
				height	: (pos.height	+ (currentOpts.padding * 2)),
				top		: (pos.top		- currentOpts.padding - shadow),
				left	: (pos.left		- currentOpts.padding - shadow)
			};
			
		} else {
			var view = fancybox_get_viewport();

			from = {
				width	: 1,
				height	: 1,
				top		: view[3] + view[1] * 0.5,
				left	: view[2] + view[0] * 0.5
			};
		}

		return from;
	};

	function fancybox_set_navigation() {
		jQuery(document).unbind('keydown.fb').bind('keydown.fb', function(e) {
			if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
				e.preventDefault();
				jQuery.fancybox.close();

			} else if (e.keyCode == 37) {
				e.preventDefault();
				jQuery.fancybox.prev();

			} else if (e.keyCode == 39) {
				e.preventDefault();
				jQuery.fancybox.next();
			}
		});

		if (jQuery.fn.mousewheel) {
			wrap.unbind('mousewheel.fb');

			if (currentArray.length > 1) {
				wrap.bind('mousewheel.fb', function(e, delta) {
					e.preventDefault();

					if (busy || delta == 0) return;

					delta > 0 ? jQuery.fancybox.prev() : jQuery.fancybox.next();
				});
			}
		}

		if (!currentOpts.showNavArrows) return;

		if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != 0) {
			nav_left.show();
		}

		if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
			nav_right.show();
		}
	};

	function fancybox_preload_images() {
		if ((currentArray.length -1) > currentIndex) {
			var href = currentArray[ currentIndex + 1 ].href;

			if (typeof href !== 'undefined' && href.match(imageRegExp)) {
				var objNext = new Image();
				objNext.src = href;
			}
		}

		if (currentIndex > 0) {
			var href = currentArray[ currentIndex - 1 ].href;

			if (typeof href !== 'undefined' && href.match(imageRegExp)) {
				var objNext = new Image();
				objNext.src = href;
			}
		}
	};

	function fancybox_animate_loading() {
		if (!loading.is(':visible')){
			clearInterval(loadingTimer);
			return;
		}

		jQuery('div', loading).css('top', (loadingFrame * -40) + 'px');

		loadingFrame = (loadingFrame + 1) % 12;
	};

	function fancybox_get_viewport() {
		return [ jQuery(window).width(), jQuery(window).height(), jQuery(document).scrollLeft(), jQuery(document).scrollTop() ];
	};

	function fancybox_get_obj_pos(obj) {
		var pos		= obj.offset();

		pos.top		+= parseFloat( obj.css('paddingTop') )	|| 0;
		pos.left	+= parseFloat( obj.css('paddingLeft') )	|| 0;

		pos.top		+= parseFloat( obj.css('border-top-width') )	|| 0;
		pos.left	+= parseFloat( obj.css('border-left-width') )	|| 0;

		pos.width	= obj.width();
		pos.height	= obj.height();

		return pos;
	};

	function fancybox_process_title() {
		jQuery('#fancybox-title').remove();

		titleh = 0;

		if (currentOpts.titleShow == false) return;

		var obj		= currentArray[ currentIndex ];
		var title	= currentOpts.title;

		title = jQuery.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(title, currentArray, currentIndex, currentOpts) : fancybox_format_title(title);

		if (!title || title == '') return;

		var width	= final_pos.width - (currentOpts.padding * 2);
		var titlec	= 'fancybox-title-' + currentOpts.titlePosition;

		jQuery('<div id="fancybox-title" class="' + titlec + '" />').css({
			'width'			: width,
			'paddingLeft'	: currentOpts.padding,
			'paddingRight'	: currentOpts.padding
		}).html(title).appendTo('body');

		switch (currentOpts.titlePosition) {
			case 'inside':
				titleh = jQuery("#fancybox-title").outerHeight(true) - currentOpts.padding;
				final_pos.height += titleh;
			break;

			case 'over':
				jQuery('#fancybox-title').css('bottom', currentOpts.padding);
			break;

			default:
				jQuery('#fancybox-title').css('bottom', jQuery("#fancybox-title").outerHeight(true) * -1);
			break;
		}

		jQuery('#fancybox-title').appendTo( outer ).hide();

		if (isIE6) {
			jQuery('#fancybox-title span').fixPNG();
		}
	};

	function fancybox_format_title(title) {
		if (title && title.length) {
			switch (currentOpts.titlePosition) {
				case 'inside':
					return title;
				break;

				case 'over':
					return '<span id="fancybox-title-over">' + title + '</span>';
				break;

				default:
					return '<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">' + title + '</span><span id="fancybox-title-right"></span></span>';
				break;
			}
		}

		return false;
	};

	function fancybox_init() {
		if (jQuery("#fancybox-wrap").length) return;

		jQuery('body').append(
			tmp			= jQuery('<div id="fancybox-tmp"></div>'),
			loading		= jQuery('<div id="fancybox-loading"><div></div></div>'),
			overlay		= jQuery('<div id="fancybox-overlay"></div>'),
			wrap		= jQuery('<div id="fancybox-wrap"></div>')
		);

		outer = jQuery('<div id="fancybox-outer"></div>')
			.append('<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>')
			.appendTo( wrap );

		outer.append(
			inner		= jQuery('<div id="fancybox-inner"></div>'),
			close		= jQuery('<a id="fancybox-close"></a>'),

			nav_left	= jQuery('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
			nav_right	= jQuery('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
		);
		
		close.click(jQuery.fancybox.close);
		loading.click(jQuery.fancybox.cancel);

		nav_left.click(function(e) {
			e.preventDefault();
			jQuery.fancybox.prev();
		});

		nav_right.click(function(e) {
			e.preventDefault();
			jQuery.fancybox.next();
		});

		if (!jQuery.support.opacity) {
			outer.find('.fancy-bg').fixPNG();
		}

		if (isIE6) {
			jQuery(close.add('.fancy-ico').add('div', loading)).fixPNG();

			overlay.get(0).style.setExpression('height',	"document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
			loading.get(0).style.setExpression('top',		"(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");

			outer.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>');
		}
	};

	jQuery.fn.fancybox.defaults = {
		padding				:	10,
		margin				:	20,
		opacity				:	false,
		modal				:	false,
		cyclic				:	false,
		scrolling			:	'auto',	// 'auto', 'yes' or 'no'

		width				:	560,
		height				:	340,

		autoScale			:	true,
		autoDimensions		:	true,
		centerOnScroll		:	false,

		ajax				:	{},
		swf					:	{ wmode: 'transparent' },

		hideOnOverlayClick	:	true,
		hideOnContentClick	:	false,

		overlayShow			:	true,
		overlayOpacity		:	0.3,
		overlayColor		:	'#666',

		titleShow			:	true,
		titlePosition		:	'outside',	// 'outside', 'inside' or 'over'
		titleFormat			:	null,

		transitionIn		:	'fade',	// 'elastic', 'fade' or 'none'
		transitionOut		:	'fade',	// 'elastic', 'fade' or 'none'

		speedIn				:	300,
		speedOut			:	300,

		changeSpeed			:	300,
		changeFade			:	'fast',

		easingIn			:	'swing',
		easingOut			:	'swing',

		showCloseButton		:	true,
		showNavArrows		:	true,
		enableEscapeButton	:	true,

		onStart				:	null,
		onCancel			:	null,
		onComplete			:	null,
		onCleanup			:	null,
		onClosed			:	null
	};

	jQuery(document).ready(function() {
		fancybox_init();
	});

})(jQuery);