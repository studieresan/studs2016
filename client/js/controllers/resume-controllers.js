(function() {

	var resumeControllers = angular.module('resumeControllers', []);

	resumeControllers.controller("ResumeCtrl", ['$scope', 'Resume', '$routeParams', function($scope, Resume, $routeParams) {
		Resume.get({ student: 'mine' }, function(data) {
			$scope.Resume = data;
		});
	}]);

})();
