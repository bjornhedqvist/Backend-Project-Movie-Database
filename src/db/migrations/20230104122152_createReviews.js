
exports.up = function(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary(); // Sets movie_id as the primary key
        table.string("content");
        table.integer("score")
        table.foreign("critic_id");
        table.foreign("movie_id");
        table.timestamps(true, true); // Adds created_at and updated_at fields
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
