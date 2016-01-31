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
			if (confirm("Are you sure?")) {    
				$http.delete('/api/users/' + student._id).then(function successCallback(response) {
					if(student.firstname)
						Flash.create('info', "Removed " + student.firstname + "!");
					else
						Flash.create('info', "Removed " + student.email + "!");
					$scope.getStudents();
				}, function errorCallback(response) {
					Flash.create('danger', "Something went bad. Try again!");
				});
			}
		};

		$scope.suggestPassword = function() {
			return generatePassword();
		};
		$scope.suggestedPassword = $scope.suggestPassword();
	}]);

	adminControllers.controller("companyCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {

		$scope.editType = "Add";

		$scope.resetForm = function() {
			$scope.editType = "Add";
			$scope._company.email = "";
			$scope._company.password = $scope.suggestPassword();
			$scope._company.name = "";
			$scope._company.contact = "";
			$scope._company.eventDataBeforeURL = "";
			$scope._company.eventDataAfterURL = "";
			$scope.selectedCompany = null;
			$scope.getCompanies();
			$scope.addcompany.$setPristine();
		};
		$scope.addOrEdit = function(company) {
			if($scope.editType == "Add") {
				if(!company.password) {
					company.password = $scope.suggestedPassword;
				}
				$http.post('/api/companies', company).then(function successCallback(response) {
					Flash.create('info', "Registered " + company.name + "!");
					$scope.resetForm();
				}, function errorCallback(response) {
					Flash.create('danger', "Something went bad. Try again!");
				});
				$scope.getCompanies();
			} else if($scope.editType == "Edit") {
				if(company.password === "") {
					delete company.password;
				}
				$http.put('/api/companies/' + company._id, company).then(function successCallback(response) {
					Flash.create('info', "Changed data for " + company.name + "!");
					$scope.resetForm();
				}, function errorCallback(response) {
					console.log(response);
					Flash.create('danger', "Something went bad. Try again!");
				});
			} else {
				Flash.create('danger', "Something went bad when adding or editing a company... Try again!");
			}
		};

		$scope.getCompanies = function() {
			$http.get('/api/companies').then(function successCallback(response) {
				$scope.allcompanies = response.data;
			}, function errorCallback(response) {
				
			});
		};
		$scope.getCompanies(); // Run onload!

		$scope.remove = function(company) {
			if (confirm("Are you sure?")) {    
				$http.delete('/api/users/' + company._id).then(function successCallback(response) {
					Flash.create('info', "Removed " + company.name + "!");
					$scope.getCompanies();
				}, function errorCallback(response) {
					Flash.create('danger', "Something went bad. Try again!");
				});
			}
		};

		$scope.suggestPassword = function() {
			return generatePassword();
		};
		
		$scope.suggestedPassword = $scope.suggestPassword();

		$scope.setEdit = function(company) {
			console.log("RUN!");
			var form = $scope.addcompany;
			if(form.$pristine || (!form.$pristine && confirm("Are you sure you want to overwrite your current form data?"))) {
				$scope._company = company;
				$scope.editType = "Edit";
				form.$setPristine(); // Set that the loaded data is "unaltered"
			} else {
				$scope.selectedCompany = null;
			}
		};

	}]);

	adminControllers.controller("eventCtrl", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {

		$scope.editType = "Add";

		$scope.resetForm = function() {
			$scope.editType = "Add";
			$scope._event.title = "";
			$scope._event.company = "";
			$scope._event.date = "";
			$scope._event.location = "";
			$scope._event.description = "";
			$scope._event.instagram = "";
			$scope.selectedEvent = null;
			$scope.getEvents();
			$scope.addevent.$setPristine();
		};

		$scope.addOrEdit = function(event) {
			if($scope.editType == "Add") {
				$http.post('/api/events', event).then(function successCallback(response) {
					Flash.create('info', "Added " + $scope._event.title + "!");
					$scope.resetForm();
				}, function errorCallback(response) { 
					Flash.create('danger', "Something went bad. Try again!");
				});
			} else if($scope.editType == "Edit") {
				$http.put('/api/events/' + event._id, event).then(function successCallback(response) {
					Flash.create('info', "Updated " + $scope._event.title + "!");
					$scope.resetForm();
				}, function errorCallback(response) { 
					Flash.create('danger', "Something went bad. Try again!");
				});
			} else {
				Flash.create('danger', "Something went bad when adding or editing an event... Try again!");
			}
		};

		$scope.getEvents = function() {
			$http.get('/api/events').then(function successCallback(response) {
				$scope.allEvents = response.data;
			}, function errorCallback(response) {

			});
		};
		$scope.getEvents();

		$scope.remove = function(event) {
			if (confirm("Are you sure?")) {  
				$http.delete('/api/events/' + event._id).then(function successCallback(response) {
					Flash.create('info', "Removed " + event.title + "!");
					$scope.getEvents();
				}, function errorCallback(response) {
					Flash.create('danger', "Something went bad. Try again!");
				});
			}
		};

		$scope.editEvent = function(_event) {
			var form = $scope.addevent;
			if(form.$pristine || (!form.$pristine && confirm("Are you sure you want to overwrite your current form data?"))) {
				$scope._event = _event;
				$scope.editType = "Edit";
				form.$setPristine(); // Set that the loaded data is "unaltered"
			} else {
				$scope.selectedEvent = null;
			}
		};

	}]);
	
})();