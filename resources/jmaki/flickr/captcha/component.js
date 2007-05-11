/**
*  Insert a script tag in the head of the document which will inter load the flicker photos
*  and call jsonFlickrFeed(obj) with the corresponding object.
*
*/
var FlickrLoader = function(apiKey) {
    
    this.load = function(tags, callback) {
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
            tagNames = tagNames.replace(/ and /, ',');
            var tListeners = _globalScope.flickrListeners[tagNames];
            if (tListeners != null) {
                for (var i = 0; i < tListeners.length; i++) {
                    tListeners[i](args,tagNames);
                }
                // release the listeners for this tag
                delete _globalScope.flickrListeners[tagNames];
            }
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

var Captcha = function (target) {
    
    var items = {};
    var usedChars = {};
    var uuid = widget.uuid;
    var repeatCharacters = false;
    var renderred = false;
    var pxSize = 25;
        
    this.getTargetWord = function() {
        return items.targetCharacters.join();
    }
    
    this.matches = function(target) {
        return (target ==  items.targetCharacters.join(''));
    }

    
   function fCallback (obj, t) {

        var letter = t.split(',')[1].charAt(0);
        // get info from the JSON object
        items[letter] = [];
        // get the letter count which will be more than one if
        // repeact characters was set
        var count = Number(usedChars[letter]);
        for (var lo = 0; lo < count; lo++) {
            // randomly choose one of the letters
            var l= Math.floor(Math.random()*(obj.items.length));
            var description = obj.items[l].description;     
            var start = description.indexOf("src=") + 10;
            var stop =  description.indexOf("_m.jpg");
            var imageBase = description.substring(start,stop);
            var thumbURL = imageBase + "_s.jpg";
            var name = obj.items[l].title;
            var i = {name: name, url: thumbURL};
            items[letter].push(i);
        }
        // check to see all the images are loaded
        if (checkIfDone() && !renderred) {
            renderred = true;
            showImages(items);
        }
    }

    
    // check to see if all the target characters have been loaded.
    function checkIfDone() {        
        for (var l = 0; l < items.targetCharacters.length; l++) {
            if (typeof items[items.targetCharacters[l]] == 'undefined') {
                return false;
            }
        }
        return true;
    }
    
    this.init = function(target, size, repeat) {
        items = {};
        usedChars = {};
        if (typeof repeat != 'undefined') {
            repeatCharacters = repeat;
        }
        if (typeof size != 'undefined') {
            pxSize = size;
        }
        renderred = false;
        items.targetCharacters =  target;
        for (var i = 0; i < target.length; i++) {
            if (typeof usedChars[target[i]] == 'undefined') {
                usedChars[target[i]] = 1;
                fl.load("oneletter," + target[i] + target[i], fCallback);
            } else {
                var prev = Number(usedChars[target[i]]);
                // increment the counter so we can load multiple images
                // for each character
                usedChars[target[i]] = ++prev; 
            }
        }
        
    }

    function showImages(items, repeat) {

        var targetDiv = document.getElementById(uuid);
        targetDiv.style.height = "auto";
        targetDiv.innerHTML = "";
        for (var i =0;  i < items.targetCharacters.length; i++) {
            var node = document.createElement("img");
            node.style.height = pxSize + "px";
            node.style.width = pxSize + "px";
            if (typeof items[items.targetCharacters[i]] != 'undefined') {
                // take the next available letter off the top if repeatCharacters is on
                // otherwise default to the first one (as there is only one)
                var t;
                if (repeatCharacters == false) {
                    if (typeof items[items.targetCharacters[i]] != 'undefined') {
                        t = items[items.targetCharacters[i]].pop();
                        node.src = t.url;
                        targetDiv.appendChild(node);
                    }
                } else {
                  t = items[items.targetCharacters[i]][0];
                  node.src = t.url;
                  targetDiv.appendChild(node);  
                }        
            }
        }
    }
}

// default captcha
var characters = ['j','m','a','k','i'];
var fl;
var repeatCharacters = false;
var pxSize = "25";

if (typeof widget.args != "undefined") {
    var chars = "abcdefghiklmnopqrstuvwxyz";
    var length = 5;
    if (typeof widget.args.length != "undefined") {
        length = Number(widget.args.length);
    }
    if (typeof widget.args.repeatCharacters != "undefined") {
        repeatCharacters = (widget.args.repeatCharacters.toLowerCase() == 'true');
    }
    if (typeof widget.args.size != "undefined") {
        pxSize = widget.args.size;
    }
    characters = [];
    for (var ch=0; ch < length; ch++) {
        var l= Math.floor(Math.random()*(chars.length));
        characters.push(chars.charAt(l));
    }
    if (typeof widget.args.tags != "undefined") {
        fl = new FlickrLoader(widget.args.apikey);
    } else {
        fl = new FlickrLoader();
    }
}

var c = new Captcha();
c.init(characters,pxSize,repeatCharacters);

jmaki.attributes.put(widget.uuid, c);
