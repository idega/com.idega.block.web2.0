dojo.require("dojo.widget.ComboBox");

var cb = dojo.widget.createWidget(widget.uuid);
var data = cb.baseDir + "/assets/data.js";

if (typeof widget.value != 'undefined') {
    cb.setValue(widget.value);
}

cb.onChange = function(value){
   jmaki.publish("/cb", value);
} 
dojo.event.connect(cb, "setSelectedValue", cb, "onChange"); 
// add a saveState function
if (typeof widget.valueCallback != 'undefined') {
    cb.saveState = function() {
        // we need to be able to adjust this
        var url = widget.valueCallback;
        dojo.io.bind({
                url: url + "?cmd=update",
                method: "post",
            content: { "value" : this.getValue() },
            load: function (type,data,evt) {
                // do something if there is an error
            }
        });
    }
}
jmaki.attributes.put(widget.uuid, cb);