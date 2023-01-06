const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

async function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
}

const addCritic = reduceProperties("critic_id", {
        preferred_name: ["critic", "preferred_name"],
        surname: ["critic", "surname"],
        organization_name: ["critic", "organization_name"]
})

async function update(updateBody){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where({"r.review_id": updateBody.review_id})
        .update(updateBody, "*")
        .then((updatedRecords) => updatedRecords[0])
        
}

async function reduceWithCritic(review_id){
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({review_id})
    .then(addCritic)
    .then((updatedRecords) => updatedRecords[0])
}

async function destroy(review_id){
  return knex("reviews")
    .where({review_id})
    .del()
}

module.exports = {
  read,
  update,
  reduceWithCritic,
  delete: destroy
};
