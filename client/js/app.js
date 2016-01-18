var instagram = angular.module('instagram', ['instagramControllers']);

var events = angular.module('events', ['ngResource', 'ngRoute', 'eventControllers', 'instagram']);

var resumes = angular.module('resumes', ['ngResource', 'ngRoute', 'resumeControllers', 'flash','angular.filter', 'pikaday']);

var auth = angular.module('auth', ['ngRoute', 'authControllers', 'flash', 'ngAnimate', 'instagram']);

var trip = angular.module('trip', ['tripControllers', 'uiGmapgoogle-maps', 'instagram']).config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		libraries: 'geometry,visualization'
	});
}]);


var index = angular.module('index', ['indexControllers', 'instagram']);

var about = angular.module('about', ['aboutControllers', 'instagram']);

var companyProfile = angular.module('companyProfile', ['ngResource', 'companyProfileControllers', 'flash', 'ngAnimate', 'chart.js', 'angular-jqcloud']);

var studentProfile = angular.module('studentProfile', ['ngResource', 'studentProfileControllers', 'adminControllers', 'flash', 'pikaday']);

