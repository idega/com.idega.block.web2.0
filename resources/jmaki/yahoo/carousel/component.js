// load dependencies
jmaki.loadScript(widget.baseDir + "/carousel.js");

var CarouselWrapper = function(uuid) {

    var lastRan = -1;
    var fList = [];

    var fmtItem = function(imgUrl, url, title) {

        var innerHTML = 
            '<a href="' + 
            url + 
            '"><img src="' + 
            imgUrl +
            '" width="' +
            75 +
            '" height="' +
            75+
            '"/>' + 
            title + 
            '</a>';
      
        return innerHTML;
        
    }

    var loadInitialItems = function(type, args) {

        var start = args[0];
        var last = args[1]; 

        load(this, start, last);	
    }


    this.setItems = function(items) {
        fList = items;
        loadInitialItems("load", 0,3);
    }
    
    var loadNextItems = function(type, args) {	

        var start = args[0];
        var last = args[1]; 
        var alreadyCached = args[2];
        
        if(!alreadyCached) {
            load(this, start, last);
        }
    }

    var loadPrevItems = function(type, args) {
        var start = args[0];
        var last = args[1]; 
        var alreadyCached = args[2];
        
        if(!alreadyCached) {
            load(this, start, last);
        }
    }     

    var load = function(carousel, start, last) {
        for(var i=start;i<=last;i++) {
        
            if (typeof fList[i] != 'undefined' ) {
                carousel.addItem(i, fmtItem(fList[i].thumbnailURL, fList[i].imageURL,  fList[i].name));
            }
        }
    }

    var getRandom = function(max, last) {
        var randomIndex;
        do {
            randomIndex = Math.floor(Math.random()*max);
        } while(randomIndex == last);
        
        return randomIndex;
    }

    var handlePrevButtonState = function(type, args) {

        var enabling = args[0];
        var leftImage = args[1];
        if(enabling) {
            leftImage.className = "prev-arrow-enabled ";	
        } else {
            leftImage.className = "prev-arrow-disabled";
        }
        
    }

    this.pageLoad = function() {
        var carousel = new YAHOO.extension.Carousel(uuid, 
            {
                "numVisible":        4,
                "animationSpeed":   .25,
                "scrollInc":         3,
                "navMargin":         40,
                "prevElementID":     uuid + "_prev-arrow",
                "nextElementID":     uuid + "_next-arrow",
                "loadInitHandler":   loadInitialItems,
                "loadNextHandler":   loadNextItems,
                "loadPrevHandler":   loadPrevItems,
                "prevButtonStateHandler":   handlePrevButtonState
            }
        );
    }
}

  /**
   *  Insert a script tag in the head of the document which will inter load the flicker photos
   *  and call jsonFlickrFeed(obj) with the corresponding object.
   *
   */
var FlickrLoader = function(apiKey) {
    
    this.load = function(tags, callback) {
        // TODO: may be a problem with multiple concurrent feeds
        
        if (typeof _globalScope.flickrListeners == 'undefined') {
            _globalScope.flickrListeners = {};
        }
        var listeners = _globalScope.flickrListeners[tags];
        if (typeof listeners == 'undefined') {
            listeners = [];
        }
        listeners.push(callback);
        _globalScope.flickrListeners[tags] = listeners;      
        
        _globalScope.jsonFlickrFeed = function(args) {
            var title = args.title;
            var tagsEnd = title.indexOf(" - Everyone");
            var tagNames = title.substring(0,tagsEnd);
            tagNames.replace(' and ', ',');
3             
            var tListeners = _globalScope.flickrListeners[tags];
            if (tListeners != null) {
                for (i in tListeners) {
                    tListeners[i](args);
                }
            }
            //postProcessFlicker(arg, callback);
        }
        var s = document.createElement("script");
        var url ="http://www.flickr.com/services/feeds/photos_public.gne?tags=" + tags + "&format=json";
        if (typeof apiKey != 'undefined') {
            url += "appid=" + apiKey;
        }
        s.src = url;
        s.type = "text/javascript";
        s.charset = "utf-8";
        document.body.appendChild(s);      
    }
    
}

var cw = new CarouselWrapper(widget.uuid);


function fCallback (obj) {
    
    var flickrPhotos = obj;
    // get info from the JSON object
    var fi = [];
    
    for (var l=0; l < flickrPhotos.items.length; l++) {
        var itemId = "flickr_" + l;
        var description = flickrPhotos.items[l].description;            
        var start = description.indexOf("src=") + 10;
        var stop =  description.indexOf("_m.jpg");
        var imageBase = description.substring(start,stop);
        var thumbURL = imageBase + "_m.jpg";
        var imageURL = imageBase + ".jpg";
        description = "Author: " + flickrPhotos.items[l].author + " tags:" + flickrPhotos.items[l].tags;
        var price = 0;
        var name = flickrPhotos.items[l].title;
        var i = {id:itemId , name: name, thumbnailURL: thumbURL, imageURL: imageURL, description: description};
        fi.push(i);
        
    }
    // call the callback with the flickr items

    cw.setItems(fi);
    cw.pageLoad();
    jmaki.attributes.put(widget.uuid, cw);
}

// default to the tag "theKt"
var tags = "theKt";
if (typeof widget.args != "undefined") {
    if (typeof widget.args.tags != "undefined") {
        tags = widget.args.tags;
    }
}
var fl;

if (typeof widget.args != "undefined") {
    if (typeof widget.args.tags != "undefined") {
        fl = new FlickrLoader(widget.args.apikey);
    } else {
        fl = new FlickrLoader();
    }
}

fl.load(tags, fCallback);
