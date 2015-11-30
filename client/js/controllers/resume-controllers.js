(function() {

	var resumeControllers = angular.module('resumeControllers', []);

	resumeControllers.controller("ResumeCtrl", ['$scope', 'Resume', '$routeParams', function($scope, Resume, $routeParams) {
		Resume.get({ userid: 'mine' }, function(data) {
			$scope.Resume = data;
		});
	}]);

})();
