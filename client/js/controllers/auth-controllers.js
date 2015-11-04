(function() {

	var authControllers = angular.module('authControllers', []);

	authControllers.controller("loginCtrl", ['$scope', function($scope) {
		// Do stuff like login user.
		$scope.login = function(user) {
			alert(user.email + " is trying to log in!");
		};

	}]);

	authControllers.controller("recoverCtrl", ['$scope', '$location', function($scope, $location) {
		// Do stuff like send email.
		$scope.recover = function(user) {
			$location.path('/login/recover/sent');
		};
	}]);

})();