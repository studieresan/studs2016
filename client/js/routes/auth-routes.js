(function() {
  auth.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'views/auth/login.html',
      controller: 'loginCtrl',
      controllerAs: 'loginCtrl'
    })
    .when('/login/recover', {
      templateUrl: 'views/auth/recover.html',
      controller: 'recoverCtrl',
      controllerAs: 'recoverCtrl'
    })
    .when('/login/recover/sent', {
      templateUrl: 'views/auth/recover-sent.html'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }]);
  
})();