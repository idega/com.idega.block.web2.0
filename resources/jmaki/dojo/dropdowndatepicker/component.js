dojo.require("dojo.widget.*");
dojo.require("dojo.widget.DropdownDatePicker");

var w = dojo.widget.createWidget(widget.uuid);

if (typeof widget.value != 'undefined') {
    w.datePicker.date = new Date(widget.value);
    w.datePicker.setDate(w.datePicker.date);
    w.inputNode.value = dojo.date.format(w.datePicker.date, w.dateFormat);
    w.datePicker.initUI();
}
w.getValue = function() {
    return w.datePicker.date;
}

// add a saveState function
if (typeof widget.valueCallback != 'undefined') {
    w.saveState = function() {
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
jmaki.attributes.put(widget.uuid, w);
