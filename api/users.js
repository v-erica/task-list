import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUserAndPw } from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import { createToken } from "../utils/jwt.js";

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;

    const user = await createUser(username, password);
    const token = await createToken(user);
    res.status(201).send(token);
  },
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;

    const user = await getUserByUserAndPw(username, password);
    if (user === null)
      return res.status(401).send("Incorrect credentials provided.");
    const token = await createToken(user);
    res.status(200).send(token);
  },
);
