(function() {

	var aboutControllers = angular.module('aboutControllers', []);

	aboutControllers.controller("listStudents", ['$scope', '$http', function($scope, $http) {
		$scope.studentList = [];
		$http.get('/api/students').success(function(data) {
			$scope.studentList = data;
		});
	}]);

})();