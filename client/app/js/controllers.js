app.controller("MenuController", function($scope, $http, TokenFactory){
  $scope.$watch (
    function(){
      return TokenFactory.getToken();
    },
    function(newVal, oldVal){
      $scope.currentUser = newVal;
      $scope.username =  TokenFactory.getUser();
    }
  )
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
            TokenFactory.setToken(success.data.token);
            TokenFactory.setUser(success.data.username);
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
  $scope.show_standards = false;
  StandardsFactory.getIndex().then(function(entries) {
    $scope.standards = entries.data;
    $scope.show_standards = true;
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


}).controller('StandardsNewController',function($scope, StandardsFactory, $routeParams, $location) {
  $scope.standard = {};
    $scope.addStandard = function(){
      params = {title:  $scope.standard.title};
      StandardsFactory.postNew(params).then(function(success){
         console.log("successful post from "+success.data.response)
    }, errorHandler );
  }
  function errorHandler(){
    console.log("error creating new standard");
  }
});
