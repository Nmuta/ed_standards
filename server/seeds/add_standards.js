
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('standards').del(),

    // Inserts seed entries
    knex('standards').insert({title: "Describe foo"}),
    knex('standards').insert({title: "Describe bar"})
  );
};
