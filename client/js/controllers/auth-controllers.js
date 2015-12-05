(function() {

	var authControllers = angular.module('authControllers', []);

	authControllers.controller("loginCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {
		// Do stuff like login user.
		$scope.login = function(user) {
			var email = user.email;
			var password = user.password;
			$http.post('/login', {'email':email, 'password': password}).then(function successCallback(response) {
				window.location.replace("/");
			}, function errorCallback(response) {
				Flash.create('info', "Hm, we don't seem to recognize you. Try again!");
			});
		};

	}]);

	authControllers.controller("recoverCtrl", ['$scope', '$location', function($scope, $location) {
		// Do stuff like send email.
		$scope.recover = function(user) {
			$location.path('/login/recover/sent');
		};
	}]);

})();