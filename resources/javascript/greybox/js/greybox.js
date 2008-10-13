/* Greybox Redux
 * Required: http://jquery.com/
 * Written by: John Resig
 * Based on code by: 4mir Salihefendic (http://amix.dk)
 * License: LGPL (read more in LGPL.txt)
 */

var GB_DONE = false;
var GB_HEIGHT = 400;
var GB_WIDTH = 400;

function GB_show(caption, url, options) {
	GB_HEIGHT = options != null ? options.height || 400 : 400;
  	GB_WIDTH = options != null ? options.width || 400 : 400;
  	var useAnimation = options != null ? options.animation || false : false;
  	var onClose = options != null ? options.onClose || null : null;
  
  if(!GB_DONE) {
  	var closeTitle = options.localizations ? options.localizations.closeTitle : 'Close window';
    jQuery(document.body)
      .append("<div id='GB_overlay'></div><div id='GB_window'><div id='GB_caption'></div>"
        + "<a id='GB_closerLink' class='greyBoxCloseImg' title='" + closeTitle + "' href='javascript:void(0)'></a></div>");
    
    var closeFunction = function() {
    	GB_hide(onClose);
    }
    
    jQuery("#GB_overlay").click(closeFunction);
    jQuery("#GB_closerLink").click(closeFunction);
    jQuery(window).resize(GB_position);
    GB_DONE = true;
  }

  jQuery("#GB_frame").remove();
  jQuery("#GB_window").append("<iframe id='GB_frame' src='"+url+"'></iframe>");

  jQuery("#GB_caption").html(caption);
  jQuery("#GB_overlay").show();
  GB_position();

  if(useAnimation)
    jQuery("#GB_window").slideDown("slow");
  else
    jQuery("#GB_window").show();
}

function GB_hide(callback) {
	GB_DONE = false;
  	jQuery("#GB_overlay,#GB_window").remove();
  	
  	if (callback) {
  		callback();
  	}
}

function GB_position() {
  var de = document.documentElement;
  var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
  jQuery("#GB_window").css({width:GB_WIDTH+"px",height:GB_HEIGHT+"px",
    left: ((w - GB_WIDTH)/2)+"px" });
  jQuery("#GB_frame").css("height",GB_HEIGHT - 32 +"px");
}
