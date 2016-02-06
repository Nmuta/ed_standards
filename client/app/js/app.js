var app = angular.module("jos", ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/standards', {
        templateUrl: 'partials/standards.html',
        controller: 'StandardsController'
      })

    $locationProvider.html5Mode(true);
});
