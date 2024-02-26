import { Request, Response } from "express";
import User from "../models/user.js";

export async function handlecreateUser(req: Request, res: Response) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "The Email provided already has a user associated",
      });
    }

    const newUser = {
      name,
      email,
      password,
      confirmPassword,
    };

    const user = await User.create(newUser);

    if (!user) {
      return res.status(400).json({ error: true, message: "User Not Created" });
    }

    res.status(201).json({ error: false, created: true });
  } catch (error) {
    console.error(error);
  }
}

export async function handleGetUserProfile(req: Request, res: Response) {
  const user = await User.findById(req.body.user.id);

  if (!user) {
    return res.status(404).json({ error: true, message: "User Not Found" });
  }

  return res.status(200).json(user);
}
