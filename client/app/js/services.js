// app.factory('StandardsFactory', function($resource) {
//   return $resource('http://localhost:3000/standards/:id');
// });

app.factory("UsersFactory", ['$http', function($http, $location){
  var UsersFactory = {}
  UsersFactory.loginUser =  function(data){
     return $http.post("http://localhost:3000/users/login", data );
  }

  UsersFactory.logoutUser =  function(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
  return UsersFactory;
}]);

app.factory("TokenFactory", function(){
    var TokenFactory  =  {};

    TokenFactory.setToken = function(token){
      localStorage.setItem("token", token);
    }

    TokenFactory.setUser= function(username){
      localStorage.setItem("username", username);
    }

    TokenFactory.getToken = function(){
      the_token = localStorage.getItem("token");
      return the_token;
    }

    TokenFactory.getUser = function(){
      username = localStorage.getItem("username");
      console.log("app level --> getting user : "+username);
      return username;
    }

    TokenFactory.clearToken = function(){
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log("clearing local storage items");
    }

    return TokenFactory;
});

app.factory("AuthInterceptor",  function(TokenFactory){

    var AuthInterceptor = {request: addToken};

    function addToken(config){

       var token = TokenFactory.getToken();
       if (token){
         config.headers = config.headers || {};
         config.headers.Authorization = "Bearer: "+token;
       }
       return config;
    };

    return AuthInterceptor;
});


app.factory('StandardsFactory', ['$http', function($http, $location) {

  var StandardsFactory = {};

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
