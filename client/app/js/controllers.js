app.controller("HomeController", function($scope, $http){
  $scope.message = "welcome to the app";
});


app.controller("StandardsController", function($scope, $http){
    $http.get("http://localhost:3000/standards").then(function (response) {
    $scope.standards = response.data;
  });
});
