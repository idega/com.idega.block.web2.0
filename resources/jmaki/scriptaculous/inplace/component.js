new Ajax.InPlaceEditor(widget.uuid, widget.service, 
  { ajaxOptions: 
        {method: 'post'}, 
        widget: widget,
        callback: function(form, value) {
	  var result = null;
	  if (typeof _globalScope.gPartial == 'undefined') {
	      result = Form.serialize(form);
	  } else {
	      this.ajaxOptions.requestHeaders = 
		  this.ajaxOptions.requestHeaders || [];
	      this.ajaxOptions.requestHeaders.push(gPartial);
	      this.ajaxOptions.requestHeaders.push("values");
	      this.ajaxOptions.requestHeaders.push(gRender);
	      this.ajaxOptions.requestHeaders.push(this.widget.uuid);
	      this.ajaxOptions.requestHeaders.push(gExecute);
	      this.ajaxOptions.requestHeaders.push(this.widget.uuid);
	      
	      var stateElements = window.document.getElementsByName(gViewState);
	      var stateValue = encodeURIComponent(stateElements[0].value);
	      var formName = encodeURIComponent(form.id);
	      var uuid = encodeURIComponent(this.widget.uuid);
		  
	      result = uuid + "=" + value + "&" + 
		  formName + "=" + formName + "&" + 
		  gViewState + "=" + stateValue;
	  }
	  return result;
      }, 
      onComplete: function(transport, element) {
	    if (null == transport || null == element) {
		return;
	    }

	    var xml = transport.responseXML;
	    var components = xml.getElementsByTagName('components')[0];
	    var render = components.getElementsByTagName('render');
	    var str = render[0].firstChild.firstChild;
	    str = str.text || str.data;
	    element.removeChild(element.firstChild);
	    element.innerHTML = str;

	    var state = state || xml.getElementsByTagName('state')[0].firstChild;
	    if (state) {
		var hf = $(gViewState);
		if (hf) {
		    hf.value = state.text || state.data;
		}
	    }

      }

  });
