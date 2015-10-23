(function() {
    angular.module('events')
           .directive('eventSingle', ['$http', function($http) {
        return {
            restrict: 'E',
            templateUrl: 'views/events/single.html',
            scope: {
                event: '='
            },
            controller: function() {
                this.event = null;
                var eventsCtrl = this;
                $http.get('/api/events').success(function(data) {
                    eventsCtrl.event = data;
                });
            },
            controllerAs: 'eventsCtrlss'
        };
    }]);
})();
