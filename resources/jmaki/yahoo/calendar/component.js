var w = new YAHOO.widget.Calendar("jmaki.attributes.get('" + widget.uuid + "')", widget.uuid);

if (typeof widget.value != 'undefined') {
    var date = new Date(widget.value);
    w.select(date);
}

w.getValue = function() {
    if (w.getSelectedDates().length >0) {
        return w.getSelectedDates()[0];
    } else {
     return null;
    }
}

// add a saveState function
if (typeof widget.valueCallback != 'undefined') {
    w.saveState = function() {
        if (w.getValue() == null) return;
        // we need to be able to adjust this
        var url = widget.valueCallback;
        var _val =  w.getValue().toString();
        url = url + "?cmd=update";
        jmaki.doAjax({url: url, method: "post", content: {value : _val}, callback: function(req) {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        // take some action if needed
                    }
            }
        }});
    }
}
w.render();

// add to the instance map for later refernece
jmaki.attributes.put(widget.uuid, w);