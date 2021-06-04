import pg from "pg";

import { dbOpts } from "../config/index.js";

const db = new pg.Client(dbOpts);
db.connect();

const checkDatabase = async () => {
  await db
    .query("select 1+1 as result")
    .then(console.log("Database Connect"))
    .catch((err) => {
      throw new Error(err);
    });
};

export { db, checkDatabase };
