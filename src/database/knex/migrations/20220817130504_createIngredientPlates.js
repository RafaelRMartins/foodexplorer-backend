exports.up = knex => knex.schema.createTable("ingredient_plates", table => {
  table.increments("id");
  table.integer("plates_id").references("id").inTable("plates").onDelete("CASCADE");
  table.integer("ingredients_id").references("id").inTable("ingredients").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("ingredient_plates");
