if (LinksLinker == null) var LinksLinker = {};

LinksLinker.linkers = [
	{linker: ['pdf'], css: 'PDF'},
	{linker: ['doc'], css: 'DOC'},
	{linker: ['txt'], css: 'TXT'},
	{linker: ['xls'], css: 'XLS'},
	{linker: ['ppt'], css: 'PPT'},
	{linker: ['jpg', 'jpeg', 'png', 'gif'], css: 'Image'},
	{linker: [], css: 'UnkownFileLinker'}	//	Keep it last always!
];

LinksLinker.linkLinks = function(addStyleForNonFileLinks, containerId) {
	if (addStyleForNonFileLinks) {
		LinksLinker.linkers.push({linker: ['http://'], css: 'ExternalLink'});
		LinksLinker.linkers.push({linker: ['mailto:'], css: 'Mail'});
	}
	
	var links = containerId == null ? jQuery('a') : jQuery('a', jQuery('#' + containerId));
	if (links == null || links.length == 0) {
		return;
	}
	
	jQuery.each(links, function() {
		var tag = jQuery(this);
		
		if (!tag.hasClass('linkedWithLinker')) {
			var addedLinker = false;
			for (var i = 0; (i < LinksLinker.linkers.length && !addedLinker); i++) {
				addedLinker = LinksLinker.linkTag(tag, LinksLinker.linkers[i]);
			}
			
			if (!addedLinker && containerId != null) {
				tag.addClass(LinksLinker.linkers[LinksLinker.linkers.length - 1].css);
				tag.addClass('linkedWithLinker');
			}
		}
	});
	
}

LinksLinker.linkTag = function(tag, link) {
	var checker = null;
	for (var i = 0; i < link.linker.length; i++) {
		checker = '.' + link.linker[i];
		if (tag.attr('rel').toLowerCase().indexOf(checker) != -1 || tag.attr('href').toLowerCase().indexOf(checker) != -1) {
			tag.addClass(link.css);
			tag.addClass('linkedWithLinker');
			return true;
		}
	}
	
	return false;
}