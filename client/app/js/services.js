// app.factory('StandardsFactory', function($resource) {
//   return $resource('http://localhost:3000/standards/:id');
// });

app.factory("UsersFactory", ['$http', function($http, $location){
  UsersFactory = {}
  UsersFactory.loginUser =  function(data){
     return $http.post("http://localhost:3000/users/login", data );
  }
  return UsersFactory;
}]);



app.factory('StandardsFactory', ['$http', function($http, $location) {

  StandardsFactory = {};

  StandardsFactory.getIndex = function () {
        return $http.get('http://localhost:3000/standards/');
  }

  StandardsFactory.getShow = function (id) {
        return $http.get('http://localhost:3000/standards/'+id);
  }

  StandardsFactory.postNew = function (params) {
      return $http.post('http://localhost:3000/standards', params);
  }



  return StandardsFactory;

}]);
