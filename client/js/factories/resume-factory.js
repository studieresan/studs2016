(function() {

	resumes.factory("Resume", ['$resource', function($resource) {
		return $resource("/api/resumes/:student", null,
		{
			'update': { method:'PUT' }
		});
	}]);

})();