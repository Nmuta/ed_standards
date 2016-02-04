
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('name');
    table.integer('role_id');
    table.integer('campus_id');
    table.boolean('active').defaultTo(true);
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
