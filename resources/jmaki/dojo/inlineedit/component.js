dojo.require("dojo.widget.*");
dojo.require("dojo.widget.InlineEditBox");
dojo.require("dojo.event.*");

var w = dojo.widget.createWidget(widget.uuid);

w.getValue = function() {
    return w.textValue;
}

// add a saveState function
if (typeof widget.valueCallback != 'undefined') {
    w.onSave = function(newValue, oldValue) {   
        // we need to be able to adjust this
        var url = widget.valueCallback;
        dojo.io.bind({
                url: url + "?cmd=update",
                method: "post",
            content: { "value" : newValue  },
            load: function (type,data,evt) {
                // do something if there is an error
            }
        });
    }
}
w.saveState = w.onSave;
jmaki.attributes.put(widget.uuid, w);