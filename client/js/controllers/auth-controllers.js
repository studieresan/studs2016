(function() {

	var authControllers = angular.module('authControllers', []);

	authControllers.controller("loginCtrl", ['$scope', '$http', function($scope, $http) {
		// Do stuff like login user.
		$scope.login = function(user) {
			alert('hej');
			var email = user.email;
			var password = user.password;
			$http.post('/login', {'email':email, 'password': password}).success(function(data) {
				$location.path(data);
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