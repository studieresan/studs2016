(function() {

	var eventControllers = angular.module('eventControllers', []);

	eventControllers.controller("singleEventCtrl", ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		this.event = {};
		var eventItem = this;

		$http.get('/api/events/' + $routeParams.slug).success(function(data) {
			eventItem.event = data;
		});
	}]);

	eventControllers.controller("listEventCtrl", ['$http', '$routeParams', function($http, $routeParams) {
		this.events = [];
		var eventsCtrl = this;
		$http.get('/api/events').success(function(data) {
			eventsCtrl.events = data;
		});
	}]);

})();
