/*
	HUMANIZED MESSAGES 1.0
	idea - http://www.humanized.com/weblog/2006/09/11/monolog_boxes_and_transparent_messages
	home - http://humanmsg.googlecode.com
*/

var humanMsg = {
	setup: function(appendTo, logName, msgOpacity, showLog) {
		humanMsg.msgID = 'humanMsg';
		humanMsg.logID = 'humanMsgLog';

		// appendTo is the element the msg is appended to
		if (appendTo == undefined)
			appendTo = 'body';

		// The text on the Log tab
		if (logName == undefined)
			logName = 'Message Log';

		// Opacity of the message
		humanMsg.msgOpacity = .8;

		if (msgOpacity != undefined) 
			humanMsg.msgOpacity = parseFloat(msgOpacity);

		// Inject the message structure
		var htmlCode = '<div id="'+humanMsg.msgID+'" class="humanMsg"><div class="round"></div><p id="'+humanMsg.msgID+'_content"></p><div class="round"></div></div>';
		if (showLog) {
			htmlCode += '<div id="'+humanMsg.logID+'"><p>'+logName+'</p><ul></ul></div>';
		}
		jQuery(appendTo).append(htmlCode);
		
		jQuery('#'+humanMsg.logID+' p').click(
			function() { jQuery(this).siblings('ul').slideToggle() }
		)
	},

	displayMsg: function(msg, properties) {
		if (msg == '')
			return;

		clearTimeout(humanMsg.t1);
		clearTimeout(humanMsg.t2);

		// Inject message
		jQuery('#'+humanMsg.msgID+'_content').text(msg);
	
		// Show message
		jQuery('#'+humanMsg.msgID).css('opacity', 0);
		jQuery('#'+humanMsg.msgID).css('display', 'block');
		jQuery('#'+humanMsg.msgID).animate(
			{opacity: humanMsg.msgOpacity},
			200,
			function() {
				/*jQuery('#'+humanMsg.logID).css('display', 'none');
				jQuery('#'+humanMsg.logID)
					.show().children('ul').prepend('<li>'+msg+'</li>')	// Prepend message to log
					.children('li:first').slideDown(200)				// Slide it down
				
				if (jQuery('#'+humanMsg.logID+' ul').css('display') == 'none') {
					jQuery('#'+humanMsg.logID+' p').animate({ bottom: 40 }, 200, 'linear', function() {
						jQuery(this).animate({ bottom: 0 }, 300, 'easeOutBounce', function() { jQuery(this).css({ bottom: 0 }) })
					})
				}*/
			}
		);

		var timeOut = 5000;
		if (properties && properties.timeout) {
			timeOut = properties.timeout;
		}

		// Watch for mouse & keyboard in .5s
		humanMsg.t1 = setTimeout(function() {
			humanMsg.bindEvents();
		}, timeOut);
		// Remove message after 5s
		humanMsg.t2 = setTimeout(function() {
			humanMsg.removeMsg();
			
			if (properties && properties.callback) {
				properties.callback();
			}
			
		}, timeOut);
	},

	bindEvents: function() {
	// Remove message if mouse is moved or key is pressed
		jQuery(window)
			.mousemove(humanMsg.removeMsg)
			.click(humanMsg.removeMsg)
			.keypress(humanMsg.removeMsg)
	},

	removeMsg: function() {
		// Unbind mouse & keyboard
		jQuery(window)
			.unbind('mousemove', humanMsg.removeMsg)
			.unbind('click', humanMsg.removeMsg)
			.unbind('keypress', humanMsg.removeMsg)

		// If message is fully transparent, fade it out
		var opacity =jQuery('#'+humanMsg.msgID).css('opacity');
		var opacity2 = humanMsg.msgOpacity;
		var difference = opacity - opacity2;
		if(difference < 0){
			difference *= -1;
		}
//		if (jQuery('#'+humanMsg.msgID).css('opacity') == humanMsg.msgOpacity) {
		if((difference < 0,01)){
			jQuery('#'+humanMsg.msgID).fadeTo('slow', 0, function() {
				jQuery(this).css('display', 'none');
			});
		}
	}
};

jQuery(document).ready(function(){
	humanMsg.setup();
})