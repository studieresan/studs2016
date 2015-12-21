var events = angular.module('events', ['ngResource', 'ngRoute', 'eventControllers']);

var resumes = angular.module('resumes', ['ngResource', 'ngRoute', 'resumeControllers', 'flash','angular.filter', 'pikaday']);

var auth = angular.module('auth', ['ngRoute', 'authControllers', 'flash', 'ngAnimate']);

var trip = angular.module('trip', ['tripControllers', 'uiGmapgoogle-maps']).config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		libraries: 'geometry,visualization'
	});
}]);

var index = angular.module('index', ['indexControllers']);

var about = angular.module('about', ['aboutControllers']);

var companyProfile = angular.module('companyProfile', ['ngResource', 'companyProfileControllers', 'flash', 'ngAnimate', 'chart.js', 'angular-jqcloud']);

var studentProfile = angular.module('studentProfile', ['ngResource', 'studentProfileControllers', 'adminControllers', 'flash']);

