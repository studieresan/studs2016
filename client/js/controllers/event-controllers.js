(function() {

	var eventControllers = angular.module('eventControllers', []);

	eventControllers.controller("singleEventCtrl", ['$scope', '$http', 'Event', '$routeParams', function($scope, $http, Event, $routeParams) {
		$scope.eventItem = [];
		$scope.instagramMedia = [];
		Event.get({ slug: $routeParams.slug }, function(data) {
			$scope.eventItem = data;

			$scope.loadInstagram = function() {			
				//var ACCESSTOKEN = "2277850875.ab103e5.433849098b394f7baa8471c5464b61a8";
				var mediaUrl = $scope.eventItem.description;
				
				var endPoint = "https://api.instagram.com/oembed?url=" + mediaUrl + "&callback=JSON_CALLBACK";

				$http.jsonp(endPoint).success(function(response){
		            $scope.instagramMedia = response;
		            return true;
		        });
			}();
		});

		//The following is used in order to embed instagram-media.

		//https://api.instagram.com/v1/media/{media-id}?access_token=ACCESS-TOKEN
		//AccessToken is also found in instagram-factory. If you need to change it, do it in factory as well.
		// var loadInstagram = function() {			
		// 	var ACCESSTOKEN = "2277850875.ab103e5.433849098b394f7baa8471c5464b61a8";			
		// 	var mediaId = $scope.eventItem.description;
			
		// 	var endPoint = "https://api.instagram.com/v1/media/" + mediaId + "?access_token=" + ACCESSTOKEN;

		// 	$http.jsonp(endPoint).success(function(response){
	 //            $scope.instagramMedia = response;
	 //        });
		// }();
	}]);

	eventControllers.controller("listEventCtrl", ['$scope', 'Event', '$routeParams', function($scope, Event, $routeParams) {
		Event.query(function(data) {
			$scope.events = data;
		});
	}]);

})();
