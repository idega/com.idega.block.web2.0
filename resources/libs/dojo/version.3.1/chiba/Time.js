/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.provide("chiba.Time");

dojo.require("dojo.widget.*");
dojo.require("dojo.event");
dojo.require("dojo.html");
dojo.require("dojo.widget.Spinner");
dojo.require("dojo.widget.validate");

/*
todo:
- support incremental
*/
dojo.widget.defineWidget(
	"chiba.XFTime",
	dojo.widget.HtmlWidget,
	{
		widgetType: "XFTime",
        templatePath: dojo.uri.dojoUri('chiba/templates/HtmlTime.html'),
        templateCssPath:  dojo.uri.dojoUri("chiba/templates/HtmlTime.css"),         

        // parameters
        id: "",
        name: "",
        value:"",
        hoursInputWidget:null,
        minutesInputWidget:null,

        hoursInputNode:null,
        minutesInputNode:null,

        hoursNode:null,
        minutesNode:null,


        postMixInProperties: function(){
            dojo.debug("Hallo");
        },

        fillInTemplate: function(args, frag) {
            var hours = this.value.substring((this.value.indexOf("T")+1),(this.value.indexOf(":")));
            var minutes = this.value.substring((this.value.indexOf(":")+1),(this.value.indexOf(":")+3));
            dojo.debug("WidgetId: " + this.widgetId);
            dojo.debug("Value: " + this.value);
            dojo.debug("hours: " + hours);
            dojo.debug("minutes: " + minutes);

            this.hoursInputNode = document.createElement("span");
            this.hoursNode.appendChild(this.hoursInputNode);
            var datePropsHoursInput = {
                value:hours,
                delta:"01",
                min:"00",
                max:"59",
                seperator:"",
                maxlength:"2",
                widgetId:this.widgetId +"-hours"
            };            
            this.hoursInputWidget = dojo.widget.createWidget("AdjustableIntegerTextBox", datePropsHoursInput, this.hoursInputNode);

            var hoursSpinnerNode = document.createElement("span");
            this.hoursInputNode.appendChild(hoursSpinnerNode);
            var dateProbsHoursSpinner = {inputWidgetId:this.widgetId+"-hours"};
            var hoursSpinnerWidget = dojo.widget.createWidget("Spinner", dateProbsHoursSpinner, hoursSpinnerNode);

            this.minutesInputNode = document.createElement("span");
            this.minutesNode.appendChild(this.minutesInputNode);
            var datePropsMinutesInput = {
                value:minutes,
                delta:"1",
                min:"0",
                max:"59",
                seperator:"!",
                maxlength:"2",
                widgetId:this.widgetId +"-minutes"
            };
            this.minutesInputWidget = dojo.widget.createWidget("AdjustableIntegerTextBox", datePropsMinutesInput, this.minutesInputNode);

            var minutesSpinnerNode = document.createElement("span");
            this.minutesInputNode.appendChild(minutesSpinnerNode);
            var dateProbsMinutesSpinner = {inputWidgetId:this.widgetId+"-minutes"};
            var minutesSpinnerWidget = dojo.widget.createWidget("Spinner", dateProbsMinutesSpinner, minutesSpinnerNode);
        }
    },
    function onclick() {
            dojo.debug("Time.js OnClick()");
        },

    function onInputChange() {
            dojo.debug("Time.js OnInputChange()");
        },

    function onChange() {
            dojo.debug("Time.js onChange()");
        }
);

