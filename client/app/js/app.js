var app = angular.module("jos", ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    //$httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/standards', {
        templateUrl: 'partials/standards/index.html',
        controller: 'StandardsIndexController'
      })
      .when('/standards/new', {
        templateUrl: 'partials/standards/new.html',
        controller: 'StandardsNewController'
      })
      .when('/standards/:id', {
        templateUrl: 'partials/standards/show.html',
        controller: 'StandardsShowController'
      })
      .when('/standards/create', {
        templateUrl: 'partials/standards/create.html',
        controller: 'StandardsCreateController'
      })
      .when('/users/login', {
        templateUrl: 'partials/users/login.html',
        controller: 'UsersLoginController'
      })
      .when('/users/logout', {
        templateUrl: 'partials/users/logout.html',
        controller: 'UsersLogoutController'
      })


    $locationProvider.html5Mode(true);
});
