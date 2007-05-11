dojo.require("dojo.widget.FisheyeList");

// create the top level widget
var fishEye = dojo.widget.createWidget(widget.uuid);

// programtically add FisheyeListItem children to the widget
var counter = 0;
while (true) {
    var i = widget.args.items[counter++];
    if (i == null) break;
    var icon = dojo.widget.createWidget("FisheyeListItem", i);
    icon.onClick = function () {
        jmaki.publish("/fisheye", this);
    }
    fishEye.addChild(icon);
}
