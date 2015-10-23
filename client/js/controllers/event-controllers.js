(function() {

	var eventControllers = angular.module('eventControllers', []);

	eventControllers.controller("singleEventCtrl", ['$http', '$routeParams', function($http, $routeParams) {
		this.event = null;
		var eventsCtrl = this;

		$http.get('/api/events/', {slug: $routeParams.slug }).success(function(data) {
			console.log(data);
			eventsCtrl.event = data;
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