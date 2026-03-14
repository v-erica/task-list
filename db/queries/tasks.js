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

export async function getTasksByUserId(userId) {
  const sql = `
        select *
        from tasks
        where user_id = $1;`;

  const { rows: tasks } = await db.query(sql, [userId]);
  return tasks;
}

export async function getTaskById(taskId) {
  const sql = `
        select *
        from tasks
        where id = $1;`;

  const {
    rows: [task],
  } = await db.query(sql, [taskId]);
  return task;
}

export async function updateTask(taskId, title, done) {
  const sql = `
        update tasks
        set title = $2, done = $3
        where id = $1
        returning *;`;

  const {
    rows: [task],
  } = await db.query(sql, [taskId, title, done]);
  return task;
}

export async function deleteTask(taskId) {
  const sql = `
        delete from tasks
        where id = $1
        returning *;`;

  const { rows: tasks } = await db.query(sql, [taskId]);
  return tasks;
}
