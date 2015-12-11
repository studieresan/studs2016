(function() {
	// TODO: Add ID as parameter
	companyProfile.factory('Data', ['$resource', function($resource) {
		var factory = {};
		factory.getData = $resource("https://spreadsheets.google.com/feeds/list/17qc9EOvGOG5RhPlg2fxkUeBLLSWfAw5TAVPzy5DppJM/od6/public/values?alt=json");
		return factory;
	}]);
})();