import { Request, Response } from "express";

import Transaction from "../models/transaction.js";

export async function handleCreateTransaction(req: Request, res: Response) {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json({
      created: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleGetTransactions(req: Request, res: Response) {
  try {
    const transactions = await Transaction.find({
      user_id: req.body.user.id,
    }).sort({ created_at: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTransactionsById(req: Request, res: Response) {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
