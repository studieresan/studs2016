(function() {

	var adminControllers = angular.module('adminControllers', []);

	adminControllers.controller("studentCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {

		$scope.add = function(user) {
			$http.post('/api/students', user).then(function successCallback(response) {
				Flash.create('info', "Registered!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

		$scope.getStudents = function() {
			$http.get('/api/students').then(function successCallback(response) {
				$scope.allstudents = response.data;
			}, function errorCallback(response) {
				
			});
		};
		$scope.getStudents();

		$scope.removeStudent = function(student) {
			$http.delete('/api/users/' + student._id).then(function successCallback(response) {
				if(student.firstname)
					Flash.create('info', "removed " + student.firstname + "!");
				else
					Flash.create('info', "removed " + student.email + "!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

		$scope.suggestPassword = function() {
			var length = 10, charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", retVal = "";
		    for (var i = 0, n = charset.length; i < length; ++i) {
		        retVal += charset.charAt(Math.floor(Math.random() * n));
		    }
		    return retVal;
		};
		$scope.suggestedPassword = $scope.suggestPassword();
	}]);
	
})();