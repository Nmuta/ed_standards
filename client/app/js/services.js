app.factory('TopicsFactory', function($resource) {

   return $resource('http://localhost:3000/topics/:id', {id: '@id'},
      {
        'update': { method:'POST' }
      }

 );
});

app.factory("TokenFactory", function(){
    var TokenFactory  =  {};

    TokenFactory.getUserId = function(){
      console.log("getUserId has been called.. ");
      uid = localStorage.getItem("ud");
      var ud = uid ?  uid.slice(6) : false;
      return ud;
    }

    TokenFactory.setToken = function(token, uid){
      localStorage.setItem("token", token);
      var prefix = token.slice(10,15);
      // hide the userid in a random looking string based on token
      localStorage.setItem("ud", prefix+"1"+uid);
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
      return username;
    }

    TokenFactory.clearToken = function(){
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("ud");
      console.log("clearing local storage items");
    }

    return TokenFactory;
});

app.factory("AuthInterceptor",  function(TokenFactory){
  // 4 magic keys https://docs.angularjs.org/api/ng/service/$http
  return {
    request: function (config){
       var token = TokenFactory.getToken();
       if (token){
         config.headers = config.headers || {};
         config.headers.Authorization = "Bearer "+token;
       }
       return config; // not the best??  I think you should return a promise here
    },
    // requestError
    // response - check for unauthorized, and redirect to login
        // on a 500 show an error message by doing a $rootScope.$emit...
    // responseError
  };
});


app.factory('StandardsFactory', ['$http', '$location', function($http, $location) {

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

app.factory("UsersFactory", ['$http', 'TokenFactory', function($http, TokenFactory){
  var UsersFactory = {};

  console.log("Token Factory is "+TokenFactory);
  var user_id = TokenFactory.getUserId();

  UsersFactory.checkAdmin = function(){
    var data = {uid: user_id};
    return $http.post("http://localhost:3000/users/checkadmin", data);
  }

  UsersFactory.loginUser =  function(data){
     return $http.post("http://localhost:3000/users/login", data );
  }

  UsersFactory.logoutUser =  function(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("ud");
  }
  return UsersFactory;
}]);
