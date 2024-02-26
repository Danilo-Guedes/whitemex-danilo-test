import express, { Request, Response } from "express";
import {
  handlecreateUser,
  handleGetUserProfile,
} from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";
import { check } from "express-validator";
import { validationMiddleware } from "../middlewares/validation.js";

const router = express.Router();

/**
 *@swagger
 *  api/users/create:
 *    post:
 *      tags:
 *        - Users
 *      summary: Create an user
 *      description: Create an user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                confirmPassword:
 *                  type: string
 *      responses:
 *        201:
 *          description: User created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: false
 *                  created:
 *                    type: boolean
 *                    example: true
 *        400:
 *          description: Missing required fields
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  errors:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        location:
 *                          type: string
 *                        msg:
 *                          type: string
 *                        path:
 *                          type: string
 *                        type:
 *                          type: string
 *        409:
 *          description: The Email provided already has a user associated
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: The Email provided already has a user associated
 *        500:
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.post(
  "/create",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with  or more characters"
    ).isLength({ min: 1 }),
    check(
      "confirmPassword",
      "Please enter a password with 1 or more characters"
    ).isLength({ min: 1 }),
    validationMiddleware,
  ],
  (req: Request, res: Response) => {
    handlecreateUser(req, res);
  }
);

/**
 *@swagger
 *  api/users/me:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get user profile
 *      description: Get user profile
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: User profile
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Unauthorized
 */
router.get("/me", authMiddleware, handleGetUserProfile);

export default router;
