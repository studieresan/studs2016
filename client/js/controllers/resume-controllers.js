(function() {

	var resumeControllers = angular.module('resumeControllers', []);

	resumeControllers.controller("ResumeCtrl", ['$scope', 'Resume', '$routeParams', 'Flash', function($scope, Resume, $routeParams, Flash) {
		Resume.get({ student: 'mine' }, function(data) {
			console.log(data);
			$scope.Resume = data;
		});

		$scope.update = function (data) {
			console.log(data);
			Resume.update({ student: 'mine' }, data, function(res) {
				console.log(res);
			});

		};
	}]);

})();
