app.factory('StandardsFactory', function($resource) {
  return $resource('http://localhost:3000/standards/:id');  
});
