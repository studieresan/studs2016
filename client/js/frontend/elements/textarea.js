/*
* Auto-expanding textarea
*/

;(function ($, window, document, undefined) {
	var pluginName = "textarea";

	// Private methods
	var initializeElement = function (element, options) {
		// Create shadow div
		var shadow = $("<div />", {
			class: "textarea-shadow"
		});
		shadow.width(element.outerWidth());
		$("body").append(shadow);

		// Event handlers
		var data = {shadow: shadow, lineheight: element.css("lineHeight").replace(/[^-\d\.]/g, ''), minheight: element.css("minHeight").replace(/[^-\d\.]/g, '') };
		element.on("keyup keydown", data, updateTextarea);
		element.trigger("keydown");
	};

	var updateTextarea = function (e) {
		var shadow = e.data.shadow;
		console.log(e.type);
		var textarea = $(e.target);
		var content = textarea.val();
		var keycode = (e.keyCode ? e.keyCode : e.which);
		
		// Add on enter to prevent flicker.
		if(keycode == '13' && e.type == "keydown") {
			var currentHeight = parseInt(textarea.height());
			var potentialHeight = parseInt(textarea.height()) + parseInt(e.data.lineheight);
			// Prevent flicker when min-height is set.
			if(potentialHeight > parseInt(e.data.minheight)) {
				return;
			}
			textarea.height(parseInt(textarea.height()) + parseInt(e.data.lineheight));
			return;
		}
		content += "."; // Fix for whitespace trim.
		shadow.html(content);
		textarea.height(shadow.height());
	}

	var Plugin = function (element, options) {
		this.element = element;
		this.options = {};
		this.init(options);
	};

	Plugin.prototype = {
		init: function (options) {
			$.extend(this.options, options);
			// Initialize
			initializeElement($(this.element), this.options);
		},
		// Public methods
		public: function () {}
	};
	// A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
    	return this.each(function () {
    		if (!$.data(this, pluginName)) {
    			$.data(this, pluginName, 
    				new Plugin( this, options ));
    		}
    	});
    }
}(jQuery, window, document));

$(".expandable").textarea();