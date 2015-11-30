(function() {
  resumes.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/resumes', {
      templateUrl: 'views/resumes/add-edit.html',
      controller: 'ResumeCtrl',
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }]);
  
})();