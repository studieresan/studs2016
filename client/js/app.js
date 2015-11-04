var events = angular.module('events', ['ngRoute', 'eventControllers']);

var auth = angular.module('auth', ['ngRoute', 'authControllers']);

var trip = angular.module('trip', ['tripControllers', 'uiGmapgoogle-maps']).config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		libraries: 'geometry,visualization'
	});
}]);