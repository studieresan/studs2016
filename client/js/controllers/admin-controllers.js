(function() {

	var adminControllers = angular.module('adminControllers', []);

	adminControllers.controller("addStudentCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {
		$scope.add = function(user) {
			$http.post('/api/students', user).then(function successCallback(response) {
				Flash.create('info', "Registered!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};
	}]);
	
})();