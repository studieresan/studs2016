(function() {

	var studentProfileControllers = angular.module('studentProfileControllers', []);

	studentProfileControllers.controller("userEditCtrl", ['$scope', function($scope) {
		$scope.user = {};
	}]);
	
})();