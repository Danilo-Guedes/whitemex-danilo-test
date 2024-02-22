import { Request, Response } from "express";
import User from "../models/user.js"

export async function handlecreateUser(req : Request, res : Response) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "The Email provided already has a user associated",
      });
    }

    const newUser = {
      name,
      email,
      password,
      confirmPassword
    };

    const user = await User.create(newUser);


    if (!user) {
      return res.status(400).json({ error: true, message: "User Not Created" });
    }



    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
}

export async function handleGetUsers(req : Request, res : Response) {
  try {
    const { id } = req.body.user;

    let users = await User.find({ _id: { $ne: id } });

    if (!users) {
      return res.status(400).json({ error: true, message: "User Not Found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}

export async function handleGetUserProfile(req : Request, res : Response) {
  const user = await User.findById(req.body.user.id);


  if (!user) {
    return res.status(400).json({ error: true, message: "User Not Found" });
  }

  return res.status(200).json(user);
}

