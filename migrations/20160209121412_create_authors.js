exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table){
    table.increments();
    table.string('first');
    table.string('middle');
    table.string('last');
    table.text('bio');
    table.text('portrait');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
