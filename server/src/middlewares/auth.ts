import jwt from "jsonwebtoken";
import { decodeJWT } from "../services/auth/jwt.js";
import { NextFunction, Request, Response } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }

  try {
    const decoded = await decodeJWT(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: "Unauthorized" });
  }
};

export default authMiddleware;
