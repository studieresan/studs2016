/*
* Nice checkboxes
*/

;(function ($, window, document, undefined) {
	var pluginName = "radiocheck";

	// Private methods
	var initializeElement = function (element, elementClass) {
		// Are there existing classes?
		var existingClasses = (element.attr("class") == undefined) ? "" : element.attr("class") + " ";
		var shadow = $("<div />", {
			class: existingClasses + elementClass
		});
		if(element.prop("disabled") == true) {
			shadow.addClass("disabled");
		}
		// Add to DOM
		element.before(shadow);

		// Event data
		data = { element: element, shadow: shadow };

		// Bind data
		$.data(element[0],"shadow", shadow);

		// Event handlers
		element.on("change", data, change);
		element.on("focusin", data, focusIn);
		element.on("focusout", data, focusOut);
		shadow.on("click", data, click);

		// If radio => we need to sync on change (uncheck doesnt trigger change)
		if(element.is("input[type=radio]")) {
			element.bind("select", data, select);
		}
		// Trigger change to get correct initial values
		element.trigger("change");
	};

	/*
	*	On given checkbox/radio, check if the shadow should be checked or not
	*/
	var select = function (e) {
		var element = $(e.target);
		var target = e.data.shadow;
		if(element.is(':checked')) {
			target.addClass("checked");
		} else {
			target.removeClass("not checked");
		}
	};

	/*
	*	On focusIn
	*/
	var focusIn = function (e) {
		e.preventDefault();
		e.data.shadow.addClass("focused");
	};

	/*
	*	On focusOut
	*/
	var focusOut = function (e) {
		e.preventDefault();
		e.data.shadow.removeClass("focused");
	};

	/*
	*	On change, check if shadow should be checked
	*/
	var change = function (e) {
		select(e);

		// If radio, we need to sync all elements in the radio group
		var element = $(e.target);
		if(element.is("input[type=radio]")) {
			$("input[name=" + element.attr("name") + "]").not(element).trigger("select");
		}
	};

	/*
	*	Click handler for on shadow click
	*/
	var click = function (e) {
		var target = e.data.element;
		if(!target.is(":disabled")) {
			// To mimic the default behaviour of a radio button
			if(target.is("input[type=radio]")) {
				target.prop("checked", true);
			} else {
				target.prop("checked", !target.prop("checked"));
			}
			target.trigger("change");
			target.focus();
		}
	};

	var Plugin = function (element, options) {
		this.element = element;
		this.options = {
			elementClass: "radiocheck"
		};
		this.init(options);
	};

	Plugin.prototype = {
		init: function (options) {
			$.extend(this.options, options);
			// Initialize
			initializeElement($(this.element), this.options.elementClass);
		},
		// Public methods
		toggleDisabled: function () {
			var element = $(this.element);
			var shadow = $.data(this.element, shadow).shadow;
			if(element.prop("disabled")) {
				element.prop("disabled", false);
				shadow.removeClass("disabled");
			} else {
				element.prop("disabled", true);
				shadow.addClass("disabled");
			}
		}
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

$(".radio").radiocheck({
	elementClass: "radio"
});
$(".check").radiocheck({
	elementClass: "checkbox"
});

$(".slide").radiocheck({
	elementClass: "slide"
});

// Example of toggleDisabled
$("#click-test").click(function () {
	$("#check-5").data('radiocheck').toggleDisabled();
});