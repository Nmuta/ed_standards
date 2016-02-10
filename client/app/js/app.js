var app = angular.module("jos", ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/standards', {
        templateUrl: 'partials/standards/index.html',
        controller: 'StandardsIndexController',
        restricted: true
      })
      .when('/standards/new', {
        templateUrl: 'partials/standards/new.html',
        controller: 'StandardsNewController',
        restricted: true
      })
      .when('/standards/:id', {
        templateUrl: 'partials/standards/show.html',
        controller: 'StandardsShowController',
        restricted: true
      })
      .when('/standards/create', {
        templateUrl: 'partials/standards/create.html',
        controller: 'StandardsCreateController',
        restricted: true
      })
      .when('/users/login', {
        templateUrl: 'partials/users/login.html',
        controller: 'UsersLoginController',
        preventWhenLoggedIn: true
      })
      .when('/users/logout', {
        templateUrl: 'partials/users/logout.html',
        controller: 'UsersLogoutController',
        restricted: true,
        resolve: {
        app: function(UsersFactory, $location){
          UsersFactory.logoutUser();
          $location.path("/");
        }
      }
      })


    $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $location, $window, TokenFactory) {
  TokenFactory.getUser();
  $rootScope.$on('$routeChangeStart', function (event, next, current) {

    if (next && next.restricted && !$window.localStorage.getItem("token")) {
        $window.alert("You must be logged in to do that");
        $location.path('/users/login');
    }

    if (next && next.preventWhenLoggedIn && $window.localStorage.getItem("token")) {
      console.log("no need to go here..");
      $location.path('/standards');
    }
  });
});
