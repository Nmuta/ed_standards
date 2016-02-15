
exports.seed = function(knex, Promise) {
  return Promise.join(

    knex('roles').select().then(function(roles){
      return (roles)
    }).then(function(roles){
      var adm = roles[0].id;
      var usr = roles[1].id;
      return (
        knex('users').where({name: "Addy"}).update({role_id: adm}).then(function(){
          return  knex('users').where({name: "Joe"}).update({role_id: usr});
        })
      );
    })
  );
};
