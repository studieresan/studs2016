(function() {

	var eventControllers = angular.module('eventControllers', []);

	eventControllers.controller("singleEventCtrl", ['$http', '$routeParams', function($http, $routeParams) {
		this.event_item = {};
		var eventItem = this;

		$http.get('/api/events/' + $routeParams.slug).success(function(data) {
			eventItem.event = data;
			console.log(eventItem);
		});
	}]);

	eventControllers.controller("listEventCtrl", ['$http', '$routeParams', function($http, $routeParams) {
		this.events = [];
		var eventsCtrl = this;
		$http.get('/api/events').success(function(data) {
			eventsCtrl.events = data;
		});

		this.test = function(data) {
			console.log(data);
		};
	}]);

})();