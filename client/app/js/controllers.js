app.controller("HomeController", function($scope, $http){
  $scope.message = "welcome to the app";
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
      StandardsFactory.postNew(params).success(function(data, status) {
        console.log("do we even get here??");
    });
  }
});
