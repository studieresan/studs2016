var events = angular.module('events', ['ngResource', 'ngRoute', 'eventControllers']);

var resumes = angular.module('resumes', ['ngResource', 'ngRoute', 'resumeControllers']);

var auth = angular.module('auth', ['ngRoute', 'authControllers', 'flash', 'ngAnimate']);

var trip = angular.module('trip', ['tripControllers', 'uiGmapgoogle-maps']).config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		libraries: 'geometry,visualization'
	});
}]);

var about = angular.module('about', ['aboutControllers']);

var profile = angular.module('profile', ['profileControllers', 'flash', 'ngAnimate', 'chart.js', 'angular-jqcloud']);

