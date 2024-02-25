import express, { Request, Response } from "express";
import { check } from "express-validator";
import { validationMiddleware } from "../middlewares/validation.js";

import { handleCreateTransaction,
     handleGetTransactions 
    } from "../controllers/transactions.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/create",
  [
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
    console.log(req.body);
    handleCreateTransaction(req, res);
  }
);


router.get("/", [
    authMiddleware
],(req: Request, res: Response) => {
    handleGetTransactions(req, res);
})
export default router;
