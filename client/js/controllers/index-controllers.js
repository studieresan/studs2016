(function() {

	var indexControllers = angular.module('indexControllers', []);

	indexControllers.controller("indexInstagram", ['$scope', 'Instagram', function($scope, Instagram) {

		// $scope.pics = [];
		// $scope.have = [];
		// $

		// Instagram.fetchRecent(function(data) {
		// 	$scope.pics = angular.toJson(data);
		// 	$scope.data = $scope.pics.data;
		// });


		$scope.pics = [];
		$scope.have = [];
		$scope.orderBy = "-likes.count";
		$scope.getMore = function() {
		Instagram.fetchRecent(function(data) {
		    for(var i=0; i<data.length; i++) {
		      if (typeof $scope.have[data[i].id]==="undefined") {
		        $scope.pics.push(data[i]) ;
		        $scope.have[data[i].id] = "1";
		      }
		    }
		});
		};
		$scope.getMore();


	}]);
})();
