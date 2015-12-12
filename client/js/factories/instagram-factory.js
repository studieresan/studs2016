(function() {
	index.factory('Instagram', ['$http', function($http){
		return {
			fetchRecent: function(callback){
	            
	            var endPoint = "https://api.instagram.com/v1/users/self/media/recent/?access_token=2277850875.ab103e5.433849098b394f7baa8471c5464b61a8&callback=JSON_CALLBACK";

	            $http.jsonp(endPoint).success(function(response){
	                callback(response.data);
	            });
			}
		};
	}]);
})();