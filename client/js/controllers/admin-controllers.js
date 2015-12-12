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