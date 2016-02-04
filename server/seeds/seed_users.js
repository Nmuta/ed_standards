var bcrypt = require('bcrypt');
var pwd = bcrypt.hashSync("password",2);
var date = new Date();
var admin_role_id;
var users_role_id;

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('roles').del(),

    // Inserts seed entries
    knex('roles').insert({name: 'Admin'}),
    knex('roles').insert({name: 'User'}),
    knex('users').insert({name: 'Sheriff', email: "admin@admin.com", password: pwd, created_at: date}),
    knex('users').insert({name: 'Joe', email: "joe@joe.com", password: pwd, created_at: date})
    // knex('roles').select().then(function(roles){
    //   return (roles)
    // }).then(function(roles){
    //   var adm = roles[0].id;
    //   var usr = roles[1].id;
    //   return (
    //     knex('users').where({name: "Sheriff"}).update({role_id: adm}).then(function(){
    //       return  knex('users').where({name: "Joe"}).update({role_id: usr});
    //     })
    //   );
    // })
   );
};
