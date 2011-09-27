// Source base from http://www.aplweb.co.uk/blog/js/mac-like-icon-dock-v3/
// Fix it if you want :)


MacOsXIconDock = {

	distance : function(x0, y0, x1, y1) {
		var xDiff = x1-x0;
		var yDiff = y1-y0;
 
		return Math.sqrt(xDiff*xDiff + yDiff*yDiff);
	}

 
	//start
	,proximity : 80
	,iconSmall : 48
	,iconLarge : 128 //css also needs changing to compensate with size
	,iconDiff : 80
	,mouseX : 0
	,mouseY : 0
	,dock : null
	,animating : false
	,redrawReady : false
	//jQuery(document.body).removeClass("no_js");

	 
	//below are methods for maintaining a constant 60fps redraw for the dock without flushing
	,bindEvents : function(){
		jQuery(document).bind("mousemove", function(e) {
			MacOsXIconDock.mouseX = e.pageX;
			MacOsXIconDock.mouseY = e.pageY;
		});
	}

	,startMacOsXIconDock : function(){
		var thisObject = this;
		jQuery(document).bind("mousemove", function() {
			if (thisObject.dock.is(":visible")) {
				thisObject.redrawReady = true;
				thisObject.registerConstantCheck();
			}
		});
		jQuery(this.dock).find("li").css({
			height : thisObject.iconLarge
		});
		
	}
 
	,registerConstantCheck : function() {
		if (!this.animating) {
			this.animating = true;
			window.setTimeout(this.callingCheck, 50);
		}
	}
 
	,callCheck : function() {
		this.sizeDockIcons();
 
		this.animating = false;
 
		if (this.redrawReady) {
			this.redrawReady = false;
			this.registerConstantCheck();
		}
	}
 
	//do the maths and resize each icon
	,sizeDockIcons : function() {
		var thisObject = this;
		this.dock.find("li").each(function() {
			//find the distance from the center of each icon
			var centerX = jQuery(this).offset().left + (jQuery(this).outerWidth()/2);
			var centerY = jQuery(this).offset().top + (jQuery(this).outerHeight()/2);
	 
			var dist = MacOsXIconDock.distance(centerX, centerY, MacOsXIconDock.mouseX, MacOsXIconDock.mouseY);
	 
			//determine the new sizes of the icons from the mouse distance from their centres
			var newSize =  (1 - Math.min(1, Math.max(0, dist/thisObject.proximity))) * thisObject.iconDiff + thisObject.iconSmall;
			jQuery(this).find("a").css({width: newSize});
		});
	}

	,createMacOsXIconDock : function(options){
		theDock = {
			startMacOsXIconDock : this.startMacOsXIconDock
			,registerConstantCheck : this.registerConstantCheck
			,callCheck : this.callCheck
			,sizeDockIcons : this.sizeDockIcons
			,callingCheck : function() { 
				theDock.callCheck(); 
			}
		}
		if((options.proximity != undefined) && (options.proximity != null)){
			theDock.proximity = options.proximity;
		}else{
			theDock.proximity = this.proximity;
		}
		if((options.iconSmall != undefined) && (options.iconSmall != null)){
			theDock.iconSmall = options.iconSmall;
		}else{
			theDock.iconSmall = this.iconSmall;
		}
		if((options.iconLarge != undefined) && (options.iconLarge != null)){
			theDock.iconLarge = options.iconLarge;
		}else{
			theDock.iconLarge = this.iconLarge;
		}
		if((options.iconDiff != undefined) && (options.iconDiff != null)){
			theDock.iconDiff = options.iconDiff;
		}else{
			theDock.iconDiff = this.iconDiff;
		}
		if((options.dock != undefined) && (options.dock != null)){
			theDock.dock = options.dock;
		}else{
			theDock.dock = this.dock;
		}
		if((options.animating != undefined) && (options.animating != null)){
			theDock.animating = options.animating;
		}else{
			theDock.animating = this.animating;
		}
		if((options.redrawReady != undefined) && (options.redrawReady != null)){
			theDock.redrawReady = options.redrawReady;
		}else{
			theDock.redrawReady = this.redrawReady;
		}
		return theDock;
	}
}

jQuery(document).ready(function(){
	MacOsXIconDock.bindEvents();
});

(function(jQuery) {
	jQuery.fn.macOsXIconDock = function(options) {
		var defaults = {  
			proximity : 100
			,iconSmall : 45
			,iconLarge : 125 //css also needs changing to compensate with size
			,iconDiff : 80
			,mouseX : 0
			,mouseY : 0
			,dock : this
			,animating : false
			,redrawReady : false 
		};  
		var options = jQuery.extend(defaults, options);

		return this.each(function(){
			var macOsXIconDockObject = MacOsXIconDock.createMacOsXIconDock(options);
			macOsXIconDockObject.startMacOsXIconDock();
		}).addClass("mac-os-x-icon-dock").trigger("mousemove");
	}
})(jQuery);

