(function() {
    var app = angular.module('events', []);

    app.directive('eventList', ['$http', function($http) {
        return {
            restrict: 'E',
            templateUrl: 'views/events/list.html',
            controller: function() {
                this.events = [];
                var eventsCtrl = this;
                $http.get('/api/events').success(function(data) {
                    eventsCtrl.events = data;
                });

                this.test = function(data) {
                    console.log(data);
                };
            },
            controllerAs: 'eventsCtrl'
        };
    }]);
})();
