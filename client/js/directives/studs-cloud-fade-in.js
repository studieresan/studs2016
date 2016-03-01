(function() {

	companyProfile.directive('studsCloud', ['$timeout', '$window', function ($timeout, $window) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$timeout(function () {
					$(window).trigger("resize");
				});
				$timeout(function () {
					$(window).trigger("resize");
					element.addClass("done");
				}, 3000);
			}
		};
	}]);
})();
