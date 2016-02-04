var bcrypt = require('bcrypt');
var pwd = bcrypt.hashSync("password",2);
var date = new Date();

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
    //     var admin_role_id = Number(roles[0].id);
    //     return admin_role_id
    //   }).then(function(rid){
    //     rid = Number(rid);
    //     knex('users').where({name: "Sheriff"}).update({role_id: 1}).then(function(){
    //
    //     })
    //   })
   );
};
