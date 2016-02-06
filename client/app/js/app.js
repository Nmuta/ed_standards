var app = angular.module("jos", ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/standards', {
        templateUrl: 'partials/standards/index.html',
        controller: 'StandardsController',
        method: "index"
      })
      .when('/standards/:id', {
        templateUrl: 'partials/standards/show.html',
        controller: 'StandardsController'
        method: "show"
      })

    $locationProvider.html5Mode(true);
});
