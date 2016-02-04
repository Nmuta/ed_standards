
exports.up = function(knex, Promise) {
  return knex.schema.createTable('standards', function(table){
    table.increments();
    table.string('title');
    table.integer('parent_id');
    table.integer('user_id');
    table.integer('topic_id');
    table.string('topic_suffix');
    table.boolean('active').defaultTo(true);
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('standards');
};
