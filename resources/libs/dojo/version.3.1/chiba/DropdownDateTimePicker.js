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
    dateFormat: "%m/%d/%Y",
    containerToggle:"wipe",
    localDate:null,
    opacity:null,
    currentDate:null,
        timeSelected:null,
        xfTimeWidget:null,
        templateString: '<div><input type="hidden" id="${this.id}" name="${this.name}" value="${this.value}" dojoAttachPoint="xformsValue"><span style="white-space:nowrap"> <input type="text" widgetId="${this.id}-date" class="inputDateSelected" value="" style="vertical-align:middle;" dojoAttachPoint="inputNode" autocomplete="off" /> <img src="${this.iconURL}" alt="${this.iconAlt}" dojoAttachPoint="buttonNode" dojoAttachEvent="onclick: onIconClick;" style="vertical-align:middle; cursor:pointer; cursor:hand;" /><span widgetId="${this.id}-time" value="" class="inputTimeSelected" style="vertical-align:middle;" dojoAttachPoint="timeSelected" dojoAttachEvent="onchange:onMyChange" autocomplete="off" /></span><br /><div dojoAttachPoint="containerNode" style="display:none;position:absolute;width:12em;background-color:#fff;"></div></div>',

    fillInTemplate: function(args, frag) {
        var jsDate = new Date();
//        dojo.debug("DateTime: " +"jsDate: "+jsDate);
//        dojo.debug("DateTime: " +"this.value: "+this.value);

        this.localDate = this.value.substring(0,this.value.indexOf("T"));

//        dojo.debug("DateTime: this.localDate: " + this.localDate )
        this.currentDate = dojo.date.setIso8601(jsDate, this.localDate);
//        dojo.debug("DateTime: " +"currentDate: "+this.currentDate);


        args.date = this.currentDate;
        dojo.widget.DropdownDatePicker.superclass.fillInTemplate.call(this, args, frag);
        var source = this.getFragNodeRef(frag);
        if (args.date) {
            this.date = new Date(args.date);
//            dojo.debug("DateTime: " +"this.date: " + this.date);
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
            dojo.event.connect(this.datePicker, "onSetDate", this, "onAfterSetDateTime");


            var timePicker = document.createElement("span");
            this.timeSelected.appendChild(timePicker);
            dojo.debug(this.widgetId);
            var timeProbs = {
                widgetId:this.widgetId + "-xftime",
                value:this.value
            };
            this.xfTimeWidget = dojo.widget.createWidget("XFTime", timeProbs, timePicker);

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
                var target = dojo.byId(this.id.substring(0, this.id.length - 6));
                if (target) {
                    if (_hasClass(target, "repeated")) {
                        while (target && ! _hasClass(target, "repeat-item")) {
                            target = target.parentNode;
                        }
                        target.style.opacity = null;
                    }
                }
                this.showContainer();
            }
            else {
                calendarInstance = true;
                clicked = false;
                calendarActiveInstance = this;
                var target = dojo.byId(this.id.substring(0, this.id.length - 6));
                if (target) {
                    if (_hasClass(target, "repeated")) {
                        while (target && ! _hasClass(target, "repeat-item")) {
                            target = target.parentNode;
                        }
                        target.style.opacity = null;
                    }
                }
                this.showContainer();
            }
        }
    },
      onInputChange: function(){
       dojo.debug("onInputChange");
       var tmp = new Date(this.inputNode.value);
       this.datePicker.date = tmp;
       this.datePicker.setDate(dojo.widget.DatePicker.util.toRfcDate(tmp));
       this.datePicker.initData();
       this.datePicker.initUI();
      }
    ,
    onMyChange:function() {
      dojo.debug("onMyChange");
    },
    onAfterSetDate: function(evt) {
        calendarInstance = false;
        closedByOnIconClick = true;
        dojo.debug("DateTime: " +"onAfterSetDate");

        var newDate = dojo.widget.DatePicker.util.toRfcDate(this.datePicker.date);
        dojo.debug("DateTime: " +"onAfterSetDate");
        if (dojo.widget.DatePicker.util.toRfcDate(this.currentDate) != newDate) {
                dojo.debug("DateTime: " +"onAfterSetDate: dif. date " + newDate);
                dojo.debug("");
                var sessionKey = document.getElementById("chibaSessionKey").value;
                Flux.setXFormsValue(updateUI, this.id.substring(0, this.id.length - 6), newDate,sessionKey);
        }
    }

    },
    "html"
);
