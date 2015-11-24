(function() {

	events.factory("Event", ['$resource', function($resource) {
		return $resource("/api/events/:slug");
	}]);

})();