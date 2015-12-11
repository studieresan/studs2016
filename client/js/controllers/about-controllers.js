(function() {

	var aboutControllers = angular.module('aboutControllers', []);

	aboutControllers.controller("listStudents", ['$scope', '$http', function($scope, $http) {
		$scope.studentList = [];
		$http.get('/api/students').success(function(data) {
			data.sort(function(a, b){
				return a.firstname.localeCompare(b.firstname);
			});
			$scope.studentList = data;
		});
	}]);

})();