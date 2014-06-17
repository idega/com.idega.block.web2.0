(function($) {
	$.datepicker.regional['is'] = {
		timeOnlyTitle: 'Veldu tíma',
		timeText: 'Tími',
		hourText: 'Klukkustund',
		minuteText: 'Mínúta',
		secondText: 'Sekúnda',
		millisecText: 'Millisekúndu',
		microsecText: 'Microsecond',
		timezoneText: 'Tími svæði',
		timeFormat: 'hh:mm',
		amNames: ['fyrir hádegi', 'AM', 'A'],
		pmNames: ['í hádegi', 'PM', 'P'],
		closeText: 'Loka',
		prevText: '&#x3c; Fyrri',
		nextText: 'N&aelig;sti &#x3e;',
		currentText: '&Iacute; dag',
		monthNames: ['Jan&uacute;ar','Febr&uacute;ar','Mars','Apr&iacute;l','Ma&iacute','J&uacute;n&iacute;',
		'J&uacute;l&iacute;','&Aacute;g&uacute;st','September','Okt&oacute;ber','N&oacute;vember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Ma&iacute;','J&uacute;n',
		'J&uacute;l','&Aacute;g&uacute;','Sep','Okt','N&oacute;v','Des'],
		dayNames: ['Sunnudagur','M&aacute;nudagur','&THORN;ri&eth;judagur','Mi&eth;vikudagur','Fimmtudagur','F&ouml;studagur','Laugardagur'],
		dayNamesShort: ['Sun','M&aacute;n','&THORN;ri','Mi&eth;','Fim','F&ouml;s','Lau'],
		dayNamesMin: ['Su','M&aacute;','&THORN;r','Mi','Fi','F&ouml;','La'],
		weekHeader: 'Vika',
		dateFormat: 'd.m.yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.timepicker.setDefaults($.timepicker.regional['is']);
})(jQuery);