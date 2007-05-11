// load the gradient background if provided
if (typeof widget.args != 'undefined') {
    if (typeof widget.args.gradient != 'undefined' && widget.args.gradient == 'aqua') {
        jmaki.replaceStyleClass(widget.uuid, 'AccordionPanelTab', 'AquaAccordionTab');
    } else  if (typeof widget.args.gradient != 'undefined' && widget.args.gradient == 'blue') {
        jmaki.replaceStyleClass(widget.uuid, 'AccordionPanelTab', 'BlueAccordionTab');
    } else  if (typeof widget.args.gradient != 'undefined' && widget.args.gradient == 'green') {
        jmaki.replaceStyleClass(widget.uuid, 'AccordionPanelTab', 'GreenAccordionTab');
    } else  if (typeof widget.args.gradient != 'undefined' && widget.args.gradient == 'gray') {
        jmaki.replaceStyleClass(widget.uuid, 'AccordionPanelTab', 'GrayAccordionTab');
    }
}
var acc1 = new Spry.Widget.Accordion(widget.uuid);
// after we have loaded now set the content pane sytle
jmaki.replaceStyleClass(widget.uuid, 'AccordionPanelContentPre', 'AccordionPanelContent');
jmaki.attributes.put(widget.uuid, acc1);