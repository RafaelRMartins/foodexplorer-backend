exports.up = knex => knex.schema.createTable("carts", table => {
  table.increments("id");
  table.text("status");
  table.integer("user_id").references("id").inTable("users");
  table.timestamp("created_at").default(knex.fn.now());
  table.text("details");
});

exports.down = knex => knex.schema.dropTable("carts");
