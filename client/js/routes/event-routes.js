(function() {
  events.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/events', {
      templateUrl: 'views/events/list.html',
      controller: 'listEventCtrl',
    })
    .when('/events/:slug', {
      templateUrl: 'views/events/single.html',
      controller: 'singleEventCtrl',
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }]);
  
})();