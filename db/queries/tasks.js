import db from "../client.js";

export async function createTask(title, done, userId) {
  const sql = `
        insert into tasks (title, done, user_id)
        values ($1, $2, $3)
        returning *;`;

  const {
    rows: [task],
  } = await db.query(sql, [title, done, userId]);
  return task;
}
