var bcrypt = require('bcrypt');
var pwd = bcrypt.hashSync("password",2);
var date = new Date();
var admin_role_id;
var users_role_id;

console.log("seed users");

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
   );
};
