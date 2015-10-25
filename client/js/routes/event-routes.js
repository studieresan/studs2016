(function() {
  events.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/events', {
      templateUrl: 'views/events/list.html',
      controller: 'listEventCtrl',
      controllerAs: 'eventList'
    })
    .when('/events/:slug', {
      templateUrl: 'views/events/single.html',
      controller: 'singleEventCtrl',
      controllerAs: 'eventItem'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }]);
  
})();