(function() {

	var profileControllers = angular.module('companyProfileControllers', []);

	profileControllers.controller("chartsController", ['$scope', '$http', 'Data', function($scope, $http, Data) {
		var numberofmembers = 28;
		$scope.labels = ["Yes", "No"];
		Data.getData.get(function(response) {
			temp = response.feed.entry;
			var data = [];
			for (var i = 0; i < temp.length; i++) {
				data.push({
					before: [
						[temp[i].gsx$q1before.$t, (numberofmembers - temp[i].gsx$q1before.$t)],
						[temp[i].gsx$q2before.$t, (numberofmembers - temp[i].gsx$q2before.$t)],
						[temp[i].gsx$q3before.$t, (numberofmembers - temp[i].gsx$q3before.$t)]
					],
					after: [
						[temp[i].gsx$q1after.$t, (numberofmembers - temp[i].gsx$q1after.$t)],
						[temp[i].gsx$q2after.$t, (numberofmembers - temp[i].gsx$q2after.$t)],
						[temp[i].gsx$q3after.$t, (numberofmembers - temp[i].gsx$q3after.$t)]
					],
				});
			}
			$scope.data = data;
		});
	}]);

	profileControllers.controller("tagCloudController", ['$scope', function($scope) {
		$scope.words = [
		{text: "Lorem", weight: 13},
		{text: "Ipsum", weight: 10.5},
		{text: "Dolor", weight: 9.4},
		{text: "Sit", weight: 8},
		{text: "Amet", weight: 6.2},
		{text: "Consectetur", weight: 5},
		{text: "Adipiscing", weight: 5},
		{text: "Elit", weight: 5},
		{text: "Nam et", weight: 5},
		{text: "Leo", weight: 4},
		{text: "Sapien", weight: 4},
		{text: "Pellentesque", weight: 3},
		{text: "habitant", weight: 3},
		{text: "morbi", weight: 3},
		{text: "tristisque", weight: 3},
		{text: "senectus", weight: 3},
		{text: "et netus", weight: 3},
		{text: "et malesuada", weight: 3},
		{text: "fames", weight: 2},
		{text: "ac turpis", weight: 2},
		{text: "egestas", weight: 2},
		{text: "Aenean", weight: 2},
		{text: "vestibulum", weight: 2},
		{text: "elit", weight: 2},
		{text: "sit amet", weight: 2},
		{text: "metus", weight: 2},
		{text: "adipiscing", weight: 2},
		{text: "ut ultrices", weight: 2}
		];
		$scope.colors = ["#ff0000"];
	}]);

})();