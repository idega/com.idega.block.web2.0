
function Rss(interval){
    var interval = interval;
    var _this = this;
	var _widget = widget;
	var uuid = widget.uuid;
    var rssitems;
	var channel;
    var id = 0;
    var link = [];
    var title = [];
    var description = [];
    var opacitysetting = 0.1;
    var fadetimer1;
    
    function getXHR() {
	    if (window.XMLHttpRequest) {
        	return new XMLHttpRequest();
    	} else if (window.ActiveXObject) {
        	return new ActiveXObject("Microsoft.XMLHTTP");
    	}
	}
    
	var ajax = getXHR();
    getRSSContent();
    
    function getRSSContent(){
        ajax.onreadystatechange = function(){loadRss()};
        var url = jmaki.webRoot + "/rssprovider?url=" + encodeURIComponent(_widget.service) + "&format=json&itemIndex=4";
        ajax.open('GET', url, true);
        ajax.send(null);
    }
    
    function loadRss() {
        
        if (ajax.readyState == 4){ 
            
            if (ajax.status == 200){ 
                channel = eval("(" + ajax.responseText + ")");
                rssItems = channel.channel.item;
                var tickerItemDiv = document.getElementById(uuid + "_item");
                var tickerDescriptionDiv = document.getElementById(uuid + "_description");
                if (typeof rssItems == 'undefined' || rssItems.length == 0) { 
                    tickerItemDiv.innerHTML = "Sorry, cannot load RSS feed<br />" + response;
                    return;
                }
                
                tickerItemDiv.innerHTML = '<a href="'+rssItems[id].link+'" target="_newFrame">'+rssItems[id].title +'</a>';
                tickerDescriptionDiv.innerHTML  = rssItems[id].date;
                fade("reset"); 
                fadetimer1 = setInterval(function(){fade('up', 'fadetimer1' + uuid)}, interval);   
                id=(id < rssItems.length-1)? id+1 : 0;
                setTimeout(function(){loadRss()}, 7000); 
            }
        }
    }
    
    function setOpacity(opacity, id) {
        var target = document.getElementById(id);
        if (typeof target.style.filter != 'undefined') {
            target.style.filter = "alpha(opacity:" + (opacity*100) + ")"; 
        } else {
            target.style.opacity = opacity;
        }            
    }
    
    function fade(type, timerid){
        
        if (type == "reset") {
            opacitysetting=.1;
        }
        
        setOpacity(opacitysetting, uuid + "_item");
        setOpacity(opacitysetting, uuid + "_description");
        
        if (type == "up") {
            opacitysetting += 0.1;
        }
        
        if (opacitysetting >= 1 ) {
            clearInterval(fadetimer1);
        }
    }
}

var interval = 175;

if (typeof widget.args != 'undefined') {
  if (typeof widget.args.interval != 'undefined') {
      interval = Number(widget.args.interval);
  }
}

var rss = new Rss(interval);
jmaki.attributes.put(widget.uuid,rss);