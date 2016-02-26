(function() {

	var resumeControllers = angular.module('resumeControllers', []);

	resumeControllers.controller("ResumeCtrl", ['$scope', '$interval', 'Resume', '$routeParams', 'Flash', function($scope, $interval, Resume, $routeParams, Flash) {

		$scope.data = {
			editDescription: false,
			activePost: null,
			loading: true,
			empty: true
		};

		$scope.$watch('data.loading', function() {
			console.log("Loading: " + $scope.data.loading);
		});

		Resume.get({ student: 'mine' }, function(data) {
			// This will run only when data is loaded.
			window.onbeforeunload = function (event) {
				var message = 'Sure you want to leave?';
				if (typeof event == 'undefined') {
					event = window.event;
				}
				if (event) {
					event.returnValue = message;
				}
				return message;
			};

			console.log(data);
			$scope.Resume = data;
			if($scope.Resume.posts.length < 1) {
				// Push Work experience and education
				$scope.Resume.posts.push({
					type: "Work experience",
					title: "Edit this!",
					description: "Add description here.",
					startdate: "2015-12-01",
					enddate: "2016-12-01",
					newItem: 'new'
				});
				$scope.Resume.posts.push({
					type: "Education",
					title: "Edit this!",
					description: "Add description here.",
					startdate: "2015-12-01",
					enddate: "2016-12-01",
					newItem: 'new'
				});
			}
			if($scope.Resume.description === "" || $scope.Resume.description === undefined) {
				$scope.Resume.description = "Update your personal description by clicking on this text.";
			}
			$scope.data.loading = false;
		});

$scope.setEditDescription = function (bool) {
	$scope.data.editDescription = bool;
};

$scope.update = function (data, isAutoSave) {
	console.log("data", data);
	Resume.update({ student: 'mine' }, data, function successCallback(response) {
		if(isAutoSave) {
			Flash.create('info', "Auto-saving resume...");
		} else {
			Flash.create('info', "Resumé saved!");
		}
	}, function errorCallback(response) {
		if(isAutoSave) {
			Flash.create('danger', "Auto-save failed...");
		} else {
			Flash.create('danger', "Something went bad. Try again!");
		}
	});
};
		// Auto-save every 60 second
		$interval(function() {
			$scope.update($scope.Resume, true);
		}, 60000);

		$scope.push = function (type) {
			if(type !== undefined) {
				$scope.Resume.posts.push({
					type: type,
					title: "Edit this!",
					description: "Add description here.",
					newItem: 'new'
				});
			}
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

resumeControllers.controller("PublicResumeCtrl", ['$scope','Resume', '$routeParams', function($scope, Resume, $routeParams) {
	Resume.get({ student: $routeParams.id }, function(data) {
		$scope.Resume = data;
	});
}]);
})();