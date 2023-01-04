
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary() // Sets review_id as the primary key
        table.string("content")
        table.integer("score")
        table.foreign("critic_id").references("critic_id").inTable("critics").onDelete("CASCADE")
        table.foreign("movie_id").references("movie_id").inTable("movies").onDelete("CASCADE")
        table.timestamps(true, true) // Adds created_at and updated_at fields
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
