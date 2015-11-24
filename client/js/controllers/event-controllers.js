(function() {

	var eventControllers = angular.module('eventControllers', []);

	eventControllers.controller("singleEventCtrl", ['$scope', 'Event', '$routeParams', function($scope, Event, $routeParams) {
		Event.get({ slug: $routeParams.slug }, function(data) {
			$scope.eventItem = data;
		});
	}]);

	eventControllers.controller("listEventCtrl", ['$scope', 'Event', '$routeParams', function($scope, Event, $routeParams) {
		Event.query(function(data) {
			$scope.events = data;
		});
	}]);

})();
