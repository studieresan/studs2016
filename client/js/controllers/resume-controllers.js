(function() {

	var resumeControllers = angular.module('resumeControllers', []);

	resumeControllers.controller("ResumeCtrl", ['$scope', 'Resume', '$routeParams', 'Flash', function($scope, Resume, $routeParams, Flash) {

		$scope.data = {
			editDescription: false,
			activePost: null
		};

		console.log($scope.data.activePost);

		Resume.get({ student: 'mine' }, function(data) {
			console.log(data);
			$scope.Resume = data;
		});

		$scope.setEditDescription = function (bool) {
			$scope.data.editDescription = bool;
		};

		$scope.update = function (data) {
			console.log(data);
			Resume.update({ student: 'mine' }, data, function successCallback(response) {
				Flash.create('info', "Resumé saved!");
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

		$scope.push = function (type) {
			$scope.Resume.posts.push({
				type: type,
				title: "Edit this!",
				description: "Add description here.",
				newItem: 'new'
			});
		};

		$scope.removePost = function (post) {
			var index = $scope.Resume.posts.indexOf(post);
			$scope.Resume.posts.splice(index, 1);
		};

		$scope.setActive = function (post) {
			$scope.data.activePost = post;
		};

		$scope.unsetActive = function () {
			console.log($scope.data.activePost);
			$scope.data.activePost = null;
		};

		$scope.newType = function (type) {
			$scope.push(type);
			$scope.newTypeValue = "";
		};
	}]);
})();