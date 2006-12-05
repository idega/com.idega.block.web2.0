dojo.provide("chiba.DropdownDatePicker");
dojo.require("dojo.date");
dojo.require("dojo.widget.DatePicker");
dojo.require("dojo.widget.Spinner");
dojo.require("dojo.widget.validate");
dojo.widget.defineWidget(
        "chiba.XFDropdownDatePicker",
        dojo.widget.DropdownDatePicker,
{
    widgetType: "XFDropdownDatePicker",
    iconAlt: "Select a Date",
    zIndex: 1000,
    id:"",
    value:"",
    name:"",
    type:"",
    //dateFormat: "%m/%d/%Y",
    dateFormat: "%Y-%m-%d",
    containerToggle:"wipe",
    opacity:null,
    currentDate:null,
    templateString: '<div class="value"><input type="hidden" id="${this.id}" name="${this.name}" value="${this.value}" dojoAttachPoint="xformsValue"> <span style="white-space:nowrap"><input type="text" widgetId="${this.id}-date" value="" style="vertical-align:middle;" dojoAttachPoint="inputNode" autocomplete="off" /> <img src="${this.iconURL}" alt="${this.iconAlt}" dojoAttachPoint="buttonNode" dojoAttachEvent="onclick: onIconClick;" style="vertical-align:middle; cursor:pointer; cursor:hand;" /></span><br /><div dojoAttachPoint="containerNode" style="display:none;position:absolute;width:12em;background-color:#fff;"></div></div>',

    fillInTemplate: function(args, frag) {
        var jsDate = new Date();
        this.currentDate = dojo.date.setIso8601(jsDate, this.value);
        args.date = this.currentDate;
        dojo.widget.DropdownDatePicker.superclass.fillInTemplate.call(this, args, frag);
        var source = this.getFragNodeRef(frag);
        if (args.date) {
            this.date = new Date(args.date);
        }
        var dpNode = document.createElement("div");
        this.containerNode.appendChild(dpNode);
        var dateProps = { widgetContainerId: this.widgetId };
        if (this.date) {
            dateProps["date"] = this.date;
            this.inputNode.value = dojo.date.format(this.date, this.dateFormat);
        }
        this.datePicker = dojo.widget.createWidget("DatePicker", dateProps, dpNode);
        dojo.event.connect(this.datePicker, "onSetDate", this, "onSetDate");
        dojo.event.connect(this.datePicker, "onSetDate", this, "onAfterSetDate");
        this.containerNode.style.zIndex = this.zIndex;
        this.containerNode.style.backgroundColor = "transparent";
    },

	// added by J.Aerts, 2006-10-29
	onInputChange: function(){
			// summary: callback when user manually types a date into the <input> field
			var input = dojo.string.trim(this.inputNode.value);
			var sessionKey = document.getElementById("chibaSessionKey").value;
			Flux.setXFormsValue(updateUI, this.id.substring(0, this.id.length - 6), input,sessionKey);
			/* ALL THE FOLLOWING IS NOT NECESSARY WHEN WE WORK WITH ISO-8601 dates !
				if(input) {
					dojo.debug("input: ", input);
					var textFieldDate = new Date();
					this.currentDate = dojo.date.setIso8601(textFieldDate , input);

					dojo.debug("this.currentDate: " , this.currentDate);
					if(this.currentDate){
						this.date = new Date(this.currentDate);
						// update the date
						var sessionKey = document.getElementById("chibaSessionKey").value;
						Flux.setXFormsValue(updateUI, this.id.substring(0, this.id.length - 6), input,sessionKey);
					// invalid date typed
					} else {
						dojo.debug("INVALID DATE");
						this.inputNode.value = "WRONG";
					}
					//this.setDate(inputDate);
					dojo.debug("new date ", this.date);
				} else {

					this.valueNode.value = input;
				}
			*/
	},



    toggleContainerShow: function() {
        if (dojo.html.isShowing(this.containerNode)) {
            calendarInstance = false;
            this.hideContainer();
        } else {
            if (calendarInstance == true) {
                closedByOnIconClick = true;
                calendarActiveInstance.hideContainer();
                calendarActiveInstance = this;

                // Avoid wrong rendering in repeats, sets opacity to 1
                var target = dojo.byId(this.id.substring(0, this.id.length - 6));
                if (target) {
                    while(_hasClass(target.parentNode, "repeat-item")) {
                        target = target.parentNode;
                    }
                    target.style.opacity = 1;
                }
                this.showContainer();
            }
            else {
                calendarInstance = true;
                clicked = false;
                calendarActiveInstance = this;
                dojo.debug("dojo.byID: " + this.id.substring(0, this.id.length - 6));
                // Avoid wrong rendering in repeats, sets opacity to 1
                var target = dojo.byId(this.id.substring(0, this.id.length - 6));
                if (target) {
                    while(_hasClass(target.parentNode, "repeat-item")) {
                        target = target.parentNode;
                    }
                    target.style.opacity = 1;
                }
                this.showContainer();
            }
        }
    }
    ,
    onAfterSetDate: function(evt) {
        calendarInstance = false;
        closedByOnIconClick = true;
       var newDate = dojo.widget.DatePicker.util.toRfcDate(this.datePicker.date);
	  dojo.debug("newDate from datepicker= ", newDate);
        if (dojo.widget.DatePicker.util.toRfcDate(this.currentDate) != newDate) {
            var sessionKey = document.getElementById("chibaSessionKey").value;
            Flux.setXFormsValue(updateUI, this.id.substring(0, this.id.length - 6), newDate,sessionKey);
        }
    }

    },
    "html"
);