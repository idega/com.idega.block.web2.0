/* Copyright 2005 Sun Microsystems, Inc. All rights reserved. You may not modify, use, reproduce, or distribute this software except in compliance with the terms of the License at: http://developer.sun.com/berkeley_license.html
$Id: component.js,v 1.1 2006/09/12 11:19:48 valdas Exp $
*/

 
if (typeof Delicious == 'undefined') var Delicious = function(id) {;
    var uuid = id;

    this.load = function(user, count){
        var s = document.createElement("script");
        var url = "http://del.icio.us/feeds/json/"+user+"?count=" + count + "&" + 
                        "callback=jmaki.attributes.get('" + uuid + "').loaded";
        s.src = url;
        s.charset = "utf-8";
        document.body.appendChild(s);
    }
     
     this.loaded  = function(posts) {
         var ul = document.createElement('ul');
         for (var i=0, post; post = posts[i]; i++) {
             var li = document.createElement('li');
             var a = document.createElement('a');
             a.style.marginLeft = '20px';
             var img = document.createElement('img');
             img.style.position = 'absolute';
             img.style.display = 'none';
             img.height = img.width = 16;
             img.src = post.u.split('/').splice(0,3).join('/')+'/favicon.ico'
                 img.onload = showImage(img);
             a.setAttribute('href', post.u);
             a.appendChild(document.createTextNode(post.d));
             li.appendChild(img);
             li.appendChild(a);
             ul.appendChild(li);
         }
         document.getElementById(uuid).appendChild(ul);
     }

    function showImage(img){ return (function(){ img.style.display='inline' }) }
}

var count = 20;
if (typeof widget.args != 'undefined' && typeof widget.args.itemCount != 'undefined') {
    count = widget.args.itemCount;
}

var d = new Delicious(widget.uuid);
jmaki.attributes.put(widget.uuid, d);
d.load(widget.args.tag, count);
