require("dotenv").config();

import knex from "knex";

const knexConnection = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 2, max: 10 },
});


export const connection =  knexConnection;
export const userListQuery =  () =>
knexConnection
  .from("users")
  .select("id", "email")
  .then((rows) => {
    let userList = [];
    for (let row of rows) {
      userList.push({ id: row.id, email: row.email });
    }
    return userList;
  });

export const userQuery =  (email) =>
  knexConnection.from("users").select("id", "email").where("email", email);

//knex.insert({ telegram_id: 'tgId' }).into('users');
