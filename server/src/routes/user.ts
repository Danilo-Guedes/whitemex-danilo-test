import express, { Request, Response } from "express";
import { handlecreateUser, handleGetUsers, handleGetUserProfile } from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", (req, res) => {  // MUDAR PARA EXPRESS-VALIDATOR
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  handlecreateUser(req, res);
});

router.get("/me", authMiddleware, handleGetUserProfile);

router.get("/", authMiddleware, handleGetUsers);

router.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
})

export default router;
