(function() {

	var studentProfileControllers = angular.module('studentProfileControllers', []);

	studentProfileControllers.controller("userEditCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {
		$scope.edit = function(user) {
			$http.put('/api/students', user).then(function successCallback(response) {
				Flash.create('info', "Saved!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
				user.password = "";
			});
		};
	}]);
	
})();