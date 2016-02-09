exports.up = function(knex, Promise) {
  return knex.schema.createTable('credits', function(table){
    table.increments();
    table.integer('bookID');
    table.integer('authorID');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('credits');
};
