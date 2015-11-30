(function() {

	resumes.factory("Resume", ['$resource', function($resource) {
		return $resource("/api/resumes/:student");
	}]);

})();