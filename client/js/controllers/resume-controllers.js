(function() {

	var resumeControllers = angular.module('resumeControllers', []);

	resumeControllers.controller("ResumeCtrl", ['$scope', 'Resume', '$routeParams', 'Flash', function($scope, Resume, $routeParams, Flash) {

		$scope.activePost = null;
		$scope.editDescription = false;

		Resume.get({ student: 'mine' }, function(data) {
			console.log(data);
			$scope.Resume = data;
		});

		$scope.setEditDescription = function () {
			$scope.editDescription = true;
		};

		$scope.update = function (data) {
			console.log(data);
			Resume.update({ student: 'mine' }, data, function(res) {
				console.log(res);
			});
		};

		$scope.push = function (type) {
			$scope.Resume.posts.push({
				type: type,
				title: "Title here",
				description: "Description here."
			});
		};

		$scope.removePost = function (index) {
			console.log(index);
			$scope.Resume.posts.splice(index, 1);
		};

		$scope.setActive = function (post) {
			$scope.activePost = post;
		};

		$scope.unsetActive = function () {
			$scope.activePost = null;
			console.log($scope.activePost);
		};
	}]);
})();