dojo.provide("chiba.DropdownDateTimePicker");
dojo.require("dojo.date");
dojo.require("dojo.widget.DatePicker");
dojo.require("chiba.Time");
dojo.require("dojo.widget.Spinner");
dojo.require("dojo.widget.validate");
dojo.widget.defineWidget(
        "chiba.XFDropdownDateTimePicker",
        dojo.widget.DropdownDatePicker,
{
    widgetType: "XFDropdownDateTimePicker",
    iconAlt: "Select a Date",
    zIndex: 1000,
    id:"",
    value:"",
    name:"",
    type:"",
//dateFormat: "%m/%d/%Y",
    dateFormat: "%Y-%m-%d",
    containerToggle:"wipe",
    localDate:null,
    opacity:null,
    currentDate:null,
    timeSelected:null,
    xfTimeWidget:null,
    templateString: '<div class="value"><input type="hidden" id="${this.id}" name="${this.name}" value="${this.value}" dojoAttachPoint="xformsValue"><span style="white-space:nowrap"> <input type="text" widgetId="${this.id}-date" class="inputDateSelected" value="" style="vertical-align:middle;" dojoAttachPoint="inputNode" autocomplete="off" /> <img src="${this.iconURL}" alt="${this.iconAlt}" dojoAttachPoint="buttonNode" dojoAttachEvent="onclick: onIconClick;" style="vertical-align:middle; cursor:pointer; cursor:hand;" /><span widgetId="${this.id}-time" value="" class="inputTimeSelected" style="vertical-align:middle;" dojoAttachPoint="timeSelected" dojoAttachEvent="onchange:onMyChange" autocomplete="off" /></span><br /><div dojoAttachPoint="containerNode" style="display:none;position:absolute;width:12em;background-color:#fff;"></div></div>',

    fillInTemplate: function(args, frag) {
        var jsDate = new Date();
        args.date = this.currentDate;
        // J.Aerts
        dojo.debug("DateTime: " + "jsDate: " + jsDate);
        dojo.debug("DateTime: " + "this.value: " + this.value);
        this.localDate = this.value.substring(0, this.value.indexOf("T"));

        dojo.debug("DateTime: this.localDate: " + this.localDate)
        this.currentDate = dojo.date.setIso8601(jsDate, this.localDate);
        //        dojo.debug("DateTime: " +"currentDate: "+this.currentDate);


        args.date = this.currentDate;
        dojo.widget.DropdownDatePicker.superclass.fillInTemplate.call(this, args, frag);
        var source = this.getFragNodeRef(frag);
        if (args.date) {
            this.date = new Date(args.date);
            dojo.debug("DateTime: " + "this.date: " + this.date);
        }
        var dpNode = document.createElement("div");
        this.containerNode.appendChild(dpNode);
        var dateProps = {
            widgetContainerId: this.widgetId,
            value:this.value,
            timeSelected:this.timeSelected
        };
        if (this.date) {
            dateProps["date"] = this.date;
            this.inputNode.value = dojo.date.format(this.date, this.dateFormat);
            this.timeSelected.value = this.value.substring(11, 19);
        }


        this.datePicker = dojo.widget.createWidget("DatePicker", dateProps, dpNode);
        dojo.event.connect(this.datePicker, "onSetDate", this, "onSetDate");
        //dojo.event.connect(this.datePicker, "onSetDate", this, "onAfterSetDateTime");
        dojo.event.connect(this.datePicker, "onSetDate", this, "update");
        // 15.11.2006 J.Aerts
        // create a time picker
        var timePicker = document.createElement("span");
        this.timeSelected.appendChild(timePicker);
        //dojo.debug(this.widgetId);
        var timeProbs = {
            widgetId:this.widgetId + "-xftime",
            value:this.value
        };
        this.xfTimeWidget = dojo.widget.createWidget("XFTime", timeProbs, timePicker);
        //dojo.event.connect(this.xfTimeWidget , "onBlur", this, "update");
        //dojo.event.connect(this.xfTimeWidget , "onChange", this, "update");
        // we need to keep track of any changes in the time widget on all occasions (events)
        // not covered (yet): user does not use the mouse at all and does everything using the tab
        dojo.event.connect(this.xfTimeWidget.hoursNode, "onmouseout", this, "update");
        // as onblur does not seem to work !
        dojo.event.connect(this.xfTimeWidget.hoursNode, "onchange", this, "update");
        dojo.event.connect(this.xfTimeWidget.hoursNode, "onblur", this, "update");
        dojo.event.connect(this.xfTimeWidget.hoursNode, "onclick", this, "update");
        dojo.event.connect(this.xfTimeWidget.hoursNode, "onInputChange", this, "update");
        dojo.event.connect(this.xfTimeWidget.minutesNode, "onmouseout", this, "update");
        // as onblur does not seem to work !
        dojo.event.connect(this.xfTimeWidget.minutesNode, "onchange", this, "update");
        dojo.event.connect(this.xfTimeWidget.minutesNode, "onblur", this, "update");
        dojo.event.connect(this.xfTimeWidget.minutesNode, "onclick", this, "update");
        dojo.event.connect(this.xfTimeWidget.minutesNode, "onInputChange", this, "update");
        dojo.event.connect(this.xfTimeWidget.secondsNode, "onmouseout", this, "update");
        dojo.event.connect(this.xfTimeWidget.secondsNode, "onchange", this, "update");
        dojo.event.connect(this.xfTimeWidget.secondsNode, "onblur", this, "update");
        dojo.event.connect(this.xfTimeWidget.secondsNode, "onclick", this, "update");
        dojo.event.connect(this.xfTimeWidget.secondsNode, "onInputChange", this, "update");

        this.containerNode.style.zIndex = this.zIndex;
        this.containerNode.style.backgroundColor = "transparent";
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
    },




// action when the user typed the date in the date text field
    onInputChange: function() {
        dojo.debug("onInputChange");
        dojo.debug("this.inputNode.value = " + this.inputNode.value);
        //var tmp = new Date(this.inputNode.value);
        // TRY to read the date from the text field and pass it to the DatePicker
        // The calendar requires us (does it ?) to pass the date as yyyy/mm/dd
        var tmp = this.inputNode.value;
        tmp = tmp.replace(/-/, "/");
        tmp = tmp.replace(/-/, "/");
        // also replace the second slash
        //dojo.debug("date after replace = " + tmp);
        //this.datePicker.date = tmp;
        //dojo.debug("tmp = " + tmp);
        // following lines to be looked after later ... J.Aerts
        //this.datePicker.setDate(dojo.widget.DatePicker.util.toRfcDate(tmp));
        //dojo.debug("date set to datePicker");
        //this.datePicker.initData();
        //dojo.debug("datePicker.initData done");
        //this.datePicker.initUI();
        //dojo.debug("datePicker.initUI done");
        // update the dateTime value - J.Aerts
        var sessionKey = document.getElementById("chibaSessionKey").value;
        var input = dojo.string.trim(this.inputNode.value);
        dojo.debug("input = " + input);
        //dojo.debug("timePicker = " + timePicker);
        //dojo.debug("timePicker.time = " + timePicker.time);
        var mytime = this.xfTimeWidget.timevalue ;
        //dojo.debug("time = " + mytime);
        // add the time to the date
        input = input + "T" + mytime;
        dojo.debug("setXFormsValue with value = " + input);
        Flux.setXFormsValue(updateUI, this.id.substring(0, this.id.length - 6), input, sessionKey);
    },

    onBlur: function() {
        dojo.debug("onBlur");
    },

    onMyChange:function() {
        dojo.debug("onMyChange");
    },

    onMouseout: function() {
        dojo.debug("onMouseout");
    },

    update: function(evt) {
        //dojo.debug("DateTime: " + "update");
        calendarInstance = false;
        closedByOnIconClick = true;
        // get the new date and time
        //var newDate = dojo.widget.DatePicker.util.toRfcDate(this.datePicker.date);  // do not trust on the calendar
        var newDate = this.inputNode.value;
        // but trust on the input field
        //if (dojo.widget.DatePicker.util.toRfcDate(this.currentDate) != newDate) {
        // add the time to the dateTime
        var mytime = this.xfTimeWidget.timevalue ;
        newDate = newDate + "T" + mytime;
        //dojo.debug("DateTime: " + " onAfterSetDate: dif. date " + newDate);
        var sessionKey = document.getElementById("chibaSessionKey").value;
        Flux.setXFormsValue(updateUI, this.id.substring(0, this.id.length - 6), newDate, sessionKey);
        //}
    }

},
        "html"
        );