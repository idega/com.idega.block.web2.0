function MapPopup(w) {
    var _this = this;
    var _widget = widget;
    var uuid = _widget.uuid;
    var service = _widget.service;
    var location;
    var loaded = false;
    var map;
    var mapH = 150;
    var mapW = 150;
    var zoom = 13;
    var padding = 10;
    var showOverlay = false;
    var mapContainer;
    var containerDiv;
    var arrowDiv;
    var resizeDiv;
    var closeDiv;
    var dragStart;
    var top = 0;
    var left = 0;
    
    if (typeof _widget.args != 'undefined') {
        if (typeof _widget.args.zoom != 'undefined') {
            zoom = Number(_widget.args.zoom);
        }

        if (typeof _widget.args.height != 'undefined') {
            mapH = Number(_widget.args.height);
        }

        if (typeof _widget.args.width != 'undefined') {
            mapW = Number(_widget.args.width);
        }

        if (typeof _widget.args.showOverlay != 'undefined') {
            showOverLay = (_widget.args.showOverlay = "true");
        }  
    }
	
   
	this.getMap = function(location) {
        containerDiv = document.getElementById(_widget.uuid);
        if (containerDiv.style.visibility == "visible") {
            var containerDiv = document.getElementById(_widget.uuid);
            setVisible("hidden");
        } else if (!loaded) {
            if (typeof location == 'undefined') {
                location = encodeURIComponent(_widget.value);
            }
            var encodedLocation = encodeURIComponent("location=" + location);
            var url = service + "?key=yahoogeocoder&urlparams=" + encodedLocation;
            jmaki.doAjax({url: url, callback: function(req) { var _req=req; postProcess(_req);}});
        } else {
            setVisible("visible");
        }
	}
    
    function setVisible(visibility) {
        containerDiv.style.visibility = visibility;
        mapContainer.style.visibility = visibility;
        arrowDiv.style.visibility = visibility;
        closeDiv.style.visibility = visibility;
    }
	
    function postProcess(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                loaded = true;
                if (req.responseText != '') {
                    var response = eval("(" + req.responseText + ")");
                    var coordinates = response.coordinates;
                    containerDiv = document.getElementById(_widget.uuid);
                    var button = document.getElementById(_widget.uuid + "_button");
                    arrowDiv = document.getElementById(_widget.uuid + "_arrow");
                    resizeDiv = document.getElementById(_widget.uuid + "_resize");
                    mapContainer = document.getElementById(_widget.uuid + "_map");
                    closeDiv = document.getElementById(_widget.uuid + "_close");
                    closeDiv.onmousedown = function (e) {
                        setVisible("hidden");
                        return false;
                    }
                    var pos = getPosition(button);
                    top = (pos.y -25)
                    containerDiv.style.top = top + "px";
                    closeDiv.style.left = (mapW - closeDiv.clientWidth -1)  + "px";
                    closeDiv.style.top =  1 + "px";
                    // resizing div  location
                    resizeDiv.style.left = (mapW - resizeDiv.clientWidth) + "px";
                    resizeDiv.style.top = (mapH - resizeDiv.clientHeight) + "px";
                    // attach listeners
                    resizeDiv.onmousedown = function (e) {
                        var pos = getMousePos(e);
                        dragStart = pos;
                        return false;
                    }
                    function mouseMove(e) {
                        if (dragStart) {
                            var pos = getMousePos(e);
                            
                            mapW =  (pos.x - left);
                            mapH =  (pos.y - top);
                           
                            // move all the things to thier respective places 
                            containerDiv.style.width = mapW + "px";
                            containerDiv.style.height = mapH + "px";
                            mapContainer.style.width = mapW  - (padding * 2) + "px";
                            mapContainer.style.height = mapH - (padding * 2) + "px";
                            resizeDiv.style.left = (mapW - resizeDiv.clientWidth) + "px";
                            resizeDiv.style.top = (mapH - resizeDiv.clientHeight) + "px";
                            closeDiv.style.left = (mapW - closeDiv.clientWidth -1) + "px";
                        }
                        return true;
                    }
                    
                    // drag done
                    function onmouseup(e) {
                        dragStart = null;
                    }
                    
                    if (typeof document.attachEvent != 'undefined') {
                        document.attachEvent("onmousemove",function(e){var event = e;mouseMove(event);});
                    } else {
                        document.addEventListener("mousemove",function(e){var event= e;mouseMove(e);}, true);
                    }
                    
                    if (typeof document.attachEvent != 'undefined') {
                        document.attachEvent("onmouseup",function(e){var event = e;onmouseup(event);});
                    } else {
                        document.addEventListener("mouseup",function(e){var event= e;onmouseup(e);}, true);
                    }

                    left = (pos.x + button.clientWidth +  arrowDiv.clientWidth - 1) ;
                    containerDiv.style.left = left + "px";
                    mapContainer.style.top = padding + "px";
                    mapContainer.style.left = padding + "px";

                    arrowDiv.style.top = pos.y + "px";
                    arrowDiv.style.left = (pos.x + button.clientWidth) + "px";                     
                    containerDiv.style.width = mapW + "px";
                    containerDiv.style.height = mapH + "px";
                    mapContainer.style.width = mapW  - (padding * 2) + "px";
                    mapContainer.style.height = mapH - (padding * 2) + "px";
                    var centerPoint = new GLatLng(coordinates[0].latitude,coordinates[0].longitude);
                    map = new GMap2(mapContainer);
                    map.setCenter(centerPoint, zoom);
                    map.setMapType(G_SATELLITE_TYPE);
                    var marker = new GMarker(centerPoint);
                    map.addOverlay(marker);
                    if (showOverlay) {
                        var txt = '<div><b>' + coordinates[0].address + ' ' + coordinates[0].city + ' ' +  coordinates[0].state + '</b></div>';
                        GEvent.addListener(marker, "click", function() {
                            marker.openInfoWindowHtml(txt); });
                    }
                    setVisible("visible");
                } else {
                    alert("no map available for " + _widget.value);
                }
			}
		}
    }
    
    function getMousePos(e){
        var lx = 0;
        var ly = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            lx = e.pageX;
            ly = e.pageY;
        } else if (e.clientX || e.clientY) {
            lx = e.clientX;
            ly = e.clientY;
        }
        return {x:lx,y:ly};
    }

    function getPosition(t) {
        var pX = 0;
        var pY = 0;
        while (t.offsetParent) {
                pY += t.offsetTop;
                pX += t.offsetLeft;
                t = t.offsetParent;
        }
        return {x: pX, y: pY};
    }
}

var mp = new MapPopup(widget);
jmaki.attributes.put(widget.uuid, mp);