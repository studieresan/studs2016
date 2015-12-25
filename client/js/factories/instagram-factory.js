(function() {
	//Accesstoken required in order to fetch from Instagrams api. Accestoken for account 'studskth'.
	var ACCESSTOKEN = "2277850875.ab103e5.433849098b394f7baa8471c5464b61a8";
	var HASHTAG = "studs16";

	//Gets the latest pictures from studskth account.
	instagram.factory('Instagram', ['$http', function($http){
		return {
			fetchRecent: function(callback){
	            
	            var endPoint = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + ACCESSTOKEN + "&callback=JSON_CALLBACK";

	            $http.jsonp(endPoint).success(function(response){
	                callback(response.data);
	            });
			}
		};
	}]);

	//Gets the latest pictures for the hashtag.
	instagram.factory('InstagramHashtag', ['$http', function($http) {
		return {
			fetchRecent: function(callback) {
				var endPoint = "https://api.instagram.com/v1/tags/" + HASHTAG + "/media/recent?access_token=" + ACCESSTOKEN + "&callback=JSON_CALLBACK";

				$http.jsonp(endPoint).success(function(response) {
					callback(response.data);
				});
			}
		};
	}]);
})();