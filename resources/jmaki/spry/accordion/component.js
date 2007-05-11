// Step 1: Define the Data Set
var ds = new Spry.Data.XMLDataSet(widget.service, widget.args.xpath);

function accordion(uuid, ds) {
    var _this = this;
    this.ds = ds;
    this.uuid = uuid;
    this.observer = { onPostUpdate: function(notifier, data) {var impl = new Spry.Widget.Accordion(_this.uuid); impl.attachBehaviors();} };
}

var a = new accordion(widget.uuid,ds);

Spry.Data.Region.addObserver(a.uuid, a.observer);
// intialize only the necesarry region

jmaki.attributes.put(widget.uuid, a);
Spry.Data.initRegions(document.getElementById(widget.uuid));