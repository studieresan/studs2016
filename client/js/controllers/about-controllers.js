(function() {

	var aboutControllers = angular.module('aboutControllers', []);

	aboutControllers.controller("listStudents", ['$scope', '$http', function($scope, $http) {
		$scope.studentList = [];
		$http.get('/api/users').success(function(data) {
			$scope.studentList = data;
		});
	}]);

})();