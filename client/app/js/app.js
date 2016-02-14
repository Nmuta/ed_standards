var app = angular.module("jos", ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/topics', {
        templateUrl: 'partials/topics/index.html',
        controller: 'TopicsIndexController',
        restricted: true
      })
      .when('/topics/:id', {
        templateUrl: 'partials/topics/form.html',
        controller: 'TopicsModifyController',
        restricted: true
      })
      .when('/admin', {
        templateUrl: 'partials/admin/index.html',
        controller: 'AdminController',
        restricted: true
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

// run this function _after_ the app was configured / booted
// _but_ only once before any other thing happens (before controllers, routes...)
// equivalent to $(document).ready()
// think of it like only running on page refreshes
app.run(function ($rootScope, $location, $window, TokenFactory) {

  // these are like before filters in Rails
  // this is like middleware in express
  $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
    if (nextRoute && nextRoute.restricted && !$window.localStorage.getItem("token")) {
      $location.path('/users/login');
    }

    if (nextRoute && nextRoute.preventWhenLoggedIn && $window.localStorage.getItem("token")) {
      $location.path('/standards');
    }
  });

});
