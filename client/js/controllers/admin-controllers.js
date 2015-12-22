(function() {

	var adminControllers = angular.module('adminControllers', []);

	function generatePassword() {
		var length = 10, charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", retVal = "";
	    for (var i = 0, n = charset.length; i < length; ++i) {
	        retVal += charset.charAt(Math.floor(Math.random() * n));
	    }
	    return retVal;
	}

	adminControllers.controller("studentCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {

		$scope.add = function(user) {
			if(!user.password)
				user.password = $scope.suggestedPassword;
			$http.post('/api/students', user).then(function successCallback(response) {
				Flash.create('info', "Registered " + $scope.newUser.email + "!");
				$scope.newUser.email = "";
				$scope.newUser.password = $scope.suggestPassword();
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
			$scope.getStudents();
		};

		$scope.getStudents = function() {
			$http.get('/api/students').then(function successCallback(response) {
				$scope.allstudents = response.data;
			}, function errorCallback(response) {
				
			});
		};
		$scope.getStudents();

		$scope.removeStudent = function(student) {
			$http.delete('/api/users/' + student._id).then(function successCallback(response) {
				if(student.firstname)
					Flash.create('info', "Removed " + student.firstname + "!");
				else
					Flash.create('info', "Removed " + student.email + "!");
				$scope.getStudents();
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

		$scope.suggestPassword = function() {
			return generatePassword();
		};
		$scope.suggestedPassword = $scope.suggestPassword();
	}]);

	adminControllers.controller("companyCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {

		$scope.add = function(user) {
			if(!user.password)
				user.password = $scope.suggestedPassword;
			$http.post('/api/companies', user).then(function successCallback(response) {
				Flash.create('info', "Registered " + $scope.newCompany.name + "!");
				$scope.newCompany.email = "";
				$scope.newCompany.name = "";
				$scope.newCompany.password = $scope.suggestPassword();
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
			$scope.getCompanies();
		};

		$scope.getCompanies = function() {
			$http.get('/api/companies').then(function successCallback(response) {
				$scope.allcompanies = response.data;
			}, function errorCallback(response) {
				
			});
		};
		$scope.getCompanies();

		$scope.remove = function(company) {
			$http.delete('/api/users/' + company._id).then(function successCallback(response) {
				Flash.create('info', "Removed " + company.name + "!");
				$scope.getCompanies();
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

		$scope.suggestPassword = function() {
			return generatePassword();
		};
		$scope.suggestedPassword = $scope.suggestPassword();
	}]);

	adminControllers.controller("eventCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {

		$scope.getEvents = function() {
			$http.get('/api/events').then(function successCallback(response) {
				$scope.allEvents = response.data;
			}, function errorCallback(response) {

			});
		};
		$scope.getEvents();

		$scope.remove = function(event) {
			$http.delete('/api/events/' + event._id).then(function successCallback(response) {
				Flash.create('info', "Removed " + event.title + "!");
				$scope.getCompanies();
			}, function errorCallback(response) {
				Flash.create('danger', "Something went bad. Try again!");
			});
		};

	}]);
	
})();