/*
* Nice selects
*/

;(function ($, window, document, undefined) {
	var pluginName = "dropdown";

	// Private methods
	var initializeElement = function (element, options) {

		// IDs and classes
		var id = element.attr("id");
		var existingClasses = (element.attr("class") === undefined) ? "" : element.attr("class") + " ";

		// Create the button
		var button = $("<button />", {
			class: existingClasses + options.elementClass
		});
		button.html(element.children("option:selected").text());
		// Add after the select element
		element.after(button);

		// Create the list
		var list = $("<ul />", {
			class: options.listClass,
			"data-select": "#" + id
		});

		// We now have all elements. This variable is sent with the events
		var data = { element: element, list: list, button: button, offset: options.offset, options: options };

		// Shadow all the select element options in the new list
		element.children("option").each(function() {
			var e = $(this);
			var dropdownOption = $("<li />", {
				"value": e.val()
			});
			dropdownOption.text(e.text());
			dropdownOption.on("mousedown", data, ignoreFocusout);
			dropdownOption.on("mouseup", data, optionClick);
			list.append(dropdownOption);
		});
		$("body").append(list);

		// Event handlers
		button.on("focusout", data, close);
		button.on("click", data, buttonToggle);
		element.on("change", data, change);
		element.on("focus", data, forwardFocus);

		// Keypress
		button.on('keydown', data, keyMove);

		$(window).on("resize", data, close);
		// For niceScroll and regular scroll
		$(".scrollable, body").on("scroll", data, close);

		// Populate
		element.trigger("change");
	};

	/*
	*	On keypress, move in the dropdown.
	*/
	var keyMove = function (e) {
		var key = e.keyCode;
		var currentOption = e.data.list.children(".selected");
		switch (e.keyCode) {
			case 13:
				// Enter
				e.preventDefault();
				if(e.data.button.hasClass("open")) {
					close(e);
				} else {
					open(e);
				}
				break;
				case 38:
				// Up
				e.preventDefault();
				currentOption.prev().trigger("mouseup");
				break;
				case 40:
				e.preventDefault();
				currentOption.next().trigger("mouseup");
				break;
				default:
				break;
			}
		};

	/*
	*	On change, check update shadow
	*/
	var forwardFocus = function (e) {
		var select = e.data.button;
		select.focus();
	};

	/*
	*	On change, check update shadow
	*/
	var change = function (e) {
		var select = $(e.target);
		var id = select.attr("id");
		var button = e.data.button;
		button.text(select.children("option[value=" + select.val() + "]").text());

		var list = e.data.list;
		// Remove all selected classes
		list.children("li").removeClass("selected");
		// Add selected to selected value
		list.children("li[value=" + select.val() + "]").addClass("selected");
		e.data.options.onChange();
	};


	/*
	*	On close
	*/
	var close = function (e) {
		e.data.list.offset({top: -9999, left: -9999});
		e.data.button.removeClass("open");
	};
	/*
	* Tesing not using it.
	var closeDelayed = function (e) {
		console.log("focusout");
		// delay because otherwise focusout event renders click event moot
		setTimeout(function() {
			close(e);
		}, 200);
	};
	*/

	/*
	* Open or close list on button click
	*/
	var buttonToggle = function (e) {
		e.preventDefault();
		var button = $(e.target);
		if(button.hasClass("open")) {
			close(e);
		} else {
			open(e);
		}
	};

	/*
	*	Click handler for on shadow click
	*/
	var open = function (e) {
		e.preventDefault();
		var element = $(e.target);
		element.addClass("open");
		e.data.list.removeClass("placed-top");
		var elementHeight = element.outerHeight();
		var elementWidth = element.outerWidth();
		var offset = element.offset();
		offset.top += elementHeight + e.data.offset;
		e.data.list.width(elementWidth);
		e.data.list.offset(offset);

		// Reposition if overflown
		if(checkOverflow(e.data.list)) {
			var listHeight = e.data.list.outerHeight();
			offset.top -= (elementHeight + listHeight + 2*e.data.offset);
			e.data.list.offset(offset);
			e.data.list.addClass("placed-top");
		}
	};

	/*
	*	Prevent list from closing before option is chosen event is done
	*/
	var ignoreFocusout = function (e) {
		e.data.button.off("focusout");
		e.data.button.focus();
	};

	/*
	*	Click handler for on shadow click
	*/
	var optionClick = function (e) {
		var option = $(e.target);
		var select = e.data.element;
		select.val(option.attr("value"));
		// If originalEvent is undefined, we have a keydown event => do not close
		if(e.originalEvent !== undefined) {
			close(e);
		}
		select.trigger("change");


		// Reset focusout event when option is chosen
		e.data.button.on("focusout", e.data, close);

		// Focus on the button again
		var button = e.data.button;
		button.focus();
	};

	var checkOverflow = function(element) {
		var offset = element.offset();
		var win = $(window);
		var elemBottom = (offset.top + element.outerHeight());
		var winBottom = (win.scrollTop() + win.outerHeight());
		return elemBottom > winBottom;
	};

	var Plugin = function (element, options) {
		this.element = element;
		this.options = {
			elementClass: "dropdown",
			listClass: "dropdown-list",
			offset: 0,
			onChange: function(){}
		};
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
    };
}(jQuery, window, document));

$("select:not([ui-select])").dropdown({ offset: 5 });