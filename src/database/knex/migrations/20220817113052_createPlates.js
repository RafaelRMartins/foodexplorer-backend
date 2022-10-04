exports.up = knex => knex.schema.createTable("plates", table => {
  table.increments("id");
  table.text("image");
  table.text("name").notNullable();
  table.decimal("price",14,2).notNullable();
  table.text("type");
  table.text("description");
});

exports.down = knex => knex.schema.dropTable("plates");
