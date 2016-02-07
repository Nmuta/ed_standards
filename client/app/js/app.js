var app = angular.module("jos", ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/standards', {
        templateUrl: 'partials/standards/index.html',
        controller: 'StandardsIndexController'
      })
      .when('/standards/:id', {
        templateUrl: 'partials/standards/show.html',
        controller: 'StandardsShowController'
      })

    $locationProvider.html5Mode(true);
});
