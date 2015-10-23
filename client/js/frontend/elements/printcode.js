/*
* Print Code
*/

;(function ($, window, document, undefined) {
	var pluginName = "printcode";

	// Private methods
	var initializeElement = function (element, elementClass) {
		var text = element.attr("data-print");
		console.log(text);

	};

	var Plugin = function (element, options) {
		this.element = element;
		this.options = {};
		this.init(options);
	};

	Plugin.prototype = {
		init: function (options) {
			$.extend(this.options, options);
			// Initialize
			initializeElement($(this.element), this.options.elementClass);
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

$(".print-code").printcode();