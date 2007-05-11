if (typeof jmaki == 'undefined') {
    jmaki = {};
}

jmaki.FlickrProxySearch = function(service, topic){

    var target;
    
    if (typeof  topic == 'undfined') {
        topic = "flickrSearch";
    }
	
    this.searchPhotos = function(tags) {
        // build and encode the last URL parameter tags=_target.value
        target = encodeURIComponent("tags=" + tags);
        var url = service + "?key=flickrtagsearch&urlparams=" + target;
        jmaki.doAjax({url: url, callback: function(req) { var _req=req; postProcess(_req);}});
    }
	
    function postProcess(req) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (req.responseText != '') {
                    var response = eval("(" + req.responseText + ")");
		    		jmaki.publish(topic, response.photos);
                } else {
	                jmaki.publish(topic, []);
	            }
            }
        }
    }
}