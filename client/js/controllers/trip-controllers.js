(function() {

	var tripControllers = angular.module('tripControllers', []);

	tripControllers.controller("mapCtrl", ['$scope', '$http', "uiGmapGoogleMapApi", function($scope, $http, uiGmapGoogleMapApi) {
		$scope.map = {
			center: {
				latitude: 59.348379,
				longitude: 18.072016
			},
			zoom: 4,
			options: {
				disableDefaultUI: true
			},
			styles: [{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":0},{"lightness":-100},{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":-100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#dddddd"},{"saturation":-100},{"lightness":-3},{"visibility":"on"}]}]

		};

		$scope.onMarkerClick = function(marker, eventName, args) {
			console.log(marker);
			console.log(eventName);
			console.log(args);
		};

		$scope.activities = [
		{
			title: "KTH",
			description: "Here to plan!",
			mapData: {
				idKey: 1,
				coords: {
					latitude: 59.348379,
					longitude: 18.072016
				},
				options: {
					icon: "/img/map-pin.svg"
				},
				click: $scope.onMarkerClick
			}
		},
		{
			title: "New York",
			description: "Here to partey!",
			mapData: {
				idKey: 2,
				coords: {
					latitude: 40.748417,
					longitude: -73.985598
				},
				options: {
					icon: "/img/map-pin.svg"
				},
				click: $scope.onMarkerClick
			}
		},
		{
			title: "San Fransisco",
			description: "Here to learn. Of course.",
			mapData: {
				idKey: 3,
				coords: {
					latitude: 37.793549,
					longitude: -122.483670
				},
				options: {
					icon: "/img/map-pin.svg"
				},
				click: $scope.onMarkerClick
			}
		}
		];

		$scope.polylines = [];
		uiGmapGoogleMapApi.then(function(){

			var temp = [];
			for(var i in $scope.activities) {
				temp.push($scope.activities[i].mapData.coords);
			}

			$scope.polylines = [
			{
				id: 1,
				path: temp,
				stroke: {
					color: '#7ac89c',
					weight: 2
				},
				editable: false,
				draggable: false,
				geodesic: true,
				visible: true
			}];
		});
	}]);
})();