var topic = "";
var columns = 5;
var count =20;
 var _widget = widget;

if (typeof widget.args != 'undefined') {
    if  (typeof widget.args.topic == 'undefined') {
        topic = "flickrSearch";
    } else {
        topic = widget.args.topic;
    }
    if  (typeof widget.args.columns != 'undefined') {
        columns = Number(widget.args.columns);
    }
    if  (typeof widget.args.count != 'undefined') {
        count = Number(widget.args.count);
    }
}
function flickrSearchListener(photos) {
     var targetDiv = document.getElementById(_widget.uuid + "_flickrResults");
    // clear out the children
    for (var l = targetDiv.childNodes.length -1; l >= 0; l--) {
        targetDiv.removeChild(targetDiv.childNodes[l]);    
    }

	var row;
    var length = count;

    if (photos.items.length < count) {
        length = photos.items.length;
    }

    for (var i =0; i < length; i++) {
         if (i % columns == 0) {
            if (typeof targetDiv.insertRow != 'undefined') {
                row = targetDiv.insertRow(targetDiv.rows.length);
            } else {
                row = document.createElement("tr");
            	targetDiv.appendChild(row);
            }
        }
        var cell;
        if (typeof row.insertCell != 'undefined') {
            cell = row.insertCell(0);
        } else {
            cell = document.createElement('td');
            row.appendChild(cell);
        }
        var target = document.createElement("a");
        target.href =  photos.items[i].url;
        target.title = photos.items[i].title;
        target.innerHTML = "<img src='" + photos.items[i].smallURL + "' border='0'>";
        cell.appendChild(target);
    }
}

var fs = new jmaki.FlickrProxySearch(widget.service,topic);

// subscribe the instance listener
fs.listener = flickrSearchListener;
jmaki.subscribe(topic, fs.listener);

// add to the instance map for later refernece
jmaki.attributes.put(widget.uuid, fs);