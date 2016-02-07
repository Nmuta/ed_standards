app.controller("HomeController", function($scope, $http){
  $scope.message = "welcome to the app";
});

app.controller('StandardsIndexController',function($scope, StandardsFactory) {

  var entries = StandardsFactory.query(function() {
    $scope.standards = entries;
  }); //query() returns all the entries

  // $scope.entry = new StandardsFactory(); //You can instantiate resource class

  // $scope.entry.data = 'some data';

  //StandardsFactory.save($scope.entry, function() {
    //data saved. do something here.
  //}); //saves an entry. Assuming $scope.entry is the Entry object
}).controller('StandardsShowController',function($scope, StandardsFactory, $routeParams) {
  var entry = StandardsFactory.get({ id: $routeParams.id }, function() {
    $scope.standard = entry;
});  


});
