/**
 * reflection.js v1.0
 *
 * Script by Cow http://cow.neondragon.net
 *           Gfx http://www.jroller.com/page/gfx/
 *           Sitharus http://www.sitharus.com
 *           Andreas Linde http://www.andreaslinde.de/
 *
 * Freely distributable under MIT-style license.
 */
 
/* From prototype.js */
document.getElementsByClassName = function(className) {
	var children = document.getElementsByTagName('*') || document.all;
	var elements = new Array();
  
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		var classNames = child.className.split(' ');
		for (var j = 0; j < classNames.length; j++) {
			if (classNames[j] == className) {
				elements.push(child);
				break;
			}
		}
	}
	return elements;
}

function addReflections() {
	if (document.all && !window.opera) {
		var isMSIE = true;
	} else {
		var isMSIE = false;
	}
	
	var reflect = document.getElementsByClassName('reflect');
	for (i=0;i<reflect.length;i++) {
		try {
			var d = document.createElement('div');
			var p = reflect[i];
			
			var classes = p.className.split(' ');
			var wholeImage = false;
			var newClasses = '';
			for (j=0;j<classes.length;j++) {
				if (classes[j] == "wholeimage") {
					var wholeImage = true;
				}
				if (classes[j] != "reflect") {
					if (newClasses) {
						newClasses += ' '
					}
					
					newClasses += classes[j];
				}
			}

			if (wholeImage) {
				var reflectionHeight = p.height;
				var divHeight = p.height*2;
			} else {
				var reflectionHeight = p.height/2;
				var divHeight = p.height*1.5;
			}
			var reflectionWidth = p.width;

			/* Copy original image's classes & styles to div */
			d.className = newClasses;
			
			d.style.cssText = p.style.cssText;
			p.style.cssText = ' ';
			
			if (isMSIE) {
				var reflection = document.createElement('div');
				
				reflection.style.width = reflectionWidth+'px';
				reflection.style.height = reflectionHeight+'px';
				reflection.style.background = 'url('+p.src+') 0px -'+reflectionHeight+'px';
				reflection.style.filter = 'flipv progid:DXImageTransform.Microsoft.Alpha(opacity=50, style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy='+p.height+')';
				
				d.style.width = reflectionWidth+'px';
				d.style.height = divHeight+'px';
				p.parentNode.replaceChild(d, p);
				
				d.appendChild(p);
				d.appendChild(reflection);
			} else {
				var canvas = document.createElement('canvas');
				var context = canvas.getContext("2d");
			
				canvas.style.height = reflectionHeight+'px';
				canvas.style.width = reflectionWidth+'px';
				canvas.height = reflectionHeight;
				canvas.width = reflectionWidth;
				
				d.style.width = reflectionWidth+'px';
				d.style.height = divHeight+'px';
				p.parentNode.replaceChild(d, p);
				
				d.appendChild(p);
				d.appendChild(canvas);
				
				context.save();
				
				context.translate(0,reflectionHeight*2-1);
				context.scale(1,-1);
				
				context.drawImage(reflect[i], 0, reflect[i].height-reflectionHeight, reflectionWidth, reflectionHeight, 0, reflectionHeight, reflectionWidth, reflectionHeight);
				
				context.globalCompositeOperation = "destination-out";
				
				var gradient = context.createLinearGradient(0, reflectionHeight, 0, reflectionWidth);
				gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
				
				if (wholeImage) {
					gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
				} else {
					gradient.addColorStop(0.9, "rgba(255, 255, 255, 0.5)");
				}
	
				context.fillStyle = gradient;
				if (navigator.appVersion.indexOf('WebKit') != -1) {
					context.fill();
				} else {
					context.fillRect(0, 0, reflectionWidth, reflectionHeight*2);
				}
				
				context.restore();
			}
		} catch (e) {
	    }
	}
}

var previousOnload = window.onload;
window.onload = function () { if(previousOnload) previousOnload(); addReflections(); }
