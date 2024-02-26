import express from "express";
import { handleUserLogin } from "../controllers/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *      - Users
 *     summary: User login
 *     description: Login a user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                 type: boolean
 *                 example: true
 *                message:
 *                 type: string
 *                 example: Missing required fields
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                  type: boolean
 *                  example: true
 *                 message:
 *                  type: string
 *                  example: Invalid credentials
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User not found
 */
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
