/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

;(function($){
    $.fn.autoResize = function(options) {
        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            limit: 1000
        }, options);
        
        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){
            // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),
            
            	line_height	= 16 || parseInt(textarea.css('line-height'));
            
                // Cache original height, for use later:
                origHeight = textarea.height(),
                
                // Need clone of textarea, hidden off screen:
                clone = (function(){
                    
                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};
                        
                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });
                    
                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return jQuery('<div>'+textarea.val()+'</div>').css({
						'font-size'  : textarea.css('font-size'),
						'font-family': textarea.css('font-family'),
						'width'      : textarea.css('width'),
						'padding'    : textarea.css('padding'),
						'line-height': line_height + 'px',
						'overflow-x' : 'hidden',
						'position'   : 'absolute',
						'top'        : 0,
						'left'		 : -9999
					}).appendTo('body');
                })(),
                lastScrollTop = null,
                updateSize = function(event) {
					//	Prepare html
					var html = $(this).val().replace(/(<|>)/g, '');
					// IE is different, as per usual
					if (jQuery.browser.msie) {
						html = html.replace(/\n/g, '<BR>new');
					} else {
						html = html.replace(/\n/g, '<br>new');
					}
					
                    if (clone.html() != html) {
						clone.html(html);
					
	                    // Find the height of text:
	                   	cloneHeight = clone.scrollTop();
	                   	if (cloneHeight == 0) {
	                   		cloneHeight = clone.height();
	                   	}
	                    var scrollTop = Math.max(cloneHeight, origHeight) + settings.extraSpace;
						var toChange = $(this);
							
	                    // Don't do anything if scrollTip hasen't changed:
	                    if (lastScrollTop === scrollTop) {
	                    	AutoResize.executeCustomCallback(event);
	                    	return;
	                    }
	                    lastScrollTop = scrollTop;
						
	                    // Check for limit:
	                    if (scrollTop >= settings.limit) {
	                        $(this).css('overflow-y','');
	                        AutoResize.executeCustomCallback(event);
	                        return;
	                    }
	                    // Fire off callback:
	                    settings.onResize.call(this);
						
	                    // Either animate or directly apply height:
	                    settings.animate && textarea.css('display') === 'block' ?
	                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, function() {
	                        	settings.animateCallback();
	                        	AutoResize.executeCustomCallback(event);
	                        })
	                        : toChange.height(scrollTop);
                    } else {
                    	AutoResize.executeCustomCallback(event);
                    }
                };
            
            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);
        });
        
        // Chain:
        return this;
    };
})(jQuery);

AutoResize = {};
AutoResize.executeCustomCallback = function(event) {
	if (event && event.callback) {
		event.callback();
	}
}

jQuery(window).load(function() {
	jQuery('textarea').each(function() {
		var textArea = jQuery(this);
		
		if (FluxInterfaceHelper && !FluxInterfaceHelper.isTextAreaHtmlEditor(textArea)) {
			var value = textArea.attr('value');
			if (value != null && value != '') {
				textArea.attr('value', value + '$$initializer$$');	//	Setting dummy text
				
				var keyDownEvent = jQuery.Event('keydown');
		    	keyDownEvent.callback = function() {
			    	var customTextIndex = value.length - 1;
			   		if (customTextIndex > 0) {
			   			IWCORE.setCaretToPos(textArea[0], customTextIndex);
			   		}
			   		textArea.attr('value', value);	//	Restoring original text
			   	}
		    	jQuery(textArea).trigger(keyDownEvent);
			}
		}
	});
});