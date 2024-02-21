import express from "express";
import { handleUserLogin } from "../controllers/auth";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  handleUserLogin(req, res);
});

export default router;
