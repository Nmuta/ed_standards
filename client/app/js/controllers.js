app.controller("MenuController", function($scope, $http, TokenFactory){

  $scope.$watch (
    function(){
      return TokenFactory.getToken();
    },
    function(newVal, oldVal){
      $scope.username =  TokenFactory.getUser();
      $scope.is_admin =  TokenFactory.getAdmin();
    }
  )
});

app.controller("HomeController", function($scope, $http, TokenFactory, $rootScope){
  $scope.message = "welcome to the app";
  $scope.currentUser = TokenFactory.getToken();
});

app.controller("AdminController", function($scope, TopicsFactory, $routeParams){
    $scope.message = "welcome to the admin controller" ;
});

app.controller("TopicsIndexController", function($scope, TopicsFactory, $routeParams, $window, $location){
   var topics = TopicsFactory.query(function() {
     $scope.topics = topics;
   });

   $scope.deleteTopic = function(topic_id){
    //  if ($window.confirm("Are you sure you want to delete this topic?")){
       var topic = TopicsFactory.get({id: topic_id}, function(){
           topic.$delete(topic, function(){
             console.log("this is after i delete the topic");
             $location.path("/topics");
           });
       });
    //  }
    $location.path("/topics");
   }

   $scope.editTopic = function(topic_id){
    $location.path("/topics/"+topic_id);
   }
});

app.controller("TopicsModifyController", function($scope, TopicsFactory, $routeParams, $window, $location){
  var id = $routeParams.id;
  $scope.topic = {};
  var topic = TopicsFactory.get({id: id}, function(topic){
      $scope.topic = topic;
      $scope.submit_text = "Update Topic";
      console.log("I'm here and my short name is "+topic.short_name);
  });

  $scope.submitForm  = function(topic_id){
    var topic = TopicsFactory.get({id: id}, function(topic_found){
      TopicsFactory.update({id: id}, $scope.topic, function(resd){
         $location.path("/topics");
      });
    });
  }
});

app.controller("TopicsNewController", function($scope, TopicsFactory, $routeParams, $window, $location){

  $scope.topic = {};
  $scope.submit_text = "Create Topic";
  $scope.submitForm  = function(topic_id){
      TopicsFactory.save($scope.topic, function(resd){
         $location.path("/topics");
    });
  }
});

app.controller('StandardsIndexController',function($scope, StandardsFactory, TokenFactory, $rootScope) {
  $scope.show_standards = false;

  StandardsFactory.getIndex().then(function(entries) {
    // console.log("entries are", entries.data);
    $scope.standards = entries.data;
    $scope.show_standards = true;
  });

  $scope.is_admin  = TokenFactory.getAdmin();

})


app.controller("UsersLoginController", function($scope, $http, UsersFactory, TokenFactory, $location){
    $scope.users = {}
    $scope.loginUser = function(){
      var data = {email: $scope.users.email, password: $scope.users.password};
      UsersFactory.loginUser(data).then(function(success){
        if(success.data.token && success.data.username){
            TokenFactory.setToken(success.data.token);
            TokenFactory.setUser(success.data.username);
            TokenFactory.setAdmin(success.data.admin);
            $location.path("/standards")
        } else {
          alert("Invalid login.")
        }
      }, failure);

      function failure(){
        console.log("failed login");
      }
    }
});

app.controller("UsersLogoutController", function($scope, UsersFactory){

});


app.controller('StandardsIndexController',function($scope, StandardsFactory, TokenFactory, $rootScope) {
  $scope.show_standards = false;

  StandardsFactory.getIndex().then(function(entries) {
    // console.log("entries are", entries.data);
    $scope.standards = entries.data;
    $scope.show_standards = true;
  });

  $scope.is_admin  = TokenFactory.getAdmin();

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
         $location.path("/standards")
    }, errorHandler );
  }
  function errorHandler(){
    console.log("error creating new standard");
  }
});
