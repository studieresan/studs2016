(function() {

	var aboutControllers = angular.module('aboutControllers', []);

	aboutControllers.controller("listStudents", ['$scope', function($scope) {
		this.users = [];
		var ctrl = this;
		$http.get('/api/users').success(function(data) {
			ctrl.users = data;
		});
	}]);

})();