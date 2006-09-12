
/************************************************************************************************************
(C) www.dhtmlgoodies.com, June 2006

This is a script from www.dhtmlgoodies.com. You will find this and a lot of other scripts at our website.	

Terms of use:
You are free to use this script as long as the copyright message is kept intact. However, you may not
redistribute, sell or repost it without our permission.

Thank you!

www.dhtmlgoodies.com
Alf Magne Kalleland

************************************************************************************************************/

/* Custom variables */


function Tooltip () {

    var service = widget.service;
    var uuid = widget.uuid;
    /* Offset position of tooltip */
    var x_offset_tooltip = 5;
    var y_offset_tooltip = 0;

    var tooltipObj = false;
    var tooltipObj_iframe = false;
    var leftDiv = false;
    var contentDiv = false;

    var ajax_tooltip_MSIE = false;
    if(navigator.userAgent.indexOf('MSIE')>=0)ajax_tooltip_MSIE=true;

    function loadContent(divId, url) {
            jmaki.doAjax({url: url, callback: function(req) { 
            document.getElementById(divId).innerHTML = req.responseText;
            var inputObj = document.getElementById(uuid);
            // Find position of tooltip
            positionTooltip(inputObj);
         }});
    }

    this.showTooltip = function () {
        var externalFile = service;
        
        /* Tooltip div not created yet ? */
        if(!tooltipObj) {
            tooltipObj = document.createElement('DIV');
            tooltipObj.style.position = 'absolute';
            tooltipObj.id = uuid + '_tooltipObj';
            tooltipObj.className = 'tooltipObj';
            document.body.appendChild(tooltipObj);
            
            leftDiv = document.createElement('DIV');	/* Create arrow div */
            leftDiv.className= 'tooltip_arrow';
            leftDiv.id = uuid + '_tooltip_arrow';
            tooltipObj.appendChild(leftDiv);
            
            contentDiv = document.createElement('DIV'); /* Create tooltip content div */
            contentDiv.className = 'tooltip_content';
            tooltipObj.appendChild(contentDiv);
            contentDiv.id = uuid + '_tooltip_content';
            
            if(ajax_tooltip_MSIE){	/* Create iframe object for MSIE in order to make the tooltip cover select boxes */
                tooltipObj_iframe = document.createElement('<IFRAME frameborder="0">');
                tooltipObj_iframe.style.position = 'absolute';
                tooltipObj_iframe.border='0';
                tooltipObj_iframe.frameborder=0;
                tooltipObj_iframe.style.backgroundColor='#FFF';
                tooltipObj_iframe.src = 'about:blank';
                contentDiv.appendChild(tooltipObj_iframe);
                tooltipObj_iframe.style.left = '0px';
                tooltipObj_iframe.style.top = '0px';
            }
        }

        loadContent(uuid + '_tooltip_content',externalFile);
        if(ajax_tooltip_MSIE){
            tooltipObj_iframe.style.width = tooltipObj.clientWidth + 'px';
            tooltipObj_iframe.style.height = tooltipObj.clientHeight + 'px';
        }    
    }

    function positionTooltip(inputObj) {
        var leftPos = (getLeftPos(inputObj) + inputObj.offsetWidth);
        var topPos = getTopPos(inputObj);
        
        var tooltipWidth = document.getElementById(uuid + '_tooltip_content').offsetWidth +  document.getElementById(uuid + '_tooltip_arrow').offsetWidth; 
        // Dropping this reposition for now because of flickering       
        tooltipObj.style.left = leftPos + 'px';
        tooltipObj.style.top = topPos + 'px';
        tooltipObj.style.visibility = "visible";
        contentDiv.style.visibility = "visible";
        leftDiv.style.visibility = "visible";
    }

    this.hideTooltip = function() {
        tooltipObj.style.visibility = "hidden";
        contentDiv.style.visibility = "hidden";
        leftDiv.style.visibility = "hidden";
    }

    function getTopPos(inputObj) {		
      var returnValue = inputObj.offsetTop;
      while((inputObj = inputObj.offsetParent) != null){
        if(inputObj.tagName!='HTML')returnValue += inputObj.offsetTop;
      }
      return returnValue;
    }

    function getLeftPos(inputObj) {
      var returnValue = inputObj.offsetLeft;
      while((inputObj = inputObj.offsetParent) != null){
        if(inputObj.tagName!='HTML')returnValue += inputObj.offsetLeft;
      }
      return returnValue;
    }
}

var t = new Tooltip();
// add to the instance map for later refernece
jmaki.attributes.put(widget.uuid, t);
    


