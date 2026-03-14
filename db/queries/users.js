import db from "../client.js";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const sql = `
        insert into users (username, password)
        values ($1, $2)
        returning *;`;

  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}
