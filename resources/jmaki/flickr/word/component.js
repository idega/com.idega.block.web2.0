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

var FlickrWord = function (target) {

    var legalCharacters = "abcdefghjiklmnopqrstuvwxyz";
    var items = {};
    var usedChars = {};
    var uuid = widget.uuid;
    var pxSize = 25;
    var originalText;
    var repeatCharacters = false;
    var renderred = false;
    
    var blankImage = widget.baseDir + "/images/blank.gif";
    
    this.getTargetWord = function() {
        return items.targetCharacters.join();
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
    
    this.setWord = function(text, size, repeat) {
        items = {};
        usedChars = {};
        renderred = false;
        originalText = text.toLowerCase();
        
        if (typeof size != 'undefined') {
            pxSize = size;
         }
         if (typeof repeat != 'undefined') {
           repeatCharacters = repeat;
         }
        items.targetCharacters =  getCharacters(text);
        for (var i = 0; i < items.targetCharacters.length; i++) {
            fl.load("oneletter," + items.targetCharacters[i] + items.targetCharacters[i], fCallback);
        }
    }
    
    function showImages(items) {
        var targetDiv = document.getElementById(uuid);
        targetDiv.style.height = "auto";
        targetDiv.innerHTML = "";
        for (var i =0;  i < originalText.length; i++) {
            var node = document.createElement("img");
            node.style.height = pxSize + "px";
            node.style.width = pxSize + "px";
            // if we are working with a space handle it
            if (originalText.charAt(i) == ' ') {
                node.src = blankImage;
                targetDiv.appendChild(node);
            } else if (typeof items[originalText.charAt(i)] != 'undefined') {
                // take the next available letter off the top if repeatCharacters is on
                // otherwise default to the first one (as there is only one)
                var t;
                if (!repeatCharacters) {

                
                    if (typeof items[originalText.charAt(i)] != 'undefined') {
                        t = items[originalText.charAt(i)].pop();
                        node.src = t.url;
                        targetDiv.appendChild(node);
                    }
                } else {
                  t = items[originalText.charAt(i)][0];
                  node.src = t.url;
                  targetDiv.appendChild(node);  
                }        
            }
        }
    }
    
    function getCharacters(w) {
        var word = w.toLowerCase();
        var characters = [];
        for (var ch=0; ch < word.length; ch++) {
            // skip spaces and only allow legal characters
            if (word.charAt(ch) != ' ' && legalCharacters.indexOf(word.charAt(ch)) != -1) {
                if (repeatCharacters == false) {     
                    if (typeof usedChars[word.charAt(ch)] == 'undefined') {
                        usedChars[word.charAt(ch)] = 1;
                        characters.push(word.charAt(ch));
                    } else {
                      var prev = Number(usedChars[word.charAt(ch)]);
                      // increment the counter so we can load multiple images
                      // for each character
                      usedChars[word.charAt(ch)] = ++prev; 
                    }
                } else {
                    if (typeof usedChars[ch] == 'undefined') {
                        characters.push(word.charAt(ch));
                        usedChars[word.charAt(ch)] = 1;
                    }
                }
            }
        }
        return characters;
    }
}

// default search

var pxSize = "25";
var word = "jmaki";
var fl;
var repeatCharacters = false;

if (typeof widget.args != "undefined") {
    if (typeof widget.args.word != "undefined") {
        word = widget.args.word;
    }
    if (typeof widget.args.size != "undefined") {
        pxSize = widget.args.size;
    }
    if (typeof widget.args.repeatCharacters != "undefined") {
        repeatCharacters = (widget.args.repeatCharacters.toLowerCase() == 'true');
    }
    if (typeof widget.args.tags != "undefined") {
        fl = new FlickrLoader(widget.args.apikey);
    } else {
        fl = new FlickrLoader();
    }
}

var c = new FlickrWord();

c.setWord(word, pxSize,repeatCharacters);

jmaki.attributes.put(widget.uuid, c);