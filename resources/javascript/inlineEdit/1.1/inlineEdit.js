var inlineEdit = new Class({
	options: {
		onComplete: Class.empty, //function(el,oldContent,newContent){}
		type: 'input'
	},
	initialize: function(element,options){
		this.setOptions(options);
		if(!element.innerHTML.toLowerCase().match('<'+this.options.type)){
			this.editting = element;
			this.oldContent = element.innerHTML;
			var content = this.oldContent.trim().replace(new RegExp("<br>", "gi"), "\n");
			this.inputBox = new Element(this.options.type).setProperty('value',content).setStyles('margin:0;background:transparent;width:99.5%;font-size:100%;border:0;');
			if(!this.inputBox.value){this.inputBox.setHTML(content)}
			this.setAllStyles(element,this.inputBox);
			this.editting.setHTML('');
			this.inputBox.injectInside(this.editting);
			(function(){this.inputBox.focus()}.bind(this)).delay(300);
			this.inputBox.addEvent('change',this.onSave.bind(this));
			this.inputBox.addEvent('blur',this.onSave.bind(this));
		}
	},
	onSave: function(){
		this.inputBox.removeEvents();
		this.newContent = this.inputBox.value.trim().replace(new RegExp("\n", "gi"), "<br>");
		this.editting.setHTML(this.newContent);		
		this.fireEvent('onComplete', [this.editting,this.oldContent,this.newContent]);
	},
	setAllStyles: function(prevel,el){
		if(prevel.getStyle('font'))el.setStyle('font', prevel.getStyle('font'));
		if(prevel.getStyle('font-family'))el.setStyle('font-family', prevel.getStyle('font-family'));
		if(prevel.getStyle('font-weight'))el.setStyle('font-weight', prevel.getStyle('font-weight'));
		if(prevel.getStyle('line-height'))el.setStyle('line-height', prevel.getStyle('line-height'));
		if(prevel.getStyle('letter-spacing'))el.setStyle('letter-spacing', prevel.getStyle('letter-spacing'));
		if(prevel.getStyle('color'))el.setStyle('color', prevel.getStyle('color'));
	}
});

Element.extend({
	inlineEdit: function(options) {
		return new inlineEdit(this, options);
	}
});

inlineEdit.implement(new Events);
inlineEdit.implement(new Options);