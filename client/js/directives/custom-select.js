(function() {
	
	// Add the attribute ui-select to the element
	// TODO: Create global app module
	events.directive('uiSelect', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
            	// Wait until data is loaded to enable the plugin
            	$timeout(function () {
            		var config = scope.$eval(attrs.uiConfig);
            		if (config === undefined) { config = {}; }
            		config.onChange = function () {
            			// Convert to angular element and trigger change
            			angular.element(element).triggerHandler('change');
            		};
            		$(element).dropdown(config);
            	});
            }
        };
    }]);

})();