import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const users = [{ username: "volivos", password: "Password" }];
  const tasks = [];

  for (const user of users) {
    const createdUser = await createUser(user.username, user.password);

    for (let i = 1; i <= 3; i++) {
      const task = await createTask("task_" + i, false, createdUser.id);
      tasks.push(task);
    }
  }
}
