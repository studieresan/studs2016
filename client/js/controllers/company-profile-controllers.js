(function() {

	var profileControllers = angular.module('companyProfileControllers', []);

	profileControllers.controller("chartsController", ['$scope', '$http', 'Flash', function($scope, $http, Flash) {
		$scope.beforeDataIsSet = false;
		$scope.afterDataIsSet = false;

		$scope.$watch('company.eventDataBeforeURL', function () {
			//console.log($scope.company.eventDataBeforeURL);
			$http.get("/api/companyEventBeforeStats").then(function(response) {
				var data = response.data;
				$scope.beforeData = data;
				$scope.beforeDataIsSet = true;
			}, function errorCallback(response) {
				console.log(response);
			});

		});

		$scope.$watch('company.eventDataAfterURL', function () {
			//console.log($scope.company.eventDataAfterURL);
			$http.get("/api/companyEventAfterStats").then(function(response) {
				var data = response.data;
				var words = [];

				// Loop to calculate size of each word
				for (var k = 0; k < data.words.total; k++) {
					words.push({text: data.words.word[k], weight: (data.words.count[k]/data.words.total)});
				}
				$scope.words = words;
				$scope.afterData = data;
				$scope.afterDataIsSet = true;
			}, function errorCallback(response) {
				console.log(response);
			});
		});
	}]);
})();
