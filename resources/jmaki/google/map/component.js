var containerDiv = document.getElementById(widget.uuid);

var zoom = 13;
var centerLat = 37.4419;
var centerLon = -122.1419;

var mapType = G_SATELLITE_TYPE;
var mapH = 0;
var mapW = 0;

if (typeof widget.args != 'undefined') {
    if (typeof widget.args.zoom != 'undefined') {
        zoom = Number(widget.args.zoom);
    }

    if (typeof widget.args.zoom != 'undefined') {
        zoom = Number(widget.args.zoom);
    }

    if (widget.args.centerLat != 'undefined') {
        centerLat = Number(widget.args.centerLat);
    }
    if (typeof widget.args.centerLon != 'undefined') {
        centerLon = Number(widget.args.centerLon);
    }


    if (typeof widget.args.height != 'undefined') {
        mapH = Number(widget.args.height);
    }

    if (typeof widget.args.width != 'undefined') {
        mapW = Number(widget.args.width);
    }  
}

if (mapH == 0) {
    containerDiv.offsetHeight;
}
if (mapW == 0) {
    containerDiv.offsetHeight;
}

containerDiv.style.width = mapW + "px";
containerDiv.style.height = mapH + "px";

var map = new GMap2(containerDiv);
map.setCenter(new GLatLng(centerLat, centerLon), zoom);
map.addControl(new GSmallMapControl());
map.addControl(new GMapTypeControl());
map.setMapType(mapType);
jmaki.attributes.put(widget.uuid, map);