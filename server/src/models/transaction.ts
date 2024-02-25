import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number_card: {
    type: String,
    required: true,
  },
  date_expiration: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
