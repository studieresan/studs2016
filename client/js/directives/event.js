(function() {
    var app = angular.module('events', []);

    app.directive('events', ['$http', function($http) {
        return {
            restrict: 'E',
            templateUrl: 'views/event.html',
            controller: function() {
                this.events = [];
                var eventsCtrl = this;
                $http.get('/api/events').success(function(data) {
                    eventsCtrl.events = data;
                });
            },
            controllerAs: 'eventsCtrl'
        };
    }]);
})();
