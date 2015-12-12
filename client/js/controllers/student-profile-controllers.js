(function() {

	var studentProfileControllers = angular.module('studentProfileControllers', []);

	studentProfileControllers.controller("userEditCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {
		$scope.edit = function(user) {
			$http.put('/api/students', user).then(function successCallback(response) {
				Flash.create('info', "Saved!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

		$scope.changePassword = function(password) {
			$http.put('/api/users/change-password', password).then(function successCallback(response) {
				Flash.create('info', "Your password is changed!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

		$scope.updateSocial = function(social) {
			console.log(social);
			$http.put('/api/students', social).then(function successCallback(response) {
				Flash.create('info', "Social data updated!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};
	}]);
	
})();