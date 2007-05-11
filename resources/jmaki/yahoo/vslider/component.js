var sliderapp= function() {
	var verticalSlider;
    var uuid = widget.uuid;

    // The slider can move 0 pixels up
    var topConstraint = 0;

    // The slider can move 200 pixels down
    var bottomConstraint = 200;

    // Custom scale factor for converting the pixel offset into a real value
    var scaleFactor = 1.5;

    return {

        init: function() {

            YAHOO.util.Event.addListener(uuid + "_formV", "submit", this.updateVert);
            YAHOO.util.Event.addListener(uuid + "_vertButton", "click", this.updateVert);

            verticalSlider = YAHOO.widget.Slider.getVertSlider(uuid + "_vertBGDiv", 
                             uuid + "_vertHandleDiv", topConstraint, bottomConstraint);

            verticalSlider.onChange = function(offsetFromStart) {
                // use the scale factor to convert the pixel offset into a
                // real value
                var actualValue = parseInt(offsetFromStart * scaleFactor);
                document.getElementById(uuid + "_vertVal").value = actualValue;
                document.getElementById(uuid + "_vertBGDiv").title = 
                            "Vertical Slider, value = " + actualValue;
            };

            verticalSlider.onSlideStart = function() {
            };

            verticalSlider.onSlideEnd = function() {
                // alert("slideend");
            };

        },

        updateVert: function() {
            var valueId = uuid + "_vertVal";
            var v = parseFloat(document.getElementById(valueId).value, 10);
            if ( isNaN(v) ) v = 0;

            // convert the real value into a pixel offset
            verticalSlider.setValue(Math.round(v/scaleFactor));
            return false;
        }
    };
}();


sliderapp.init();
// add to the instance map for later refernece
jmaki.attributes.put(widget.uuid, sliderapp);