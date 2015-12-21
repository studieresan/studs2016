(function() {
  resumes.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/profile/resume', {
      templateUrl: 'views/resumes/add-edit.html',
      controller: 'ResumeCtrl',
    })
    .when('/resume/:id', {
      templateUrl: 'views/resumes/public.html',
      controller: 'PublicResumeCtrl',
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }]);
  
})();