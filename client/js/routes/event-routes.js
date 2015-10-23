(function() {
  events.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/events/list.html',
      controller: 'listEventCtrl',
      controllerAs: 'eventList'
    })
    .when('/:slug', {
      templateUrl: 'views/events/single.html',
      controller: 'singleEventCtrl',
      controllerAs: 'event'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);
  
})();