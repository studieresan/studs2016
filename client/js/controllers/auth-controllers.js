(function() {

	var authControllers = angular.module('authControllers', []);

	authControllers.controller("loginCtrl", ['$scope', '$http', '$location', function($scope, $http, $location) {
		// Do stuff like login user.
		$scope.login = function(user) {
			var email = user.email;
			var password = user.password;
			$http.post('/login', {'email':email, 'password': password}).then(function successCallback(response) {
				alert("Logged in!");
			}, function errorCallback(response) {
				alert("Invalid credentials!");
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