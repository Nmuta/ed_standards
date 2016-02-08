app.controller("MenuController", function($scope, $http, TokenFactory){
  $scope.currentUser = TokenFactory.getToken();
});

app.controller("HomeController", function($scope, $http, TokenFactory){
  $scope.message = "welcome to the app";
  $scope.currentUser = TokenFactory.getToken();
});

app.controller("UsersLoginController", function($scope, $http, UsersFactory, TokenFactory){
    $scope.users = {}
    $scope.loginUser = function(){
      var data = {email: $scope.users.email, password: $scope.users.password};
      UsersFactory.loginUser(data).then(function(success){
        if(success.data.token && success.data.username){
            $scope.logged_in = true;
            TokenFactory.setToken(success.data.token);
        } else {
          alert("Invalid login.")
        }
      }, failure);

      function failure(){
        console.log("failed login");
      }
    }
});

app.controller("UsersLogoutController", function($scope, TokenFactory){
   TokenFactory.clearToken("token");
});


app.controller('StandardsIndexController',function($scope, StandardsFactory) {
  console.log("index called");
  StandardsFactory.getIndex().then(function(entries) {
    $scope.standards = entries.data;
  });

}).controller('StandardsShowController',function($scope, StandardsFactory, $routeParams) {
  console.log("show called");
  StandardsFactory.getShow($routeParams.id).then(function(entry) {
    $scope.standard = entry.data;
  });
  // var entry = StandardsFactory.get({ id: $routeParams.id }, function() {
  //   $scope.standard = entry;
  // });
}).controller('StandardsCreateController',function($scope, StandardsFactory, $routeParams) {
  console.log("create called");
  params = {title: "funky chicken"};
  StandardsFactory.postNew(params).then(function() {
    console.log("I made it");
  })
}).controller('StandardsNewController',function($scope, StandardsFactory, $routeParams, $location) {
  console.log("new called");
  $scope.standard = {};
    $scope.addStandard = function(){
      params = {title:  $scope.standard.title};
      StandardsFactory.postNew(params).then(function(success){
        console.log("do we even get here??");
    }, errorHandler());
  }
  function errorHandler(){
    console.log("error creating new standard");
  }
});
