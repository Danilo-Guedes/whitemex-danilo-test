import express, { Request, Response } from "express";
import { check } from "express-validator";
import { validationMiddleware } from "../middlewares/validation.js";

import {
  getTransactionsById,
  handleCreateTransaction,
  handleGetTransactions,
} from "../controllers/transactions.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/create",
  [
    authMiddleware,
    check("name")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Nome do títular é obrigatório"),
    check("number_card")
      .isString()
      .isLength({ min: 19 })
      .withMessage("Número do cartão é obrigatório"),
    check("date_expiration")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Data de expiração é obrigatória"),
    check("cvv")
      .isString()
      .isLength({ min: 3 })
      .withMessage("CVV é obrigatório"),
    check("value").isNumeric().withMessage("Valor é obrigatório"),
    validationMiddleware,
  ],
  (req: Request, res: Response) => {
    handleCreateTransaction(req, res);
  }
);

/**
 *@swagger
 * /api/transactions/:
 *  get:
 *    tags:
 *     - Transactions
 *    summary: Get all transactions
 *    description: Get all transactions
 *    responses:
 *      200:
 *        description: All transactions
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                transactions:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      number_card:
 *                        type: string
 *                      date_expiration:
 *                        type: string
 *                      cvv:
 *                        type: string
 *                      value:
 *                        type: number
 *                        example: 100.50
 *                      createdAt:
 *                        type: string
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get("/", [authMiddleware], (req: Request, res: Response) => {
  handleGetTransactions(req, res);
});

/**
 * @swagger
 * /api/transactions/{id}:
 *  get:
 *    tags:
 *     - Transactions
 *    summary: Get transactions by id
 *    description: Get transactions by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id of the transaction
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Transaction by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                transaction:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    number_card:
 *                      type: string
 *                    date_expiration:
 *                      type: string
 *                    cvv:
 *                      type: string
 *                    value:
 *                      type: number
 *                      example: 100.50
 *                    createdAt:
 *                      type: string
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 */
router.get("/:id", [authMiddleware], (req: Request, res: Response) => {
  getTransactionsById(req, res);
});

export default router;
