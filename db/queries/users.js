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

export async function getUserByUserAndPw(username, password) {
  const sql = `
        select *
        from users
        where username = $1;`;

  const {
    rows: [user],
  } = await db.query(sql, [username]);

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  return user;
}

export async function getUserById(userId) {
  const sql = `
        select *
        from users
        where id = $1;`;

  const {
    rows: [user],
  } = await db.query(sql, [userId]);
  return user;
}
