

jQuery(document).ready(function () {
	if(jQuery('.passslot-pass .passslot-value[data-valuetype="datetime"]').length > 0) {
		if(PassSlotViewerUtilTimeZoneRedirect()) {
			return;
		}
	}

	var loader = jQuery('.pass-loader')
	var pass = jQuery('.pass-body');
	var showPreview = function() {
				loader.hide();
		pass.show();
		PassSlotViewerResizeFields(pass);
	}

	var finishLoader = function() {
		loader.find("i.fa-icon-spinner").hide();
		loader.find(".pass-loader-show-preview").show();
	}

	var showSuccess = function() {
		jQuery('.pass-success').show();
		loader.hide();
		pass.hide();
	}

	var showOpenPass = function(url) {
		var link = jQuery('.pass-success .pass-openurl');
		link.attr('href', url);
		link.click(function() {
			window.location.href = url;
			return false;
		});
		link.show();
	}

	loader.find("a[href=#showPreview]").click(function() {
		showPreview();
		jQuery('a[href=#download]').tab('show');
		return false;
	});


		setTimeout(function() {
		finishLoader();
	}, 10000);

	jQuery("a[href=#startPrint]").click(function() {
		showPreview();
		window.print();
		return false;
	});

		try {
		channel = new goog.appengine.Channel('AHRlWrrCYL-dlt_EYv8waDio5J0yTt5tG4kpD5pIkcO3OE_iBW9nJsiU_jOBrKriHU18_vy6j_Cugy7zmAR7M_OoSfsL8vRSJ8x8terPSIjgCP9kDH2josdKSzP6kwjVxNF7xHTyajiq');
		socket = channel.open();
		socket.onopen = function() {
			console.log("connected");
		};

		socket.onmessage = function(message) {
			showSuccess();
			var data = jQuery.parseJSON(message.data);
			if(data.event == "registered" && data.openURL) {
				showOpenPass(data.openURL);
			}
		};
		socket.onerror = function(error) {
			console.log(error);
		};
		socket.onclose = function() {
			console.log("disconnected");
		};
	} catch(e) {
		console.log(e);
	}



});


var interval = 100;
var timeout = 3000;
var retries = timeout / interval;

function checkDownload() {

	if (document.cookie.indexOf("4yyf0k7p2V=1") != -1) {
    	return;
    }

	if(--retries <= 0) {
		window.location.href = "https://pass.center/d/p/i2J2Bx-STBatmX6wy-4LZA.pkpass?t=2Nz9lwU";
		return;
	}

	setTimeout(checkDownload, interval);
}
setTimeout(checkDownload, interval);
