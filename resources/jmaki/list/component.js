/* Copyright 2005 Sun Microsystems, Inc. All rights reserved. You may not modify, use, reproduce, or distribute this software except in compliance with the terms of the License at: http://developer.sun.com/berkeley_license.html
$Id: component.js,v 1.1 2006/09/12 11:19:49 valdas Exp $
*/

function List() {
	var uuid = widget.uuid;
	var service = widget.service;
	
	function getXHR(url) {

	    if (window.XMLHttpRequest) {
	        return new XMLHttpRequest();
	    } else if (window.ActiveXObject) {
	        return new ActiveXObject("Microsoft.XMLHTTP");
	    }
	}
	
	this.submitData = function() {
	    var list = document.getElementById(uuid + "_list");
	    var req = getXHR(service);
	    req.onreadystatechange = function() {
		    if (req.readyState == 4) {
	            if (req.status == 200) {
	                list.innerHTML = req.responseText;
	            }
	        }
	    };
	    req.open("POST", service, true);
	    var entryField = document.getElementById(uuid + "_entryField");
	    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    req.send("command=add&entry=" + entryField.value + "&uuid=" + uuid);
	}
	
	 this.removeItem = function(index) {
	    var list = document.getElementById(uuid + "_list");
	    var req = getXHR(service);
	    req.onreadystatechange = function() {
		    if (req.readyState == 4) {
	            if (req.status == 200) {
	                list.innerHTML = req.responseText;
	            }
	        }
	    };
	    req.open("POST", service, true);
	    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    req.send("command=remove&index=" + index  + "&uuid=" + uuid);
	}
}

var list = new List();
jmaki.attributes.put(widget.uuid, list);