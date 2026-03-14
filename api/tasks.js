import express from "express";
const router = express.Router();
export default router;

import requireBody from "../middleware/requireBody.js";
import requireUser from "../middleware/requireUser.js";
import {
  createTask,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask,
} from "../db/queries/tasks.js";

router.use(requireUser);

router.post("/", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;

  const task = await createTask(title, done, req.user.id);
  res.status(201).send(task);
});

router.get("/", async (req, res) => {
  const task = await getTasksByUserId(req.user.id);
  res.status(200).send(task);
});

router.param("id", async (req, res, next, id) => {
  const taskId = Number(id);
  const task = await getTaskById(taskId);

  if (!task) return res.status(403).send("User does not own this task.");
  console.log(
    "task user_id = " +
      task.user_id +
      typeof task.user_id +
      "| user id = " +
      req.user.id +
      typeof req.user.id,
  );
  if (Number(task.user_id) !== Number(req.user.id))
    return res.status(403).send("User does not own this task");

  req.task = task;
  //   console.log(req.task);
  next();
});

router.put("/:id", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;
  const task = await updateTask(req.task.id, title, done);
  console.log(task);
  res.status(200).send(task);
});

router.delete("/:id", async (req, res) => {
  const tasks = await deleteTask(req.task.id);
  res.status(204).send("Task deleted successfully.");
});
