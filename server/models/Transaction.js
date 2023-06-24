import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    location: String,
    responsable: String,
    item: String,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
