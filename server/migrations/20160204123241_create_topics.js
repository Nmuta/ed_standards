
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function(table){
    table.increments();
    table.string('name');
    table.string('short_name');
    table.boolean('active').defaultTo(true) ;
    table.timestamps();
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
